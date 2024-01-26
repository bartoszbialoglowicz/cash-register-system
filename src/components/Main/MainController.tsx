import './MainController.css';

type Props = {
    content: JSX.Element
}

const MainController: React.FC<Props> = (props) => {
    return <div className="main">
        {props.content}
    </div>
};

export default MainController;