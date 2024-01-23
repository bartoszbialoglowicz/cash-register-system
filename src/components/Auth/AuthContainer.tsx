import { FormEvent, useContext, useRef, useState } from "react";
import { ServerAuthResponse, User } from "../../utils/types";
import { UserContext } from "../../store/user-context";

import './AuthContainer.css';
import LoginForm from "./LoginForm";

const AuthContainer: React.FC = () => {

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
        const response: ServerAuthResponse  = isValid ? {code: 200, message: "Succesfully logged in", user: {id: 1, username: "test", isAdmin: false}} : {code: 401, message: "Invalid credentials"};

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

    return <div className="auth">
        <LoginForm formSubmitHandler={formSubmitHandler} inputValue={inputValue} passwordValue={passwordValue} error={error}/>
    </div>
};

export default AuthContainer;