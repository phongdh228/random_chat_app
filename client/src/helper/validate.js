import toast from 'react-hot-toast';

/* validate login page username */
export async function usernameValidate(values) {
    const errors = usernameVerify({}, values);

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

/*validate password */
function passwordVerify(errors ={} ,values) {

    const specialCharacters = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
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