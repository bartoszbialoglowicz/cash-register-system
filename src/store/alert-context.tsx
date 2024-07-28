import {createContext, useState, useCallback} from 'react';

import { AlertMessage, AlertType } from "../utils/types";
import Alert from '../components/UI/Alert';

interface AlertContextType {
    addAlert: (message: string, alertType: AlertType) => void;
}

export const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{children: JSX.Element}> = (props) => {

    const [alerts, setAlerts] = useState<AlertMessage[]>([]);

    const addAlertHandler = useCallback((message: string, alertType: AlertType) => {
        const id = alerts.length === 0 ? 1 : alerts[alerts.length - 1].id + 1;
        setAlerts(prevState => [...prevState, {message: message, type: alertType, id: id}]);
    }, []);

    const removeAlertHandler = (id: number) => {
        setAlerts(prevState => prevState.filter(alert => alert.id !== id));
    }

    const contextValue = {
        addAlert: addAlertHandler
    }

    return <AlertContext.Provider value={contextValue}>
        <div className='alert-container'>
            {alerts.map(el => <Alert alert={el} onClose={removeAlertHandler}/>)}
        </div>
        {props.children}
    </AlertContext.Provider>
};