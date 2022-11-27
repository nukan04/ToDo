import mongoose from 'mongoose';
const {Schema, model} = mongoose;
const listSchema = new Schema({
    task: {type:String, unique: true, required: true},
})
const todoList = mongoose.model('todoList', listSchema);
export default todoList;