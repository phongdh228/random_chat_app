import {Navigate} from 'react-router-dom'

export const AuthorizeUser = ({children}) => {
    const token = localStorage.getItem('token');

    if(!token) {
        return <Navigate to={'/'} replace={true}></Navigate>
    }
}

export const ProtectRoute = ({ children }) =>{
    const username = userAuthStore.getState().username;
    if(!username) {
        return <Navigate to={'/'} replace={true}></Navigate>
    }
    return children;
}