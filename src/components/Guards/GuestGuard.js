import { Navigate } from "react-router-dom";

const GuestGuard = ({children}) => {

    if(localStorage.getItem('token')){
        return <Navigate to={"/"} />
    }

    return children;

}

export default GuestGuard;