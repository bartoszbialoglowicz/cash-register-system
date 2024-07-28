import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();

    return <div className="error-page">
        <h1>Błąd</h1>
    </div>
};

export default ErrorPage;