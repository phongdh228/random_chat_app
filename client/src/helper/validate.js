import toast from 'react-hot-toast';
import { autheticate } from './helper';

/* validate login page username */
export async function usernameValidate(values) {
    const errors = usernameVerify({}, values);

    if(values.username){
        //check user existence
        const {status} = await autheticate(values.username);

        if(status !== 200){
            errors.exist = toast.error("User does not exist");
        }
    }

    return errors;
}

/*validate password */
export async function passwordValidate(values) {
    const errors = passwordVerify({}, values);

    return errors;
}

/*validate reset password */
export async function resetPasswordValidation(values) {
    const errors = passwordVerify({}, values);

    if(values.password !== values.confirm_pwd){
        errors.exist = toast.error("Password not match");
    }

    return errors;
}
/************************** */

/*validate register form*/
export async function registerValidation(values) {
    const errors = usernameVerify({}, values);
    passwordVerify(errors, values);
    emailVerify(errors, values);

    return errors;
}

/*validate profile page*/
export async function profileValidation(values) {
    const errors = emailVerify({}, values);
    return errors;
}

/*validate password */
function passwordVerify(errors ={} ,values) {

    const specialCharacters = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
    if(!values.password){
        errors.password = toast.error("Password is required");
    }
    else if(values.password.includes(" ")){
        errors.password = toast.error("Wrong password");
    }
    else if(values.password.length < 4){
        errors.password = toast.error("Password must be at least 4 characters");
    }else if(!specialCharacters.test(values.password)){
        errors.password = toast.error("Password must have special characters");
    }

    return errors;
}
/*validate username */
function usernameVerify(error = {}, values){
    if(!values.username){
        error.username = toast.error("Username Required");
    }
    else if(values.username.includes(" ")){
        error.username = toast.error("Invalid username");
    }

    return error;
}

/*validate email address */
function emailVerify(error = {}, values){
    if(!values.email){
        error.email = toast.error("Email Required");
    }
    else if(values.email.includes(" ")){
        error.email = toast.error("Wrong email");
    }
    else if(!/[A-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        error.email = toast.error("Invalid email");
    }

    return error;
}