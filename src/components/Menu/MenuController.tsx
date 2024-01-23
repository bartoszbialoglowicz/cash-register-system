import './MenuController.css';
import MenuList from './MenuList';
import MenuUserPanel from './MenuUserPanel';

const MenuController = () => {
    return <div className="menu">
        <MenuUserPanel />
        <MenuList />
    </div>
};

export default MenuController;