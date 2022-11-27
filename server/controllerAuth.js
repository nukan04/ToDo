import User from './models/User.js'
import Role from './models/Role.js'
import bcrypt from 'bcryptjs'
import {validationResult} from "express-validator";
import jwt from 'jsonwebtoken'
import config from './config.js'
import todoList from "./models/list.js";

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, config.secret, {expiresIn: "1h"})
}


class controllerAuth {

    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Incorrect request in registration", errors})
            }
            const {username, password} = req.body;
            const candidate = await User.findOne({username});
            if (candidate) {
                return res.status(400).json({message: "User already exist"})
            }
            var hash = bcrypt.hashSync(password, 4);
            const userRole = await Role({value: "USER"});
            const user = new User({username, password: hash, roles: [userRole.value]});
            await user.save();
            return res.json({message: "User was created"});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "Registration error"})
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body;
            const user = await User.findOne({username});
            if (!user) {
                return res.status(400).json({message: "Login is incorrect"})
            }
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json({message: "Password is incorrect"})
            }
            const token = generateAccessToken(user._id, user.roles);
            return res.json({token});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "Login error"})
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "Login error"})
        }
    }

    async addTask(req, res) {
        try {
            const {task} = req.body;
            console.log(req.user)
            console.log(task)
            const user = await User.findOne({_id: req.user.id});
            if (!user) {
                return res.status(400).json({message: "Login is incorrect"})
            }
            const tempTask = await User.findOne({_id: req.user.id, tasks: task});
            if(tempTask){
                return res.status(400).json({message: "Task already exist"})
            }
            await user.tasks.push(task);
            await user.save();
            res.json({message: "Task was created"});
        } catch (e) {
            console.log(e);
            return res.status(400).json({message: "Add list error"})
        }
    }
    async getTasks(req, res) {
        try {
            const user = await User.findOne({_id: req.user.id});
            if (!user) {
                return res.status(400).json({message: "Login is incorrect"})
            }
            return res.json(user.tasks);
        } catch (e) {
            console.log(e);
            return res.status(400).json({message: "Get list error"})
        }
    }
    async deleteTask(req, res) {
        try {
            const {task} = req.body;
            const user = await User.findOne({_id: req.user.id});
            if (!user) {
                return res.status(400).json({message: "Login is incorrect"})
            }
            await user.tasks.pull(task);
            await user.save();
            return res.json(user.tasks);
        } catch (e) {
            console.log(e);
            return res.status(400).json({message: "Get list error"})
        }
    }
}

export default new controllerAuth();