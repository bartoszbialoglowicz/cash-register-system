import { useContext, useEffect, useState } from "react";
import { PRODUCTS_CATEGORY } from "../../utils/business";
import { ProductCategory } from "../../utils/types";
import ChechboxItem from "../UI/CheckboxItem";

import './ProductsCategories.css';
import { useApiRequest } from "../../hooks/use-api-request";
import { CATEGORY_URL } from "../../utils/urls";
import { UserContext } from "../../store/user-context";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import ErrorCard from "../UI/ErrorCard";
import DropdownList from "../UI/DropdownList";
import { AlertContext } from "../../store/alert-context";

type Props = {
    onClick: (category: string) => void,
}

type CategoryResponse = {
    name: ProductCategory,
    id: number
}

const ProductsCategoryFilter: React.FC<Props> = (props) => {

    const {isLoading, error, sendRequest} = useApiRequest();
    const userCtx = useContext(UserContext);
    const alertCtx = useContext(AlertContext);
    const [categories, setCategories] = useState<CategoryResponse[]>([]);

    useEffect(()=> {
        const setData = async () => {
            const data = await sendRequest<CategoryResponse[]>({
                url: CATEGORY_URL,
                method: 'GET'
            });

            if (data)
                setCategories(data);
        }

        setData();

    }, []);

    useEffect(() => {
        if (error) {
            alertCtx?.addAlert('Nie udało się pobrać listy kategorii', 'error');
        }
    }, [error]);

    const categoriesItems = categories
    .map(el => {
        return <ChechboxItem name={el.name} key={el.id} onClick={props.onClick}/>
    })

    return <div className="products-categories">
        {!isLoading && <DropdownList listElements={categoriesItems} listName="Filtruj po kategoriach" />}
        {isLoading && <LoadingScreen />}
        {error && <ErrorCard errorMessage={error} />}
    </div>
};

export default ProductsCategoryFilter;