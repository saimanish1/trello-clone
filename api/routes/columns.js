const express = require('express');
const checkAuth = require('../../middleware/check-auth');
const Column = require('../../models/Column');
const internalErrorResponse = require('../../utils/internalErrorResponse');
const Board = require('../../models/Board');

const columnRouter = express.Router();

// route POST /api/columns
// required: authToken, title, boardId
// desc Create a new column
// access private

columnRouter.post('/', checkAuth, async (req, res, next) => {
  try {
    const { title, boardId, columnId } = req.body;
    await Column.find().exec();
    const newColumn = new Column({
      board: boardId,
      title,
      cardIds: [],
      columnId,
    });
    const result = await newColumn.save();
    const board = await Board.findById(boardId).exec();
    if (!board) {
      res.status(404).json({ message: 'No Board exists of provided id' });
    }
    const newColumnOrder = Array.from(board.columnOrder);
    debugger;
    newColumnOrder.push(result.columnId);
    board.set({ columnOrder: newColumnOrder });
    const result2 = await board.save();
    return res.status(201).json({
      message: 'New Column Added and also updated columnOrder in board',
      column: result,
      board: result2,
    });
  } catch (e) {
    return internalErrorResponse(error, res);
  }
  // .then(() => {
  //
  //
  //         .then(result => {
  //
  //                 .then(board => {
  //                     if (!board) {
  //                         return res
  //                             .status(404)
  //                             .json({message: 'No Board exists of provided id'});
  //                     }
  //                     const newColumnOrder = Array.from(board.columnOrder);
  //                     debugger;
  //                     newColumnOrder.push(result.columnId);
  //                     board.set({columnOrder: newColumnOrder});
  //                     board
  //                         .save()
  //                         .then(result2 =>
  //                             res.status(201).json({
  //                                 message:
  //                                     'New Column Added and also updated columnOrder in board',
  //                                 column: result,
  //                                 board: result2,
  //                             })
  //                         )
  //                         .catch(error => internalErrorResponse(error, res));
  //                 })
  //                 .catch(error => internalErrorResponse(error, res));
  //         })
  //         .catch(error => internalErrorResponse(error, res));
  // })
  // .catch(error => internalErrorResponse(error, res));
});

// route POST /api/columns/:columnId
// required: authToken, edited title
// desc change the column title content
// access private

columnRouter.post('/:columnId', (req, res) => {
  const { columnId } = req.params;

  if (req.query.title) {
    Column.findOneAndUpdate(columnId, { title: req.body.title }, { new: true })
      .exec()
      .then(column => {
        if (!column) {
          return res
            .status(404)
            .json({ message: 'unable to find the column of provided id' });
        }

        return res
          .status(200)
          .json({ message: 'column title updated ', data: column.title });
      })
      .catch(error => internalErrorResponse(error, res));
  } else {
    return res.status(404).json({ message: 'Title not found in the query' });
  }
});

// route GET /api/columns/column/:columnId
// required: authToken
// desc get the column of provided id
// access private
columnRouter.get('/column/:columnId', checkAuth, (req, res, next) => {
  Column.findOne({ _id: req.params.columnId })
    .exec()
    .then(column => {
      if (!column) {
        return res
          .status(404)
          .json({ message: 'Column with given id not found' });
      }
      return res.status(200).json({ message: 'Success', details: column });
    })
    .catch(error => internalErrorResponse(error, res));
});

// route GET /api/columns/all/:boardId
// required: authToken, boardId
// desc get all the columns of the board
// access private
columnRouter.get('/all/:boardId', checkAuth, async (req, res, next) => {
  try {
    const { boardId } = req.params;
    console.log(boardId);

    const board = await Board.findOne({ _id: boardId })
      .select('columnOrder')
      .exec();
    if (!board) {
      return res
        .status(404)
        .json({ message: 'Board with given id was not found' });
    }
    const columns = await Column.find({ board: boardId })
      .select('cardIds title columnId')
      .exec();
    return res
      .status(200)
      .json({ message: 'success', columns: columns, board: board });
  } catch (e) {
    return internalErrorResponse(e, res);
  }
  //    Column.findOne({_id:req.params.boardId})
  //        .exec()
  //        .then(board=>{
  //            if(!board){

  //                return res.status(404).json({message:'unable to find board of provided id'});
  //            }
  //            if(board.columns.length===0){
  //                return res.status(200).json({message:'No column has been created in this board'})
  //            }
  //            return res.status(200).json({message:'Success', board});
  //        })
  //        .catch(error=>internalErrorResponse(error,res))
});

module.exports = columnRouter;
