import {Router} from 'express';
const router = Router();

import * as controller from '../controllers/appController.js';
import Auth from '../middleware/auth.js';

/*POST method*/
router.route('/register').post(controller.register);
//router.route('/registerMail').post();
router.route('/authenticate').post((req,res)=> res.end());
router.route('/login').post(controller.verifyUser, controller.login);


/*GET method*/
router.route('/user/:username').get(controller.getUser);
router.route('/generateOTP').get(controller.generateOTP);
router.route('/verifyOTP').get(controller.verifyOTP);
router.route('/createResetSession').get(controller.createResetSession);

/*PUT method*/
router.route('/updateuser').put(controller.updateUser);
router.route('/resetPassword').put(controller.resetPassword);

export default router;