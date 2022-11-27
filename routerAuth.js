import express from 'express'
const router = express.Router();
import controller from './controllerAuth.js'
import {check} from 'express-validator'
import authMiddleware from './middleware/authMiddleware.js'
import roleMiddleware from './middleware/roleMiddleware.js'

router.post('/registration', [
    check('username', "Username can't be empty").notEmpty(),
    check('password', "Password can't be empty").isLength({min: 4, max: 12})
], controller.registration)

router.post('/login', controller.login)
router.get('/users', /*roleMiddleware(['ADMIN']),*/ controller.getUsers)

router.post('/addTask', authMiddleware, controller.addTask)
router.get('/getTasks', authMiddleware, controller.getTasks)
router.delete('/deleteTask', authMiddleware, controller.deleteTask)
export default  router;

