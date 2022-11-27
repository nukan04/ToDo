/**
 * Module dependencies.
 */
import express from 'express'
const router = express.Router();
import controller from './controllerAuth.js'
import {check} from 'express-validator'
import authMiddleware from './middleware/authMiddleware.js'
import roleMiddleware from './middleware/roleMiddleware.js'

/**
 * @route   POST api/auth/registration
 * @desc    Register user
 * @access  Public
 * @return  {object} 201 - user object
 * @return  {Error}  400 - Bad request
 */
router.post('/registration', [
    check('username', "Username can't be empty").notEmpty(),
    check('password', "Password can't be empty").isLength({min: 4, max: 12})
], controller.registration)

/**
 * @route   POST api/auth/login
 * @desc    Login user
 * @access  Public
 * @return  {token} 200 - user object
 * @return  {Error} 400 - Bad request
 */
router.post('/login', controller.login)

/**
 * @route   GET api/auth/users
 * @desc    Get all users
 * @access  Private
 * @return  {users} 200 - user object
 * @return  {Error}  400 - Bad request
 */
router.get('/users', /*roleMiddleware(['ADMIN']),*/ controller.getUsers)

/**
 * @route   GET api/auth/addTask
 * @desc    Add task
 * @access  Private
 * @return  { something} 200 - user object
 * @return  {Error}  400 - Bad request
 */
router.post('/addTask', authMiddleware, controller.addTask)
/**
 * @route   GET api/auth/getTasks
 * @desc    Get tasks
 * @access  Private
 * @return  {user.tasks} 200 - user object
 * @return  {Error}  400 - Bad request
 */
router.get('/getTasks', authMiddleware, controller.getTasks)
/**
 * @route DELETE api/auth/delereTask
 * @desc Delete task
 * @access private
 * @return {user.tasks} 200 - user object
 *  @return  {Error}  400 - Bad request
 */
router.delete('/deleteTask', authMiddleware, controller.deleteTask)
/**
 * @export router
 */
export default  router;

