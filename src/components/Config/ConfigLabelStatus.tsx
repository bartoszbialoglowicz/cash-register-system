import { LabelStatus } from "../../utils/types";

type Props = {
    status: LabelStatus
}

const ConfigLabelStatus: React.FC<Props> = (props) => {

    const cssClass = props.status === "CONNECTED" ? 'status-green' : 'status-red';

    return <div className="config-label-status">
        <div className={cssClass} />
    </div>
};

export default ConfigLabelStatus;