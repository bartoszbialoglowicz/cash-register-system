import { useEffect, useState } from "react";
import MainController from "../Main/MainController";
import MenuController from "../Menu/MenuController";
import SummaryPanelController from "../SummaryPanel/SummaryPanelController";

import './AppLayout.css';
import ProductsController from "../Products/ProductsController";
import { MenuItem } from "../../utils/types";
import AdminWindow from "../AdminWindow/AdminWindows";
import { AppConfig } from "../../utils/config";

const AppLayout = () => {

    const [currentContent, setCurrentContent] = useState<MenuItem>(AppConfig.DEFAULT_MAIN_CONTENT);
    const [adminAuthenticated, setAdminAuthenticated] = useState(false);


    const authenticationHandler = (password: string) => {
        setAdminAuthenticated(AppConfig.authenticateAdmin(password));
    };

    const setCurrentContentHandler = (item: MenuItem) => {
        setCurrentContent(item);
    };

    const contentToRender = (!adminAuthenticated && currentContent.requireAdmin) ? <AdminWindow authenticationHandler={authenticationHandler}/> : currentContent.elementToRender;

    return <div className="layout">
        <MenuController setContentHandler={setCurrentContentHandler}/>
        <MainController content={contentToRender}/>
        <SummaryPanelController />
    </div>
};

export default AppLayout;