import {ADD_COLUMN, RETRIEVE_ALL_BOARDS} from "../actions/actionTypes";

const initialState=[];


const boardReducer = (state=initialState,action)=>{
    switch (action.type) {
        case RETRIEVE_ALL_BOARDS:{
            return action.payload;
        }

        // case ADD_COLUMN:{
        //     const {boardId}=action.payload;
        //     if(boardId){
        //         return {
        //             ...state,
        //
        //         }
        //     }
        //
        //     return state;
        // }

        default:return state;
    }
};


export default boardReducer;