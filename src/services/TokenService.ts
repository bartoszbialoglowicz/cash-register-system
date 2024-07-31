import { AppConfig } from "../utils/config";
import { REFRESH_TOKEN_URL } from "../utils/urls";

type accessToken = {access: string}

class TokenService {
    private static instance: TokenService;
    private refreshInProgress: Promise<accessToken|null> | null = null;

    private constructor() {};

    public static getInstance(): TokenService {
        if (!TokenService.instance) {
            TokenService.instance = new TokenService();
        }
        return TokenService.instance;
    }

    public async refreshToken(refresh: string): Promise<accessToken|null> {
        if (this.refreshInProgress) {
            return this.refreshInProgress;
        }

        this.refreshInProgress = new Promise(async (resolve, reject) => {
            try {
                const url = `http://${AppConfig.SERVER_URL}/${REFRESH_TOKEN_URL}`;
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({refresh: refresh}),
                });
                if (!response.ok) {
                    throw new Error('Nie udało się odświeżyć tokenu');
                } 

                const data = await response.json();
                this.refreshInProgress = null;
                resolve(data);
            } catch (error: any) {
                this.refreshInProgress = null;
                reject(error);
            }
        })

        return this.refreshInProgress;
    }
}

export default TokenService.getInstance();