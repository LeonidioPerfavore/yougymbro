import LoginLink from "./components/LoginLink";
import {registrationValidationErrors} from "../../utils/validations";
import axios from "axios";
import {errorMessageBlock} from "../../utils/errorMessageBlock";
import {useNavigate} from 'react-router-dom';
import { useState } from "react";

export const Registration = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

    const changeNameInput = (e) => { let name = e.target.value; setErrorMessage(null); setName(name); }
    const changeEmailInput = (e) => { let email = e.target.value; setErrorMessage(null); setEmail(email); }
    const changePasswordInput = (e) => { let pass = e.target.value; setErrorMessage(null); setPassword(pass); }

    const registration = async () => {

        let findValidationError = registrationValidationErrors(name, email, password);

        if (!findValidationError) {

            const backendUrl = process.env.REACT_APP_BACKEND_URL;
            const data = {name: name, email: email, password: password};

            axios.post(backendUrl + '/api/register', data)
                .then(response => {
                    localStorage.setItem('token', response.data.token);
                    navigate('/');

                }).catch(error => {
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
    };

    return (
        <div className={'wrapper bg-main'}>
            <div className="container mt-percent">
                <div className={'form'}>

                    {/** NAME **/}
                    <input type="name" placeholder="Name" className={'input'} id={'register-name-inp'}
                           value={name} onChange={changeNameInput} maxLength="100"
                    />
                    {/** EMAIL **/}
                    <input type="email" placeholder="Email" className={'input'} id={'register-email-inp'}
                           value={email} onChange={changeEmailInput} maxLength="100"
                    />
                    {/** PASSWORD **/}
                    <input type="password" placeholder="Password" className={'input'} id={'register-pass-inp'}
                           value={password} onChange={changePasswordInput} maxLength="50"
                    />

                    {errorMessageBlock(errorMessage)}

                    {/** REGISTRATION BTN **/}
                    <button type="submit" className={'submit-btn'} onClick={registration}>Registration</button>
                </div>
            </div>

            <LoginLink />

        </div>)
};

export default Registration;
