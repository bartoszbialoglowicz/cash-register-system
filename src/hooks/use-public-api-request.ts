import { useState } from "react";
import { AppConfig } from "../utils/config";
import { ErrorMessage, RequestConfig } from "../utils/types";

export const usePublicApiRequest = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<ErrorMessage | null>(null);

    const handleErrorMessage = (statusCode: number) => {
        switch (statusCode) {
            case 401:
                setError({code: statusCode, message: "Unauthenticated access!"});
                break;
            case 403:
                setError({code: statusCode, message: "You do not have rights to access this resource."});
                break;
            case 404:
                setError({code: statusCode, message: "This resource does not exist."});
                break;
            default:
                setError({code: statusCode, message: "Unknown error occured."});
                break;
        }
    }

    const sendRequest = async <T>(requestConfig: RequestConfig) => {
        setIsLoading(false);
        try {
            const URL = `http://${AppConfig.SERVER_URL}/${requestConfig.url}`;
            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
            const body = requestConfig.body ? JSON.stringify(requestConfig.body) : null;
            const response = await fetch(
                URL,
                {
                    method: requestConfig.method,
                    body: body,
                    headers: headers
                }
            );

            if (response.ok) {
                return response.json() as T;
            }
            else {
                handleErrorMessage(response.status);
            }
        } catch (error: any) {
            setError({code: 500, message: "Server Error!"});
        } finally {
            setIsLoading(false);
        }
    };

    return {isLoading, error, sendRequest};
}