import { MenuItem } from "../../utils/types";

import products from '../../assets/svg/shopping-cart.svg';
import settings from '../../assets/svg/settings.svg';
import sales from '../../assets/svg/percentage.svg';

import './MenuList.css';
import ProductsController from "../Products/ProductsController";

type Props = {
    setContentHandler: (element: JSX.Element) => void
}

const MenuList: React.FC<Props> = (props) => {

    const DUMMY_MENU_ITEMS: MenuItem[] = [
        {
            id: 0,
            text: "PRODUKTY",
            elementToRender: <ProductsController />,
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
            id: 2,
            text: "KONFIGURACJA",
            icon: settings,
            elementToRender: <p></p>,
            requireAdmin: true
        },
    ];

    // Change the item rendered in Main component
    const setItemContentHandler = (item: MenuItem) => {
        props.setContentHandler(item.elementToRender);
    }

    const getItem = (item: MenuItem) => {
        return <div className="menu-list-item" onClick={() => setItemContentHandler(item)} key={item.id}>
            <div className="menu-list-item-icon">
                <img src={item.icon} alt={item.text} />
            </div>
            <div className="menu-list-item-text">
                {item.text}
            </div>
        </div>
    }

    const elements = DUMMY_MENU_ITEMS.map(el => getItem(el));

    return <div className="menu-list">
        {elements}
    </div>
};

export default MenuList;