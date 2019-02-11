const mongoose = require( "mongoose");

const Schema  = mongoose.Schema;

const ColumnSchema = new Schema({
    board:{type:Schema.Types.ObjectId, ref:'boards'},
    title:{type:String, required:true},
    columnId:{type:String,required: true},
    cardIds:[{type:String, ref:'cards'}]
});

const Column = mongoose.model('columns', ColumnSchema);

module.exports= Column;