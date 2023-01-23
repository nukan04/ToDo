
import Volontaire from "../models/roles/Volontaire.js";
import Event from "../models/Events.js";

class volontaireController {
    async subscribe(req, res) {
        try {
            const {event_id} = req.body;
            console.log(event_id);
            console.log(req.data);
            const volontaire = await Volontaire.findById(req.data.id)
            const event = await Event.findById(event_id);
            if (!event) {
                return res.status(400).json({message: "Event not found"});
            }
            if (!volontaire) {
                return res.status(400).json({message: "Volontaire not found"});
            }
            if(event.numberOfParticipants == 0){
                return res.status(400).json({message: "Event is full, you cannot subscribe"});
            }
            console.log(event.participants_id);
            console.log(volontaire.id);
            if(event.participants_id.includes(volontaire.id)) {
                return res.status(400).json({message: "You are already subscribed"});
            }
            event.participants_id.push(volontaire.id);
            event.numberOfParticipants = event.numberOfParticipants - 1;
            await event.save();
            volontaire.myEvents_id.push(event_id);
            await volontaire.save();
            if(event.numberOfParticipants - 1 == 0) {
                res.json({message: "Volontaire subscribed and event closed"});
                //closeEvent(event);
            }
            res.json({message: "Volontaire was subscribed"});

        } catch (e) {
            console.log(e);
            return json.status(400).json({message: "Error in subscribe"})
        }
    }
    async unsubscribe(req, res) {
        try {
            const {event_id} = req.body;
            const volontaire = await Volontaire.findOne({id: req.data.id})

            const event = await Event.findOne({id: event_id});
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
            volontaire.myEvents_id.pull(event_id);
            await volontaire.save();
            res.json({message: "Volontaire was unsubscribed"});

        } catch (e) {
            console.log(e);
            return json.status(400).json({message: "Error in unsubscribe"})
        }
    }
}

export default new volontaireController();
