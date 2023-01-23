import mongoose from 'mongoose';
const {Schema, model} = mongoose;

const OrganizationSchema = new Schema({
    email: {type:String, unique: true, required: true},
    password: {type:String, required: true},
    name: {type:String, unique: true, required: true},
    roles: [{type:String, ref: 'Role'}],
    events_id: [{type:String}]
})
const Organization = mongoose.model('Organization', OrganizationSchema);
export default Organization;