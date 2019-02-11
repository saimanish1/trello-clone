const mongoose = require( "mongoose");
const Schema = mongoose.Schema;

const CardSchema = new Schema({
    cardId:{type:String},
    title:{type:String, required:true},
    column:{type:String, ref:'cards'}
});

const Card = mongoose.model('tasks',CardSchema);

module.exports= Card;

