const {Schema,model} = require('mongoose');

const TodoSchema=new Schema({
    title:String,
    isCompleted: Boolean
});  



const Todo=model('Todo',TodoSchema)

module.exports = Todo  