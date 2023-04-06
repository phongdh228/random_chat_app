import {Router} from 'express';
const router = Router();

import * as controller from '../controllers/authenticationController.js';
import Auth, {localVariable} from '../middleware/auth.js';
import { registerMail } from '../controllers/mailer.js';

/*POST method*/
router.route('/register').post(controller.register);
router.route('/registerMail').post(registerMail);
router.route('/authenticate').post(controller.verifyUser, (req,res)=> res.end());
router.route('/login').post(controller.verifyUser, controller.login);


/*GET method*/
router.route('/user/:username').get(controller.getUser);
router.route('/generateOTP').get(controller.verifyUser, localVariable, controller.generateOTP);
router.route('/verifyOTP').get(controller.verifyUser, controller.verifyOTP);
router.route('/createResetSession').get(controller.createResetSession);

/*PUT method*/
router.route('/updateuser').put(controller.updateUser);
router.route('/resetPassword').put(controller.verifyUser, controller.resetPassword);

export default router;