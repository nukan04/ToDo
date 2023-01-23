import mongoose from 'mongoose';
const {Schema, model} = mongoose;
const EventSchema = new Schema({
    title: {type:String, required: true},
    date: {type:Date, required: true},
    description: {type:String, required: true},
    numberOfParticipants: {type:Number, required: true},
    participants_id: [{type:String}],
    organization_id: {type:String, required: true}
})
const Event = mongoose.model('Event', EventSchema);
export default Event;