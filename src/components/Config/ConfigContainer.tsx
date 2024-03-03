import ConfigLabel from "./ConfigLabel";
import ConfigLabelContainer from "./ConfigLabelContainer";

const ConfigContainer = () => {
    return <div className="config">
        <h1>KONFIGURACJA</h1>
        <ConfigLabelContainer name="SIEĆ">
            <ConfigLabel labelText="Adres IP komputera" inputText="10.23.23.21" status="CONNECTED"/>
        </ConfigLabelContainer>
        <ConfigLabelContainer name="DRUKARKA FISKALNA">
            <>
            <ConfigLabel labelText="Port" inputText="COM" status="CONNECTED" />
            <ConfigLabel labelText="Adres IP drukarki" inputText="10.23.23.121" />
            </>
        </ConfigLabelContainer>
        <ConfigLabelContainer name="PŁATNOŚCI BEZGOTÓWKOWE">
            <>
                <ConfigLabel labelText="Adres IP terminala" inputText="10.23.23.31" status="CONNECTED" />
                <ConfigLabel labelText="Operator" inputText="Pekao" status="CONNECTED" />
            </>
        </ConfigLabelContainer>
    </div>
};

export default ConfigContainer;