import Organization from "../models/roles/Organization.js";
import Volontaire from "../models/roles/Volontaire.js";
import Event from "../models/Events.js";


class organizationController {

    async createEvent(req, res) {
        try {
            const {title, date, description, numberOfParticipants} = req.body;
            const organization = await Organization.findOne({_id: req.data.id})
            if (!organization) {
                return res.status(400).json({message: "Organization not found"});
            }
            const event = await Event({
                title: title,
                date: date,
                description: description,
                numberOfParticipants: numberOfParticipants,
                organization_id: organization._id
            });
            await event.save();
            await organization.events_id.push(event._id);
            await organization.save();
            res.json({message: "Event was created"});
        } catch (e) {
            console.log(e);
            return json.status(400).json({message: "Error in createEvent"})
        }
    }

    async deleteEvent(req, res) {
        try {
            const {eventid} = req.body;
            const event = await Event.findOne({_id: eventid});
            const organization = await Organization.findOne({id: req.data.id});
            if (!event) {
                return res.status(400).json({message: "Event not found"});
            }
            //delete event from volontaires
            for (let i = 0; i < event.participants_id.length; i++) {
                const volontaire = await Volontaire.findOne({_id: event.participants_id[i]});
                volontaire.myEvents_id.pull(eventid);
                await volontaire.save();
            }
            await Event.deleteOne({_id: eventid});
            await organization.events_id.pull(eventid);
            await organization.save();
            res.json({message: "Event was deleted"});
        } catch (e) {
            console.log(e);
            return json.status(400).json({message: "Error in deleteEvent"})
        }
    }

    async getEvents(req, res) {
        try {
            //console.log(req.data);
            const organization = await Organization.findOne({_id: req.data.id});
            if (!organization) {
                return res.status(400).json({message: "Organization not found"});
            } else if (organization.events_id.length == 0) {
                return res.status(400).json({message: "Organization has no events"});
            }
            //console.log(organization.events_id);
            const events = await Event.find({_id: organization.events_id});
            if (!events) {
                return res.status(400).json({message: "Events not found"});
            }


            /*
            events.forEach(event => {
                    let participants = [];
                    async function *printFiles () {
                        for (let i = 0; i < event.participants_id.length; i++) {
                            let volontaire = await Volontaire.findOne({_id: event.participants_id[i]});
                            participants.push(volontaire);
                        }
                    }
                    printFiles();
                    console.log(participants);
            });
            */
            return res.json(events);

        } catch (e) {
            console.log(e);
            return json.status(400).json({message: "Error in getEvents"})
        }
    }
    async getEventsById(req, res) {
        try{
            const id = req.params.id;
            const events = await Event.findById(id);
            if (!events) {
                return res.status(400).json({message: "Events not found"});
            }
            const participants = await Volontaire.find({_id: events.participants_id});
            if (!participants) {
                return res.status(400).json({message: "Events not found"});
            }

            return res.json({event: events, participant: participants});
        }catch (e) {
            console.log(e);
            return json.status(400).json({message: "Error in getEvents"})
        }
    }

}
export default new organizationController();