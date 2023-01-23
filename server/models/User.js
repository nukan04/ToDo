import mongoose from 'mongoose';
const {Schema, model} = mongoose;
const userSchema = new Schema({
    username: {type:String, unique: true, required: true},
    password: {type:String, required: true},
    roles: [{type:String, ref: 'Role'}],
    tasks: [String]
});
var User = mongoose.model('User', userSchema);
export default User;
