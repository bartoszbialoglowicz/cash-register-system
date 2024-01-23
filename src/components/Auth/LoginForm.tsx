import { FormEvent, LegacyRef } from "react";

import './LoginForm.css';

type Props = {
    formSubmitHandler: (event: FormEvent) => void,
    inputValue: LegacyRef<HTMLInputElement>,
    passwordValue: LegacyRef<HTMLInputElement>,
    error: string,
}

const LoginForm: React.FC<Props> = (props) => {
    return <div className="login-form">
        <h1>SIGN IN</h1>
        <form onSubmit={props.formSubmitHandler}>
            <div className="login-form-label"><label>Username</label><input type="text" ref={props.inputValue}/></div>
            <div className="login-form-label"><label>Password</label><input type="password" ref={props.passwordValue}/></div>
            {props.error && <div className="login-form-error"><p>{props.error}</p></div>}
            <div className="login-form-label"><label></label><input type="submit" value="SIGN IN"/></div>
        </form>
    </div>
};

export default LoginForm;