import { FormEvent, useContext, useRef, useState } from "react";
import { ServerAuthResponse, User } from "../../utils/types";
import { UserContext } from "../../store/user-context";

const LoginForm: React.FC = () => {

    const inputValue = useRef<HTMLInputElement>(null);
    const passwordValue = useRef<HTMLInputElement>(null);

    const [error, setError] = useState<string>('');

    const DUMMY_USERNAME_CHECK = "test";
    const DUMMY_PASSWORD_CHECK = "test";

    const userCtx = useContext(UserContext);

    const dummy_check = () => {
        let isValid = true;
        if (inputValue.current!.value !== DUMMY_USERNAME_CHECK)
            isValid = false;
        if (passwordValue.current!.value !== DUMMY_PASSWORD_CHECK)
            isValid = false;
        const response: ServerAuthResponse  = isValid ? {code: 200, message: "Succesfully logged in", user: {id: 1, username: "test"}} : {code: 401, message: "Invalid credentials"};

        return response;
    }

    const getResponse = async () => {
        const {code, message, user} = await dummy_check();
        return {code, message, user};
    }

    const handleResponse = async () => {
        const {code, message, user} = await getResponse();
        if (code === 200 && user) {
            userCtx.login(user);
            return;
        }
        setError(message);
    }

    const formSubmitHandler = (event: FormEvent) => {
        event.preventDefault();
        handleResponse();
    }

    return <div className="login-form" onSubmit={formSubmitHandler}>
        <form>
            <div className="login-form-label"><label>Username</label><input type="text" ref={inputValue}/></div>
            <div className="login-form-label"><label>Password</label><input type="password" ref={passwordValue}/></div>
            {error && <div className="login-form-error"><p>{error}</p></div>}
            <div className="login-form-label"><label></label><input type="submit" /></div>
        </form>
    </div>
};

export default LoginForm;