
import Volontaire from "../models/roles/Volontaire.js";
import Event from "../models/Events.js";

class volontaireController {
    async subscribe(req, res) {
        try {
            const eventBody = req.body;
            const volontaire = await Volontaire.findById(req.user.id)
            const event = await Event.findById(eventBody.id);
            if (!event) {
                res.json({message: "Event not found"});
                return res.status(400).json({message: "Event not found"});
            }
            if (!volontaire) {
                res.json({message: "Volontier not found"});
                return res.status(400).json({message: "Volontaire not found"});
            }
            if(event.numberOfParticipants == 0){
                return res.status(400).json({message: "Event is full, you cannot subscribe"});
            }
            event.participants_id.push(volontaire.id);
            event.numberOfParticipants = event.numberOfParticipants - 1;
            await event.save();
            //console.log("event",event);
            volontaire.myEvents_id.push(event.id);
            await volontaire.save();
            if(event.numberOfParticipants - 1 == 0) {
                return res.json({message: "Volontaire subscribed and event closed"});
                //closeEvent(event);
            }
            return res.json({message: "Volontaire was subscribed"});

        } catch (e) {
            console.log(e);
            return json.status(400).json({message: "Error in subscribe"})
        }
    }
    async unsubscribe(req, res) {
        try {
            const eventBody = req.body;
            //console.log(eventBody);
            const volontaire = await Volontaire.findById(req.user.id)
            const event = await Event.findById(eventBody.id);
            if (!event) {
                return res.status(400).json({message: "Event not found"});
            }
            if (!volontaire) {
                return res.status(400).json({message: "Volontaire not found"});
            }
            if(!event.participants_id.includes(volontaire.id)) {
                return res.status(400).json({message: "You are not subscribed"});
            }
            event.participants_id.pull(volontaire.id);
            event.numberOfParticipants = event.numberOfParticipants + 1;
            await event.save();
            //console.log("event",event);
            volontaire.myEvents_id.pull(event._id);
            await volontaire.save();
            res.json({message: "Volontaire was unsubscribed"});

        } catch (e) {
            console.log(e);
            return json.status(400).json({message: "Error in unsubscribe"})
        }
    }
    async getMyEvents(req, res) {

    }
    async getEventById(req, res) {
        try{
            const id = req.params.id;
            const events = await Event.findById(id);
            if (!events) {
                return res.status(400).json({message: "Events not found"});
            }
            let status = "subscribe";
            if(events.participants_id.includes(req.data.id)) status = "unsubscribe";
            //delete participants from event
            events.participants_id = undefined;
            return res.json({event: events, status: status});

        }catch (e) {
            console.log(e);
            return json.status(400).json({message: "Error in getEvents"})
        }
    }
}

export default new volontaireController();
