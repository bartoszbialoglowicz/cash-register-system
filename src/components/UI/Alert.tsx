import React from 'react';
import './Alert.css';
import { AlertMessage } from '../../utils/types';

type AlertProps = {
    alert: AlertMessage,
    onClose: (id: string) => void
}

const Alert: React.FC<AlertProps> = (props) => {
    React.useEffect(() => {
      const timer = setTimeout(() => {
        props.onClose(props.alert.id);
      }, 5000); // Alert znika po 5 sekundach
  
      return () => clearTimeout(timer);
    }, [props.alert, props.onClose]);
  
    return (
      <div className={`alert alert-${props.alert.type}`}>
        <div className='alert-description'>{props.alert.message}</div>
        <div onClick={() => props.onClose(props.alert.id)} className='alert-close'>Zamknij</div>
      </div>
    );
  };

export default Alert;