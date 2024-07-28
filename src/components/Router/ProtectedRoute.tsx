import { Navigate } from "react-router-dom";

type Props = {
    children: JSX.Element,
    isAuthenticated: boolean
}

const ProtectedRoute: React.FC<Props> = (props) => {
    if (props.isAuthenticated) {
        console.log('ad');
        return <Navigate to='auth' replace />
    }
    
    return <>
        {props.children}
    </>
};

export default ProtectedRoute;