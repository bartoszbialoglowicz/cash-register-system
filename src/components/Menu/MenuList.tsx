import { MenuItem } from "../../utils/types";

import products from '../../assets/svg/shopping-cart.svg';
import settings from '../../assets/svg/settings.svg';
import sales from '../../assets/svg/percentage.svg';

const MenuList = () => {

    const DUMMY_MENU_ITEMS: MenuItem[] = [
        {
            id: 0,
            text: "PRODUKTY",
            elementToRender: <p></p>,
            icon: products,
            requireAdmin: false,
        },
        {
            id: 1,
            text: "PROMOCJE",
            icon: sales,
            elementToRender: <p></p>,
            requireAdmin: false
        },
        {
            id: 0,
            text: "KONFIGURACJA",
            icon: settings,
            elementToRender: <p></p>,
            requireAdmin: true
        },
    ];

    const getItem = (item: MenuItem) => {
        return <div className="menu-list-item">
            <div className="menu-list-item-icon">
                <img src={item.icon} alt={item.text} />
            </div>
        </div>
    }

    return <div className="menu-list">
        
    </div>
};

export default MenuList;