import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../store/user-context";

import './AuthContainer.css';
import LoginForm from "./LoginForm";
import { TokenResponse, User } from "../../utils/types";
import { TOKEN_URL, USER_URL } from "../../utils/urls";
import { usePublicApiRequest } from "../../hooks/use-public-api-request";
import { useApiRequest } from "../../hooks/use-api-request";
import { AlertContext } from "../../store/alert-context";
import { useNavigate } from "react-router-dom";

const AuthContainer: React.FC = () => {

    const inputValue = useRef<HTMLInputElement>(null);
    const passwordValue = useRef<HTMLInputElement>(null);

    const userCtx = useContext(UserContext);
    const alertCtx = useContext(AlertContext);
    const navigate = useNavigate();
    const {isLoading, error, sendRequest} = usePublicApiRequest();
    const {isLoading: isLoading2, error: error2, sendRequest: sendPrivateRequest} = useApiRequest();


    const getResponse = async () => {
        const response = await sendRequest<TokenResponse>({method: "POST", url: TOKEN_URL, body:{username: inputValue.current!.value, password: passwordValue.current!.value}});
        return response;
    }

    const handleResponse = async (response: TokenResponse | undefined) => {
        if (response) {
            userCtx.assignNewToken(response.access, response.refresh);
            const user = await sendPrivateRequest<User>({method: "GET", url: USER_URL}, response.access);
            if (user) {
                alertCtx?.addAlert(`Pomyślnie zalogowano ${user.username}`, 'success');
                userCtx.login(user, response);
                navigate("/app");
            }
        } else if (error) {
            alertCtx?.addAlert(error.message, 'error');
        }
    }

    const formSubmitHandler = async (event: FormEvent) => {
        event.preventDefault();
        if (inputValue.current!.value === '' || passwordValue.current!.value === '') {
            alertCtx?.addAlert('Wypełnij wszystkie pola', 'error');
        }
        else { 
            const response = await getResponse();
            handleResponse(response);
        }
    }

    useEffect(() => {
        if (error && error.code === 401) {
            alertCtx?.addAlert('Nieprawidłowe dane logowania', 'error');
        } else if (error){
            alertCtx?.addAlert(error.message, 'error');
        }
    }, [error])

    return <div className="auth">
        <LoginForm formSubmitHandler={formSubmitHandler} inputValue={inputValue} passwordValue={passwordValue} error=""/>
    </div>
};

export default AuthContainer;