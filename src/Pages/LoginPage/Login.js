import LoginForm from "./components/LoginForm";
import {Links} from "./components/Links";

export const Login = () => {

    return (
        <div className={'wrapper bg-main'}>
            <LoginForm />
            <Links />
        </div>
    );
};

export default Login;
