import { FcGoogle } from 'react-icons/fc';
import { IoLogoTwitter } from 'react-icons/io';
import { BiLogoFacebook } from 'react-icons/bi';

export const SocialLinks = () => {

    return (
         <div className="social-wrapper">
             <div className="fb">
                 <BiLogoFacebook /><p>Login with Facebook</p>
             </div>
             <div className="twitter">
                 <IoLogoTwitter /><p>Login with Twitter</p>
             </div>
             <div className="google">
                 <FcGoogle /><p>Login with Google</p>
             </div>
         </div>
    );
};

export default SocialLinks;