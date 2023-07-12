import {useNavigate, Navigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

const AuthGuard = ({children}) => {

    const navigate = useNavigate();

    const [user, setUser] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const backendUrl = process.env.REACT_APP_BACKEND_URL;

        if (token && backendUrl) {

            const config = { headers: { Authorization: `Bearer ${token}` } };

            axios.get(backendUrl + '/api/user', config).then(
                    response => {
                        setUser(response.data.user)
                    }
                    ).catch(
                    err => {
                        localStorage.removeItem('token');
                        navigate('/');
                        console.log(err)
                    }
                );

        } else {
            navigate('/login');
        }

    }, [])

    if (!localStorage.getItem('token')) {
        return <Navigate to={"/login"}/>
    }

    if (!user) {
        return null;
    }

    return children;

}

export default AuthGuard;