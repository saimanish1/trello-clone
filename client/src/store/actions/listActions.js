import {
  ADD_COLUMN,
  EDIT_COLUMN_TITLE,
  REORDER_CARD,
  REORDER_LIST,
  RETRIEVE_ALL_BOARDS,
  SET_CURRENT_BOARD_LISTS,
  SET_CURRENT_CARDS,
} from './actionTypes';
import axios from '../../axios-users';
import uuid from 'uuid';

export const reorderCard = payload => {
  return async dispatch => {
    const { destination, draggableId, source, columns } = payload;
    const startList = columns.columns[source.droppableId];
    const finishList = columns.columns[destination.droppableId];
    // debugger;
    if (startList === finishList) {
      const newCardIds = Array.from(startList.cardIds);
      newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, draggableId);

      const newSameColumnList = {
        ...columns.columns[source.droppableId],
        cardIds: newCardIds,
      };

      dispatch({
        type: REORDER_CARD,
        payload: { newSameColumnList },
      });

      const res = await axios.post('/cards/reorder/samecolumn', {
        sameColumnId: source.droppableId,
        samecolumnCardIds: newCardIds,
      });

      return;
    }

    // moving from one list to another list
    const removedCardIds = Array.from(startList.cardIds);
    const addedCardIds = Array.from(finishList.cardIds);
    removedCardIds.splice(source.index, 1);
    addedCardIds.splice(destination.index, 0, draggableId);

    const newDifferentColumnsList = {
      [source.droppableId]: {
        ...columns.columns[source.droppableId],
        cardIds: removedCardIds,
      },
      [destination.droppableId]: {
        ...columns.columns[destination.droppableId],
        cardIds: addedCardIds,
      },
    };
    dispatch({
      type: REORDER_CARD,
      payload: { newDifferentColumnsList },
    });

    const res = await axios.post('/cards/reorder/differentcolumn', {
      removedColumnId: source.droppableId,
      addedColumnId: destination.droppableId,
      removedColumnCardIds: removedCardIds,
      addedColumnCardIds: addedCardIds,
    });

    console.log(res.data);

    return;
  };
};

export const reorderList = (columnPayload, boardId) => {
  const { destination, source, draggableId, columnOrder } = columnPayload;
  const newColumnOrder = Array.from(columnOrder);
  newColumnOrder.splice(source.index, 1);
  newColumnOrder.splice(destination.index, 0, draggableId);

  return async dispatch => {
    dispatch({
      type: REORDER_LIST,
      payload: newColumnOrder,
    });

    const res = await axios.patch('/boards', {
      boardId,
      newColumnOrder,
    });
  };
};

export const getAllBoards = () => {
  return async dispatch => {
    const res = await axios.get('/boards/all');
    const { boards } = res.data;

    dispatch({
      type: RETRIEVE_ALL_BOARDS,
      payload: boards,
    });
  };
};

export const getAllLists = boardId => {
  return async dispatch => {
    const res = await axios.get(`/columns/all/${boardId}`);

    const { columns, board } = res.data;
    console.log(res.data);
    const columnOrder = board.columnOrder;

    dispatch({
      type: SET_CURRENT_BOARD_LISTS,
      payload: {
        columns,
        columnOrder,
      },
    });
  };
};

export const getAllCards = columnIds => {
  return dispatch => {
    if (columnIds.length === 0) {
      return dispatch({
        type: SET_CURRENT_CARDS,
        payload: {
          cards: [],
        },
      });
    }
    axios
      .post('/cards/getallcards', { columnIds })
      .then(res => {
        console.log(res.data.cards);
        dispatch({ type: SET_CURRENT_CARDS, payload: res.data.cards });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const editColumnTitle = (editedTitle, columnId) => {
  return dispatch => {
    axios
      .post(`/columns/${columnId}?title=true`, { title: editedTitle })
      .then(res => {
        dispatch({
          type: EDIT_COLUMN_TITLE,
          payload: { editedTitle, columnId },
        });
      })
      .catch(err => console.log(err));
  };
};

export const addColumn = (boardId, columnTitle, cardIds = []) => {
  return async dispatch => {
    if (boardId && columnTitle) {
      const columnId = uuid();
      const payload = {
        title: columnTitle,
        cardIds,
        boardId,
        columnId /* i want to use id from frontend, i will create a field 'columnId' in column Model*/,
      };
      dispatch({
        type: ADD_COLUMN,
        payload: {
          ...payload,
        },
      });

      const res = await axios.post('/columns', {
        ...payload,
      });
      console.log(res.data);
    }
  };
};
