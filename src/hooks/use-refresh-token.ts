import { useContext } from "react";
import { REFRESH_TOKEN_URL } from "../utils/urls";
import { UserContext } from "../store/user-context";

export const useRefreshToken = () => {
    const userCtx = useContext(UserContext);
    const sendRefreshTokenRequest = async <T>()  => {
        try {
            const response = await fetch(REFRESH_TOKEN_URL, {
                body: JSON.stringify({refresh: userCtx.token.refresh})  
            });

            if (response.ok) {
                const data = await response.json();
                return data as T;
            }
        } catch (error: any) {
            throw new Error("Cannot refresh the token.");
        }
        
    };

    return sendRefreshTokenRequest;
};
