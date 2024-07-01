import Modal from "./Modal";

import './ErrorAlert.css';

const ErrorAlert: React.FC<{errorMessage: string, onButtonClick: () => void, buttonText: string}> = (props) => {
    return <Modal onClickEnabled={false}>
        <div className="error-alert">
            <div>
                {props.errorMessage}
            </div>
            <div>
                <button onClick={props.onButtonClick} autoFocus>{props.buttonText}</button>
            </div>
        </div>
    </Modal>
};

export default ErrorAlert;