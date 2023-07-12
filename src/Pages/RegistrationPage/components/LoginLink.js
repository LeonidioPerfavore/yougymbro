import { useNavigate } from 'react-router-dom';

export const LoginLink = () => {

    const navigate = useNavigate();

    const navigateToLogin = () => { navigate('/login'); }

    return (<div className={'container'}>
               <span className={'color-grey'}>Already have an account?
                    <span onClick={navigateToLogin} className={'color-blue cursor-pointer'}> Sign in</span>
               </span>
            </div>)
};

export default LoginLink;
