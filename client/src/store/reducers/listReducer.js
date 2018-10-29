import {
    ADD_CARD,
    ADD_COLUMN,
    EDIT_COLUMN_TITLE,
    REORDER_CARD,
    REORDER_LIST,
    SET_CURRENT_BOARD_LISTS
} from "../actions/actionTypes";

const initialState = {
    columns: null,
    columnOrder: null,


};

const listReducer = (state = initialState, action) => {
    switch (action.type) {
        case REORDER_CARD: {


            // const {destination, draggableId, source} = action.payload;
            //
            // const startList = state.columns[source.droppableId];
            // const finishList = state.columns[destination.droppableId];
            //
            // if (startList === finishList) {
            //             //     // console.log('destination',destination,'\ndraggableId',draggableId,'\nsource',source,'\nstartList',startList,'\nfinishList',finishList);
            //             //     console.log(startList.cardIds);
            //             //     const newCardIds = Array.from(startList.cardIds);
            //             //     newCardIds.splice(source.index, 1);
            //             //     newCardIds.splice(destination.index, 0, draggableId);
            //             //
            //             //     const newList ={
            //             //         ...state.columns[source.droppableId],
            //             //         cardIds:newCardIds
            //             //     };
            //             //
            //             //     const newState = {
            //             //         ...state,
            //             //         columns: {
            //             //             ...state.columns,
            //             //             [newList.id]: newList
            //             //         }
            //             //     };
            //             //
            //             //
            //             //
            //             //     return newState;
            //             // }

            const {newSameColumnList,newDifferentColumnsList} = action.payload;

            if (newSameColumnList) {

                const newState = {
                    ...state,
                    columns: {
                        ...state.columns,

                            [newSameColumnList.id]: newSameColumnList

                    }
                };

                return newState;
            }


            // moving from one list to another list
            // const removedCardIds = Array.from(startList.cardIds);
            // const addedCardIds = Array.from(finishList.cardIds);
            // removedCardIds.splice(source.index, 1);
            // addedCardIds.splice(destination.index, 0, draggableId);
            if(newDifferentColumnsList)
            {


                const newState = {
                    ...state,
                    columns:{
                        ...state.columns,
                        ...newDifferentColumnsList
                    }

                };
                console.log(newState);

                return newState;
            }


        }


        case REORDER_LIST: {


            const newColumnOrder = action.payload;
            // console.log(state.columnOrder);
            // newColumnOrder.splice(source.index, 1);
            // newColumnOrder.splice(destination.index, 0, draggableId);
            const newState = {
                ...state,
                columnOrder: newColumnOrder
            };
            return newState;

        }


        case SET_CURRENT_BOARD_LISTS: {
            const {columns, columnOrder} = action.payload;
            const newColumnOrder = columnOrder;
            const newColumns = columns.reduce((accum, currentValue, currentIndex) => {

                    accum[currentValue.columnId] = {
                        title: currentValue.title,
                        id: currentValue.columnId,
                        cardIds: currentValue.cardIds

                    };

                    return accum;
                }, {}
            );

            const newState = {
                ...state,
                columns: newColumns,
                columnOrder: newColumnOrder

            };


            return newState;
        }

        case EDIT_COLUMN_TITLE: {
            const {editedTitle, columnId} = action.payload;
            const editedColumn = {
                [state.columns[columnId]]: {
                    ...state.columns[columnId],
                    content: editedTitle
                }
            };
            const newState = {
                ...state,
                columns: {
                    ...state.columns,
                    editedColumn
                }
            };
            return newState;
        }

        case ADD_COLUMN:{
            const {title,cardIds,columnId}=action.payload;

            if(title&&cardIds && columnId){


                const newColumn={
                    title,
                    cardIds,
                    id:columnId, /* here i am assigning id propert with columnId generated by uuid from listActions*/

                };


               return {
                   ...state,
                   columns:{
                       ...state.columns,

                       [columnId]:newColumn
                   },
                   columnOrder:state.columnOrder.concat(columnId)
               }

            }


        }

        case ADD_CARD:{
            const {columnId,cardId}= action.payload;
            return {
                ...state,
                columns:{
                    ...state.columns,
                    [columnId]:{
                        ...state.columns[columnId],
                        cardIds:state.columns[columnId].cardIds.concat(cardId)
                    }
                }
            }
        }


        default:
            return state;
    }
};


export default listReducer;

