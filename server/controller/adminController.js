import Organization from "../models/roles/Organization.js";
import Volontaire from "../models/roles/Volontaire.js";
import Event from "../models/Events.js";

import {validationResult} from "express-validator";
import bcrypt from "bcryptjs";
import Role from "../models/Role.js";
import Admin from "../models/roles/Admin.js"
import jwt from "jsonwebtoken";
import config from "../config.js";
const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, config.secret, {expiresIn: "1h"})
}
class adminController {
    async registration(req, res){
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Incorrect request in registration", errors})
            }
            const {email, password} = req.body;
            const candidate = await Admin.findOne({email});
            if (candidate) {
                return res.status(400).json({message: "Admin already exist"})
            }
            var hash = bcrypt.hashSync(password, 4);
            const userRole = await Role({value: "ADMIN"});
            const admin = new Admin({email, password: hash, roles: [userRole.value]});
            await admin.save();
            return res.json({message: "Admin was created"});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "Registration error(admin)"})
        }
    }
    async login(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Incorrect request in login", errors})
            }
            const {email, password} = req.body;
            const admin = await Admin.findOne({email});
            if(!admin){
                return res.status(400).json({message: "Incorrect data"})
            }
            const validPassword = bcrypt.compareSync(password, admin.password);
            if (!validPassword) {
                return res.status(400).json({message: "Incorrect data"})
            }
            const token = generateAccessToken(admin._id, admin.roles);
            return res.json(token);
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "Login error(admin)"})
        }
    }
    async GetAllEvents(req, res) {
        try {
            const events = await Event.find();
            res.json(events)
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "GetEventsError"})
        }
    }

    async GetAllOrganizations(req, res) {
        try {
            const organizations = await Organization.find();
            res.json(organizations)
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "GetOrganizationsError"})
        }
    }

    async GetAllVolontaires(req, res) {
        try {
            const volontaires = await Volontaire.find();
            res.json(volontaires)
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "GetVolontairesError"})
        }
    }
    async DeleteEvent(req, res) {
        try{
            const {event_id} = req.body;
            const event = await Event.findById(event_id);
            if(!Event){
                return res.status(400).json({message: "Event not found"})
            }
            const organization = await Organization.findById(event.organization_id);
            if(!organization){
                return res.status(400).json({message: "Organization not found"})
            }
            organization.events_id.pull(event_id)
            await organization.save();
            console.log(organization);
            const volontaires = await Volontaire.find({_id: event.participants_id});
            volontaires.forEach(async (volontaire) => {
                volontaire.events_id.pull(event_id);
                await volontaire.save();
                console.log(volontaire);
            })
            await Event.deleteOne({_id: event_id});
            res.json({message: "Event was deleted"})
        }catch (e) {
            console.log(e);
            res.status(400).json({message: "DeleteEventError"})
        }
    }
}

export default new adminController();