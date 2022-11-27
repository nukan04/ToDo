
/** Express router providing user related routes
 * @module routers/auth
 * @requires express
 */

/**
 * express module
 * @const
 */
import express from 'express'
import controller from './controllerAuth.js'
import {check} from 'express-validator'
import authMiddleware from './middleware/authMiddleware.js'
import roleMiddleware from './middleware/roleMiddleware.js'

/**
 * Express router to mount user related functions on.
 * @type {object}
 * @const
 * @namespace usersRouter
 */
const router = express.Router();

/**
 * Route serving login form.
 * @name post/registration
 * @function
 * @memberof module:routers/users~usersRouter
 * @inner
 * @param {string} path - Express path
 * @param {check} - express-validator.
 * @param {registration} function - controllerAuth.
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
 * @route DELETE api/auth/deleteTask
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

