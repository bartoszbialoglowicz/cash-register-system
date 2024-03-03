import { useState } from 'react';
import './Card.css';

type Props = {
    children: JSX.Element;
}

const Card: React.FC<Props> = (props) => {

    const [isClicked, setIsClicked] = useState(false);

    const onClickHandler = () => {
        setIsClicked(prevState => !prevState);
    }

    const classes = isClicked ? 'card card-clicked' : 'card';

    return <div className={classes} onMouseDown={onClickHandler} onMouseUp={onClickHandler}>
        {props.children}
    </div>
};

export default Card;