import mongoose from "mongoose";

const {Schema, model} = mongoose;

const roleSchema = new Schema({
    value: {type:String, unique:true}
});
var Role = mongoose.model('Role', roleSchema);
export default Role;
