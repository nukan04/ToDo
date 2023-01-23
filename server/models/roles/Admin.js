import mongoose from 'mongoose';
const {Schema, model} = mongoose;

const AdminSchema = new Schema({
    email: {type:String, unique: true, required: true},
    password: {type:String, required: true},
    roles: [{type:String, ref: 'Role'}],
    })
const Admin = mongoose.model('Admin', AdminSchema);
export default Admin;