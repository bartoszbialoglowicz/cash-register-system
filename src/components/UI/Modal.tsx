import { useState } from "react";
import ReactDOM from "react-dom";

import './Modal.css';

const BackDrop: React.FC<{onClickHandler: () => void, onClickEnabled: boolean}> = (props) => {
    const onClickHandler = () => {
        if (props.onClickEnabled) {
            props.onClickHandler();
        }
    }
    return <div className="backdrop" onClick={onClickHandler}></div>
}

const ModalOverlay: React.FC<{children: JSX.Element, applyClose: boolean}> = (props) => {
    const modalClose = props.applyClose ? 'modal-close' : '';
    return <div className={`modal ${modalClose}`}>
        <div className="modal-content">
            {!modalClose && props.children}
        </div>
    </div>
}

const overlaysElement = document.getElementById('overlays');

const Modal: React.FC<{children: JSX.Element, onClickEnabled: boolean}> = (props) => {
    const [modalClose, setModalClose] = useState(false);

    const handleModalClose = () => {
        setModalClose(true);
    }

    return <>
    {overlaysElement && ReactDOM.createPortal(<BackDrop onClickHandler={handleModalClose} onClickEnabled={props.onClickEnabled}/>, overlaysElement)}
    {overlaysElement && ReactDOM.createPortal(<ModalOverlay applyClose={modalClose}>{props.children}</ModalOverlay>, overlaysElement)}
    </>
};

export default Modal;