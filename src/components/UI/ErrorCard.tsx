import './ErrorCard.css';

const ErrorCard: React.FC<{errorMessage: string}> = (props) => {
    return <div className="error-card">
        <p>{props.errorMessage}</p>
    </div>
};

export default ErrorCard;