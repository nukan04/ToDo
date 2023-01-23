import Organization from "../models/roles/Organization.js";
import Volontaire from "../models/roles/Volontaire.js";
import Event from "../models/Events.js";
import volontaire from "../models/roles/Volontaire.js";
//import volontaire from "../models/roles/Volontaire.js";


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

            let eventsInfo=[];
            //let count = 0;
            events.forEach(event => {
                if (event.participants_id.length == 0) {
                    eventsInfo.push({event: event});
                }else {
                    let volontaires = [];
                    volontaires = async function () {
                        volontaire =  await Volontaire.find({_id: event.participants_id});
                        return volontaire;
                    }
                    eventsInfo.push({event, volontaires})
                    console.log(eventsInfo);
                    /*
                    event.participants_id.forEach(async (participant_id) => {
                        const volontaire = await Volontaire.findOne({_id: participant_id});
                        eventsInfo.push({event: event, volontaires: volontaire});
                    })
                     */
                }

            });
            res.json(eventsInfo);

        } catch (e) {
            console.log(e);
            return json.status(400).json({message: "Error in getEvents"})
        }
    }

    async getVolontairesByEvent(req, res) {

    }
}
export default new organizationController();