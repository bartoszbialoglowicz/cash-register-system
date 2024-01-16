import MainController from "../Main/MainController";
import MenuController from "../Menu/MenuController";
import SummaryPanelController from "../SummaryPanel/SummaryPanelController";

import './AppLayout.css';

const AppLayout = () => {
    return <div className="layout">
        <MenuController />
        <MainController />
        <SummaryPanelController />
    </div>
};

export default AppLayout;