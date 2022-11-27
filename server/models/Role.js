import mongoose from "mongoose";

const {Schema, model} = mongoose;

const roleSchema = new Schema({
    value: {type:String, unique:true, default: "USER"},
});
var Role = mongoose.model('Role', roleSchema);
export default Role;
