import { useState } from "react";
import MainController from "../Main/MainController";
import MenuController from "../Menu/MenuController";
import SummaryPanelController from "../SummaryPanel/SummaryPanelController";

import './AppLayout.css';
import ProductsController from "../Products/ProductsController";

const AppLayout = () => {

    const [currentContent, setCurrentContent] = useState<JSX.Element>(<ProductsController />);

    const setCurrentContentHandler = (element: JSX.Element) => {
        setCurrentContent(element);
    };

    return <div className="layout">
        <MenuController setContentHandler={setCurrentContentHandler}/>
        <MainController content={currentContent}/>
        <SummaryPanelController />
    </div>
};

export default AppLayout;