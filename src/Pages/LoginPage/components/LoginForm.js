import {useState} from "react";
import {loginValidationErrors} from "../../../utils/validations";
import axios from "axios";
import {errorMessageBlock} from "../../../utils/errorMessageBlock";
import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

    const changeEmailInput = (e) => { let email = e.target.value; setErrorMessage(null); setEmail(email); }
    const changePasswordInput = (e) => { let pass = e.target.value; setErrorMessage(null); setPassword(pass); }

    const login = async () => {

        let findValidationError = loginValidationErrors(email, password);

        if (!findValidationError) {

            const backendUrl = process.env.REACT_APP_BACKEND_URL;
            const data = {email: email, password: password};

            axios.post(backendUrl + '/api/login', data)
                .then(response => {
                    localStorage.setItem('token', response.data.token);
                    navigate('/');
                })
                .catch(error => {
                    if (error.response) {
                        if (error.response.status === 422) {
                            setErrorMessage(Object.values(error.response.data.data)[0])
                        } else {
                            setErrorMessage(error.response.data.message);
                        }
                    } else {
                        setErrorMessage('Something went wrong!');
                    }
                });
        } else {
            setErrorMessage(findValidationError);
        }
    }

    return (
        <div className={'container mt-percent'}>
                <div className={'form'}>

                    {/** EMAIL INPUT **/}
                    <input type="email" value={email} id={'login-email-inp'} onChange={changeEmailInput} placeholder="Email"
                        className={'input business-font'} maxLength="100"
                    />
                    {/** PASSWORD INPUT **/}
                    <input type="password" value={password} id={'login-password-inp'} onChange={changePasswordInput} placeholder="Password"
                        className={'input business-font'} maxLength="50"
                    />

                    {errorMessageBlock(errorMessage)}

                    <button type="submit" className={'submit-btn business-font'} onClick={login}>Login</button>
                </div>
        </div>
    )
};

export default LoginForm;
