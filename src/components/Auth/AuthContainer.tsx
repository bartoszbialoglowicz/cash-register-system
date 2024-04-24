import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../store/user-context";

import './AuthContainer.css';
import LoginForm from "./LoginForm";
import { TokenResponse } from "../../utils/types";
import { TOKEN_URL } from "../../utils/urls";
import { usePublicApiRequest } from "../../hooks/use-public-api-request";

const AuthContainer: React.FC = () => {

    const inputValue = useRef<HTMLInputElement>(null);
    const passwordValue = useRef<HTMLInputElement>(null);

    const userCtx = useContext(UserContext);
    const {isLoading, error, sendRequest} = usePublicApiRequest();

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const getResponse = async () => {
        const response = await sendRequest<TokenResponse>({method: "POST", url: TOKEN_URL, body:{username: inputValue.current!.value, password: passwordValue.current!.value}});
        return response;
    }

    const handleResponse = async (response: TokenResponse | undefined) => {
        if (response) {
            console.log(response);
        } else if (error) {
            setErrorMessage("Error");
        }
    }

    const formSubmitHandler = async (event: FormEvent) => {
        event.preventDefault();
        const response = await getResponse();
        handleResponse(response);
    }

    useEffect(() => {
        setErrorMessage(null);
        if (error && error.code === 401) {
            setErrorMessage("Invalid credentials!");
        } else if (error){
            setErrorMessage(error.message);
        }
    }, [error])

    return <div className="auth">
        <LoginForm formSubmitHandler={formSubmitHandler} inputValue={inputValue} passwordValue={passwordValue} error=""/>
        {errorMessage && errorMessage}
    </div>
};

export default AuthContainer;