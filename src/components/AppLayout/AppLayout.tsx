import { useContext, useEffect, useState } from "react";
import MainController from "../Main/MainController";
import MenuController from "../Menu/MenuController";
import SummaryPanelController from "../SummaryPanel/SummaryPanelController";

import './AppLayout.css';
import { MenuItem } from "../../utils/types";
import AdminWindow from "../AdminWindow/AdminWindows";
import { AppConfig } from "../../utils/config";
import { useApiRequest } from "../../hooks/use-api-request";
import { REFRESH_TOKEN_URL, TOKEN_URL, USER_URL } from "../../utils/urls";
import { UserContext } from "../../store/user-context";

const AppLayout = () => {

    const [currentContent, setCurrentContent] = useState<MenuItem>(AppConfig.DEFAULT_MAIN_CONTENT);
    const [adminAuthenticated, setAdminAuthenticated] = useState(false);

    const {isLoading, error, sendRequest} = useApiRequest();
    const userCtx = useContext(UserContext);

    const authenticationHandler = (password: string) => {
        setAdminAuthenticated(false);
    };

    const setCurrentContentHandler = (item: MenuItem) => {
        setCurrentContent(item);
    };

    useEffect(() => {
        const checkToken = async () => {
            const response = await sendRequest({
                method: "POST",
                url: REFRESH_TOKEN_URL,
                body: {
                    refresh: userCtx.token.refresh
                }
            });
        };

        checkToken();
    }, []);

    const contentToRender = (!adminAuthenticated && currentContent.requireAdmin) ? <AdminWindow authenticationHandler={authenticationHandler}/> : currentContent.elementToRender;

    return <div className="layout">
        <MenuController setContentHandler={setCurrentContentHandler}/>
        <MainController content={contentToRender}/>
    </div>
};

export default AppLayout;