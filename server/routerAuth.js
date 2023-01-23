import express from 'express'
import controller from './controller/controllerAuth.js'
import auth from './controller/authController.js'
import organization from './controller/organizationController.js'
import {check} from 'express-validator'
import authMiddleware from './middleware/authMiddleware.js'
import roleMiddleware from "./middleware/roleMiddleware.js";
import volontaire from "./controller/volontaireController.js";
import admin from "./controller/adminController.js";

const router = express.Router();
//organization routes
router.post('/registrateOrganization', [
    check('email', "Username can't be empty").notEmpty(),
    check('password', "Password can't be empty").isLength({min: 4, max: 12}),
    check('name', "Name can't be empty").notEmpty()
], auth.registrateOrganization)
router.post('/createEvent', roleMiddleware('[ORGANIZATION]'), [
    check('title', "Title cannot be empty").notEmpty(),
    check('date', "Date cannot be empty").notEmpty()
], organization.createEvent)
router.post('/loginOrganization', [
    check('email', "Username can't be empty").notEmpty(),
    check('password', "Password can't be empty").isLength({min: 4, max: 12})
], auth.loginOrganization)
router.delete('/deleteEvent', roleMiddleware('[ORGANIZATION]'), organization.deleteEvent)
router.get('/getEvents', roleMiddleware('[ORGANIZATION]'), organization.getEvents)
//volontaire routes
router.post('/registrateVolontaire', [
    check('email', "Username can't be empty").notEmpty(),
    check('password', "Password can't be empty").isLength({min: 4, max: 12}),
    check('firstname', "Firstname can't be empty").notEmpty(),
    check('lastname', "Lastname can't be empty").notEmpty(),
    check('birthdate', "BirthDate can't be empty").notEmpty(),
    check('phone', "Phone can't be empty").notEmpty()
], auth.registrateVolontaire)
router.post('/loginVolontaire', [
    check('email', "Username can't be empty").notEmpty(),
    check('password', "Password can't be empty").isLength({min: 4, max: 12})
], auth.loginVolontaire)
router.post('/subscribe', roleMiddleware('[VOLONTAIRE]'), volontaire.subscribe)
router.post('/unsubscribe', roleMiddleware('[VOLONTAIRE]'), volontaire.unsubscribe)
//---------------ADMIN
router.post('/registerAdmin', [
    check('email', "Username can't be empty").notEmpty(),
    check('password', "Password can't be empty").isLength({min: 4, max: 12})
], admin.registration)
router.post('/loginAdmin', [
    check('email', "Username can't be empty").notEmpty(),
    check('password', "Password can't be empty").isLength({min: 4, max: 12})
], admin.login)
router.get('/GetAllEvents', /*roleMiddleware('[ADMIN]'),*/ admin.GetAllEvents)
router.get('/GetAllOrganizations', roleMiddleware('[ADMIN]'), admin.GetAllOrganizations)
router.get('/GetAllVolontaires', roleMiddleware('[ADMIN]'), admin.GetAllVolontaires)
router.delete('/DeleteEvent', roleMiddleware('[ADMIN]'), admin.DeleteEvent)
/*
router.post('/registration', [
    check('username', "Username can't be empty").notEmpty(),
    check('password', "Password can't be empty").isLength({min: 4, max: 12})
], controller.registration)
*/
router.post('/login', controller.login)
router.get('/users', /*roleMiddleware(['ADMIN']),*/ controller.getUsers)
router.post('/addTask', authMiddleware, controller.addTask)
router.get('/getTasks', authMiddleware, controller.getTasks)
router.delete('/deleteTask', authMiddleware, controller.deleteTask)
//
export default router;

