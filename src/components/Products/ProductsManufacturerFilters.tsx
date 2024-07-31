import { useContext, useEffect, useState } from "react";
import { MANUFACTURERS_LIST_URL } from "../../utils/urls";
import { useApiRequest } from "../../hooks/use-api-request";
import { UserContext } from "../../store/user-context";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { Manufacturer } from "../../utils/types";
import DropdownList from "../UI/DropdownList";
import CheckboxItem from "../UI/CheckboxItem";

type Props = {
    onClick: (text: string) => void,
}

const ProductsManufacturerFilter: React.FC<Props> = (props) => {
    
    const {isLoading, error, sendRequest} = useApiRequest();
    const userCtx = useContext(UserContext);

    const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);

    useEffect(() => {
        const getData = async () => {
            const data = await sendRequest<Manufacturer[]>({
                url: MANUFACTURERS_LIST_URL,
                method: "GET",
            });

            if (data)
                setManufacturers(data);
        }

        getData();
    }, []);

    const manufacturerElements = manufacturers.map(el => <CheckboxItem  name={el.name} onClick={props.onClick}/>)

    return <div className="products-manufacturers">
        {isLoading && <LoadingScreen />}
        {(!isLoading && !error) && <DropdownList listName="Filtruj producentów" listElements={manufacturerElements}/>}
    </div>
};

export default ProductsManufacturerFilter;