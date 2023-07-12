import axios from "axios";

export const GoogleLogoLogin = () => {

    const getUrlForGoogle = () => {

        const backendUrl = process.env.REACT_APP_BACKEND_URL;

        axios.get(backendUrl+'/api/google/get-url').then(response => {

                /** Here we go to the GOOGLE login form **/
                window.document.location = response.data.url;

            }).catch(error => { console.error(error); });
    }

    return (<div className={'google-logo-login cursor-pointer'} onClick={getUrlForGoogle}>G</div>);
};

export default GoogleLogoLogin;
