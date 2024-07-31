import { useContext, useState } from "react"
import { RequestConfig } from "../utils/types";

import { AppConfig } from "../utils/config";
import { UserContext } from "../store/user-context";
import TokenService from "../services/TokenService";

export const useApiRequest = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const userCtx = useContext(UserContext);

    const sendRequest = async <T>(requestConfig: RequestConfig, newToken?: string, isBlocked?: boolean):Promise<T | null | undefined> => {
        setIsLoading(true);
        setError(null);
        try {
            const url = `http://${AppConfig.SERVER_URL}/${requestConfig.url}`;
            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': newToken? `Bearer ${newToken}` : `Bearer ${userCtx.token.access}`
            }

            const body = requestConfig.body ? JSON.stringify(requestConfig.body) : null;
            const response = await fetch(url, {method: requestConfig.method, headers: headers, body: body});

            if (response.status === 401 && !isBlocked) {
                try {
                    const newAccess = await TokenService.refreshToken(userCtx.token.refresh);
                    if (newAccess) {
                        userCtx.assignNewToken(newAccess.access);
                        return await sendRequest(requestConfig, newAccess.access, true);
                    }
                } catch (error: any) {
                    userCtx.logout();
                    setError(error);
                }
            }
            if (!response.ok) {
                setError(`Request failed with status ${response.status} ${response.statusText}`)
            }
            else
                return response.json() as T;
        }
        catch (error: any) {
            setError(error.message);
            return null;
        }
        finally {
            setIsLoading(false);
        }
    };

    return {isLoading, error, sendRequest}
}