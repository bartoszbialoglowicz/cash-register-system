import { useState } from "react";
import MainController from "../Main/MainController";
import MenuController from "../Menu/MenuController";

import './AppLayout.css';
import { MenuItem } from "../../utils/types";
import { AppConfig } from "../../utils/config";

const AppLayout = () => {

    const [currentContent, setCurrentContent] = useState<MenuItem>(AppConfig.DEFAULT_MAIN_CONTENT);

    const setCurrentContentHandler = (item: MenuItem) => {
        setCurrentContent(item);
    };

    const contentToRender = currentContent.elementToRender;

    return <div className="layout">
        <MenuController setContentHandler={setCurrentContentHandler}/>
        <MainController content={contentToRender}/>
    </div>
};

export default AppLayout;