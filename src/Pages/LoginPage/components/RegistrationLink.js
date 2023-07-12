import { useNavigate } from 'react-router-dom';

export const RegistrationLink = () => {

    const navigate = useNavigate();
    const navigateToRegistration = () => { navigate('/registration'); }

    return (
        <div className={'registration-link-block'}>
            <span className={'color-grey business-font'}>Don't Have An Account?
                 <span onClick={navigateToRegistration} className={'color-blue cursor-pointer'}> Sign Up Now</span>
            </span>
        </div>
    )
};

export default RegistrationLink;
