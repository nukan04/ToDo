import mongoose from 'mongoose';
const {Schema, model} = mongoose;
const VolontaireSchema = new Schema({
    email: {type:String, unique: true, required: true},
    password: {type:String, required: true},
    firstname: {type:String, required: true},
    lastname: {type:String, required: true},
    birthdate: {type: Date, required: true},
    phone: {type: Number, required: true},
    myEvents_id: [{type:String}],
    roles: [{type:String, ref: 'Role'}],
});
var Volontaire = mongoose.model('Volontaire', VolontaireSchema);
export default Volontaire;
