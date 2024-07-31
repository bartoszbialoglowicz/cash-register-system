import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../store/user-context";

type Props = {
    children: JSX.Element
}

const ProtectedRoute: React.FC<Props> = (props) => {

    const userCtx = useContext(UserContext);


    if (!userCtx.isAuthenticated) {
        return <Navigate to='/auth' replace />
    }
    
    return <>
        {props.children}
    </>
};

export default ProtectedRoute;