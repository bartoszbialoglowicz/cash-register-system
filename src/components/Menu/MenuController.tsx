import { MenuItem } from '../../utils/types';
import './MenuController.css';
import MenuList from './MenuList';
import MenuUserPanel from './MenuUserPanel';

type Props = {
    setContentHandler: (item: MenuItem) => void
}

const MenuController: React.FC<Props> = (props) => {
    return <div className="menu">
        <MenuUserPanel />
        <MenuList setContentHandler={props.setContentHandler}/>
    </div>
};

export default MenuController;