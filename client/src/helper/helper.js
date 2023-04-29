import axios from 'axios';
import  jwt_decode from "jwt-decode";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN

/* Make API requests*/


/**Get username from token */
export async function getUsername(){
    const token =  localStorage.getItem('token');
    console.log("-----token: " + token);
    if(!token) return Promise.reject("Cannot find token");
    let decode = jwt_decode(token);
    console.log("-----decode: " + decode.username)
    return decode.username;
}

//autheticate function
export async function authenticate(username){
    try{
        return await axios.post('/api/authenticate', {username})

    }catch(e){
        return { e: "Username doesn't exist"}
    }
}

/**get User details */
export async function getUser({username}){
    try{
        const {data} = await axios.get(`/api/user/${username}`)
        console.log(data)
        return {data};
    }catch(e){
        return { e: "Password doesn't match"}
    }
}

/**register User func */
export async function registerUser(credentials){
    try{
        let {username, email, password} = credentials;

        const checker = await axios.post(`/api/checkUsernamePasswordUniqness`, {username, email});
        console.log("Call API success 01")

        if(checker.status === 201){
            const {data : {msg}, status} = await axios.post(`/api/register`, credentials);
            console.log("Call API success 02 " + msg)

            // if(status === 200){
            //     await axios.post('/api/registerMail', {username, userEmail: email, text: msg})
            // }
            
            const loginData = await axios.post('/api/login', {username, password})

            console.log("===login after registration with token: " + loginData.data.token)

            return Promise.resolve({loginData, msg});
        }
        else if(checker.status === 200){
            return Promise.reject({msg: "Username and Email were being used"})
        }
    }catch(e){
        return Promise.reject({e});
    }
}

/*login function */
export async function verifyPassword({username, password}){
    try{
        if(username){
            const {data} = await axios.post('/api/login', {username, password});

            console.log("Login data: " + data)

            //localStorage.setItem('token', token);

            return Promise.resolve({data});
        }
    }catch(e){
        return Promise.reject({e: "Password doesnot match"});
    }
}

/**update user profile function */
export async function updateUser(response){
    try{
        const token = localStorage.getItem('token');
        console.log('Token: ' + token)
        console.log(response)

        const bearerToken = {
            headers : { 'Authorization' : `Bearer ${token}`}
        }

        console.log("Bearer token: " + bearerToken.headers.Authorization)

        const data = await axios.put('/api/updateUser', response, bearerToken);

        console.log("Request has been sent")

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