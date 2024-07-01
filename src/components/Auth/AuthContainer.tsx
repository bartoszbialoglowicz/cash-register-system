import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../store/user-context";

import './AuthContainer.css';
import LoginForm from "./LoginForm";
import { TokenResponse, User } from "../../utils/types";
import { TOKEN_URL, USER_URL } from "../../utils/urls";
import { usePublicApiRequest } from "../../hooks/use-public-api-request";
import ErrorAlert from "../UI/ErrorAlert";
import { useApiRequest } from "../../hooks/use-api-request";

const AuthContainer: React.FC = () => {

    const inputValue = useRef<HTMLInputElement>(null);
    const passwordValue = useRef<HTMLInputElement>(null);

    const userCtx = useContext(UserContext);
    const {isLoading, error, sendRequest} = usePublicApiRequest();
    const {isLoading: isLoading2, error: error2, sendRequest: sendPrivateRequest} = useApiRequest();

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isErrorAlertVisible, setIsErrorAlertVisible] = useState(false);

    const getResponse = async () => {
        const response = await sendRequest<TokenResponse>({method: "POST", url: TOKEN_URL, body:{username: inputValue.current!.value, password: passwordValue.current!.value}});
        return response;
    }

    const handleResponse = async (response: TokenResponse | undefined) => {
        if (response) {
            const user = await sendPrivateRequest<User>({method: "GET", url: USER_URL, body: undefined, authoritzation: response.access});
            if (user) {
                userCtx.login(user, response);
            }
        } else if (error) {
            setErrorMessage(error.message);
        }
    }

    const showErrorMessageHandler = (message: string) => {
        setErrorMessage(message);            
        setIsErrorAlertVisible(true);
    }

    const formSubmitHandler = async (event: FormEvent) => {
        event.preventDefault();
        if (inputValue.current!.value === '' || passwordValue.current!.value === '') {
            showErrorMessageHandler("Wypełnij wszystkie pola!");
        }
        else { 
            const response = await getResponse();
            handleResponse(response);
        }
    }

    useEffect(() => {
        setErrorMessage(null);
        if (error && error.code === 401) {
            showErrorMessageHandler("Invalid credentials");
        } else if (error){
            showErrorMessageHandler(error.message);
        }
    }, [error])

    const hideAlertHandler = () => {
        setIsErrorAlertVisible(false);
    }

    return <div className="auth">
        <LoginForm formSubmitHandler={formSubmitHandler} inputValue={inputValue} passwordValue={passwordValue} error=""/>
        {(isErrorAlertVisible && errorMessage) && <ErrorAlert errorMessage={errorMessage} onButtonClick={hideAlertHandler} buttonText={"OK"}/>}
    </div>
};

export default AuthContainer;