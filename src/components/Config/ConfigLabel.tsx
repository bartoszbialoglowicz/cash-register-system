import ConfigLabelStatus from "./ConfigLabelStatus";

type Props = {
    labelText: string,
    inputText: string,
    status?: "CONNECTED" | "DISCONNECTED"
}

const ConfigLabel: React.FC<Props> = (props) => {
    return <div className="config-label">
        <p>{props.labelText}</p>
        <div className="config-label-input">
            <input type="text" value={props.inputText} disabled />
        </div>
        {props.status && <ConfigLabelStatus status={props.status}/>}
    </div>
};

export default ConfigLabel;