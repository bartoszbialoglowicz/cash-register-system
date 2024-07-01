import { useContext, useEffect, useState } from "react";
import { PRODUCTS_CATEGORY } from "../../utils/business";
import { ProductCategory } from "../../utils/types";
import ProductCategoryItem from "./ProductCategoryItem";

import './ProductsCategories.css';
import { useApiRequest } from "../../hooks/use-api-request";
import { CATEGORY_URL } from "../../utils/urls";
import { UserContext } from "../../store/user-context";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import ErrorCard from "../UI/ErrorCard";

type Props = {
    onClick: (category: ProductCategory) => void,
}

type CategoryResponse = {
    name: ProductCategory,
    id: number
}

const ProductsCategoryFilter: React.FC<Props> = (props) => {

    const {isLoading, error, sendRequest} = useApiRequest();
    const userCtx = useContext(UserContext);
    const [categories, setCategories] = useState<CategoryResponse[]>([]);

    useEffect(()=> {
        const setData = async () => {
            const data = await sendRequest<CategoryResponse[]>({
                url: CATEGORY_URL,
                authoritzation: userCtx.token.access,
                method: 'GET'
            });

            if (data)
                setCategories(data);
        }

        setData();

    }, []);

    const categoriesItems = categories
    .map(el => {
        return <ProductCategoryItem name={el.name} key={el.id} onClick={props.onClick}/>
    })

    return <div className="products-categories">
        <p>Filtruj po kategoriach</p>
        {!isLoading && categoriesItems}
        {isLoading && <LoadingScreen />}
        {error && <ErrorCard errorMessage={error} />}
    </div>
};

export default ProductsCategoryFilter;