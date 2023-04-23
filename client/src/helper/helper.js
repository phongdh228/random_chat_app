import axios from 'axios';
import  jwt_decoder from "jwt-decode";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN

/* Make API requests*/


/**Get username from token */
export async function getUsername(){
    const token =  localStorage.getItem('token');
    if(!token) return Promise.reject("Cannot find token");
    let decode = jwt_decoder(token);
    return decode;
}

//autheticate function
export async function autheticate(username){
    try{

        return await axios.post('/api/authenticate', {username})

    }catch(e){
        return { e: "Username doesn't exist"}
    }
}

/**get User details */
export async function getUser({username}){
    try{
        const {data} = await axios.get(`/api/user${username}`)
        return {data};
    }catch(e){
        return { e: "Password doesn't match"}
    }
}

/**register User func */
export async function registerUser(credentials){
    try{
        console.log(credentials)
        console.log("Calling API")
        let {username, email} = credentials;

        const {data : {msg}, status} = await axios.post(`/api/checkUsernamePasswordUniqness`, {username, email});
        console.log("Call API success 01")

        /**send email */
        if(status === 200){
            await axios.post('/api/registerMail', {username, userEmail: email, text: msg})
            console.log("Call API success 02")
        }

        return Promise.resolve(msg);
    }catch(e){
        return Promise.reject({e});
    }
}

/*login function */
export async function verifyPassword({username, password}){
    try{
        if(username){
            const {data} = await axios.post('/api/login', {username, password});
            return Promise.resolve({data});
        }
    }catch(e){
        return Promise.reject({e: "Password doesnot match"});
    }
}

/**update user profile function */
export async function updateUser(response){
    try{

        const token = await localStorage.getItem('token');
        const data = await axios.put('api/updateuser', response, {headers: {'Authorization': `Bearer ${token}`}});

        return Promise.resolve({data});

    }catch(e){
        return Promise.reject({e: "Couldn't update user"});
    }
}

/**generate otp */
export async function generateOTP(username){
    try{
        const {data: {code}, status} = await axios.get('/api/generateOTP', {params: {username}});

        //send mail with otp
        if(status === 201){
            let{data : {email}} = await getUser({username});
            let text = `Your Password Recovery OTP is ${code}. Verify and recover your password`;
            await axios.post('/api/registerMail', {username, userEmail: email, text, subject: "Password recovery OTP"})
        }

        return Promise.resolve(code);
    }catch(e){
        return Promise.reject({e});
    }
}

/**verify OTP */
export async function verifyOTP({username, code}){
    try{
        const {data, status} = await axios.get('/api/verifyOTP', {params: {username, code}});

        return {data, status}
    }catch(e){
        return Promise.reject({e});
    }
}

/** reset password*/
export async function resetPassword({username, password}){
    try{

        const {data, status} = await axios.put('/api/resetPassword', {username, password});

        return Promise.resolve({data, status});

    }catch(e){
        return Promise.reject({e});
    }
}

// export async function initUserHobbies(){
//     try{
//         const {data : {msg}, status} = await axios.post(`/api/register`, credentials);

//         let {username, email} = credentials;

//         /**send email */
//         if(status === 200){
//             await axios.post('/api/registerMail', {username, userEmail: email, text: msg})
//         }

//         return Promise.resolve(msg);
//     }catch(e){
//         return Promise.reject({e});
//     }
// }