import {Router} from 'express';
const router = Router();

import * as authController from '../controllers/authenticationController.js';
import * as callController from '../controllers/videochatController.js';
import Auth, {localVariable} from '../middleware/auth.js';
import { registerMail } from '../controllers/mailer.js';

/*POST method*/
router.route('/checkUsernamePasswordUniqness').post(authController.checkUsernamePasswordUniqness);
router.route('/register').post(authController.register);
router.route('/registerMail').post(registerMail);
router.route('/authenticate').post(authController.verifyUser, (req,res)=> res.end());
router.route('/login').post(authController.verifyUser, authController.login);


/*GET method*/
router.route('/user/:username').get(authController.getUser);
router.route('/generateOTP').get(authController.verifyUser, localVariable, authController.generateOTP);
router.route('/verifyOTP').get(authController.verifyUser, authController.verifyOTP);
router.route('/createResetSession').get(authController.createResetSession);


router.route('/testInterest').get(authController.updateUserHobbies);

/**VIDEO CHAT */
router.route('/:room').get(callController.connectToRoom);
router.route('/video').get(callController.video);

/*PUT method*/
router.route('/updateUser').put(Auth, authController.updateUser);
router.route('/resetPassword').put(authController.verifyUser, authController.resetPassword);

export default router;