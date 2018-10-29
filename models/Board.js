import mongoose from "mongoose";
const Schema = mongoose.Schema;

const BoardSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    title:{type:String, required:true},
    columnOrder:[{type:String, ref:'columns'}]
    

});

const Board = mongoose.model('boards',BoardSchema);

export default Board;
