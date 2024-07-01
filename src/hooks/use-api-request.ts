import { useContext, useState } from "react"
import { RequestConfig } from "../utils/types";

import { AppConfig } from "../utils/config";
import { useRefreshToken } from "./use-refresh-token";
import { UserContext } from "../store/user-context";

export const useApiRequest = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const refresh = useRefreshToken();
    const userCtx = useContext(UserContext);

    const sendRequest = async <T>(requestConfig: RequestConfig) => {
        setIsLoading(true);
        setError(null);
        try {
            const url = `http://${AppConfig.SERVER_URL}/${requestConfig.url}`;
            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': requestConfig.authoritzation ? `Bearer ${requestConfig.authoritzation}` : ''
            }

            const body = requestConfig.body ? JSON.stringify(requestConfig.body) : null;
            const response = await fetch(url, {method: requestConfig.method, headers: headers, body: body});

            if (response.status === 401) {
                try {
                    const token = await refresh<{access: string}>();
                    if (token?.access) {
                        userCtx.assignNewToken(token?.access);
                        headers['Authorization'] = `Bearer ${token.access}`;
                        const newResponse = await fetch(url, {method: requestConfig.method, headers: headers, body: body});
                        if (newResponse.ok) {
                            return newResponse.json() as T;
                        }
                        else {
                            setError(`Request failed with status ${newResponse.status} ${newResponse.statusText}`)
                        }
                    }
                    else
                        setError("Unable to get the new token!");
                } catch (error: any) {
                    setError(error.message);
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