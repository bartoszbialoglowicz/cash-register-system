const ConfigLabelContainer: React.FC<{children: JSX.Element, name: string}> = (props) => {
    return <div className="config-label-container">
        <h2>{props.name}</h2>
        {props.children}
    </div>
};

export default ConfigLabelContainer;