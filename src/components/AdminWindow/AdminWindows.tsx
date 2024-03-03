import { FormEvent, useRef } from "react";

type Props = {
    authenticationHandler: (password: string) => void
}

const AdminWindow: React.FC<Props> = (props) => {

    const inputRef = useRef<HTMLInputElement>(null);

    const onSubmitHandler = (event: FormEvent) => {
        event.preventDefault();
        props.authenticationHandler(inputRef.current!.value);
    }

    return <div className="amdin-window">
        <form onSubmit={onSubmitHandler}>
            <input type="password" name="adminPassword" ref={inputRef}/>
            <input type="submit" value="LOG IN" />
        </form>
    </div>
};

export default AdminWindow;