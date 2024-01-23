import { useContext } from "react";
import { UserContext } from "../../store/user-context";

const MenuUserPanel = () => {

    const username = useContext(UserContext).user.username;

    return <div className="menu-user-panel">
        <p>{`Zalogowany jako: ${username}`}</p>
    </div>
};

export default MenuUserPanel;