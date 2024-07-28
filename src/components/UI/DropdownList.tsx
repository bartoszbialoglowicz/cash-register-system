import { useState } from "react";

import './DropdownList.css';

type Props = {
    listName: string,
    listElements: JSX.Element[],
    hideAtStart?: boolean,
}

const DropdownList: React.FC<Props> = (props) => {

    const [listHidden, setListHidden] = useState<boolean>(props.hideAtStart ? props.hideAtStart : false);

    const toggleText = listHidden ? "Pokaż" : "Ukryj";
    const listElements = props.listElements.map(element => <li>{element}</li>);
    const ANIMATION_TIME_MS = 400;
    const [animationClass, setAnimationClass] = useState<"hide-animation" | "show-animation">("show-animation");

    const toggleListDisplay = () => {
        if (listHidden) {
            setListHidden(false);
            setAnimationClass('show-animation');
        } else {
            setAnimationClass('hide-animation');
            setTimeout(() => {
                setListHidden(true);
            }, ANIMATION_TIME_MS);
        }
    }

    return <div className="dropdown-list">
        <div className="dropdown-list-header">
            <div className="dropdown-list-header-text">
                <span>{props.listName}</span>
            </div>
            <div className="dropdown-list-header-toggle" onClick={() => toggleListDisplay()}>
                <span>{toggleText}</span>
            </div>
        </div>
        {!listHidden && <div className={`dropdown-list-elements ${animationClass}`}>
            <ul>
                {listElements}
            </ul>
        </div>}
    </div>
};

export default DropdownList;
