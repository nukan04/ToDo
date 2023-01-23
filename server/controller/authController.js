import Organization from "../models/roles/Organization.js";
import Volontaire from "../models/roles/Volontaire.js";
import Role from "../models/Role.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config.js";
import {validationResult} from "express-validator";
import organization from "../models/roles/Organization.js";

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, config.secret, {expiresIn: "5h"})
}

class authController {
    async registrateOrganization(req, res) {
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                return res.status(400).json({message: "Incorrect request in registration", error})
            }
            const {email, password, name} = req.body;
            const candidate = await Organization.findOne({email});
            const candidate2 = await Organization.findOne({name});
            if (candidate || candidate2) {
                return res.status(400).json({message: "Organization already exist"})
            }
            var hash = bcrypt.hashSync(password, 4);
            const role = await Role({value: "ORGANIZATION"});
            const organization = new Organization({email, password: hash, name, roles: [role.value]});
            await organization.save();
            return res.json({message: "Organization was created"});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "Registration error"})
        }

    }
    async registrateVolontaire(req, res) {
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                return res.status(400).json({message: "Incorrect request in registration", error})
            }
            const {email, password, firstname, lastname, birthdate, phone} = req.body;
            const candidate = await Volontaire.findOne({email});
            if (candidate) {
                return res.status(400).json({message: "Organization already exist"})
            }
            var hash = bcrypt.hashSync(password, 4);
            const role = await Role({value: "VOLONTAIRE"});
            const volontaire = new Volontaire({email, password: hash, firstname, lastname, birthdate, phone, roles: [role.value]});
            await volontaire.save();
            return res.json({message: "Volontaire was created"});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "Registration error"})
        }

    }
    async loginVolontaire(req, res) {
        try{
            const {email, password} = req.body;
            const volontaire = await Volontaire.findOne({email});
            if(!volontaire){
                return res.status(400).json({message: "Volontaire not found"});
            }
            const validPassword = bcrypt.compareSync(password, volontaire.password);
            if(!validPassword){
                return res.status(400).json({message: "Password is incorrect"});
            }
            const token = generateAccessToken(volontaire._id, volontaire.roles);
            return res.json({token});
        }catch (e) {
            console.log(e);
            res.status(400).json({message: "Login error"})
        }
    }
    async loginOrganization(req, res) {
        try{
            const {email, password} = req.body;
            const organization = await Organization.findOne({email});
            if(!organization){
                return res.status(400).json({message: "Organization not found"});
            }
            const validPassword = bcrypt.compareSync(password, organization.password);
            if(!validPassword){
                return res.status(400).json({message: "Password is incorrect"});
            }
            const token = generateAccessToken(organization._id, organization.roles);
            return res.json({token});
        }catch (e) {
            console.log(e);
            res.status(400).json({message: "Login error"})
        }
    }
}
export default new authController();