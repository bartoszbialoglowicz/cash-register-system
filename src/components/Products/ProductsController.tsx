import { Product, ProductCategory } from "../../utils/types";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import ProductsSearchBar from "./ProductsSearchBar";

import './ProductsController.css';
import { useContext, useEffect, useState } from "react";
import ProductsCategoryFilter from "./ProductsCategoriesFilter";
import { useApiRequest } from "../../hooks/use-api-request";
import { PRODUCTS_URL } from "../../utils/urls";
import { UserContext } from "../../store/user-context";
import ErrorCard from "../UI/ErrorCard";
import ProductsTable from "./ProductsTable";
import ProductsPriceFilter from "./ProductsPriceFilter";

type Filter = {
    minPrice: number | null,
    maxPrice: number | null,
    name: string | null,
    category: ProductCategory[],
}

const ProductsController = () => {

    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [currentCategories, setCurrentCategories] = useState<ProductCategory[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [currentFilters, setCurrentFilters] = useState<Filter>({
        minPrice: null,
        maxPrice: null,
        name: null,
        category: []
    });

    const {isLoading, error, sendRequest} = useApiRequest();
    const userCtx = useContext(UserContext);

    const onSearchBarChangeHandler = (text: string | null) => {
        setCurrentFilters(prevState => ({...prevState, name: text}));
    }

    const onMinPriceChangeHandler = (value: number | null) => {
        setCurrentFilters(prevState => ({...prevState, minPrice: value}));
    };

    const onMaxPriceChangeHandler = (value: number | null) => {
        setCurrentFilters(prevState => ({...prevState, maxPrice: value}));
    };

    const onClickCategoryHandler = (category: ProductCategory) => {
        setCurrentFilters(prevState=> {
            const index = prevState.category.findIndex(el => el === category);
            if (index === -1)
                return {...prevState, category: [...prevState.category, category]};
            else
                return {...prevState, category: prevState.category.filter(el => el !== category)}
        });
    };

    const filterProductByName = (text: string, product: Product) => {
        return product.name.toLowerCase().includes(text.toLowerCase());
    };

    const filterProductByCategory = (categories: ProductCategory[], product: Product) => {
        return categories.find(el => el === product.category);
    }

    const applyFilters = () => {
        setFilteredProducts(prevState => {
            return allProducts.filter(product => {
                return (!currentFilters.name || filterProductByName(currentFilters.name, product)) &&
                    (!currentFilters.minPrice || product.price >= currentFilters.minPrice) &&
                    (!currentFilters.maxPrice || product.price <= currentFilters.maxPrice) &&
                    ((currentFilters.category.length === 0) || filterProductByCategory(currentFilters.category, product));
            })
        });
    };

    useEffect(() => {
        applyFilters();
    }, [currentFilters])

    useEffect(() => {
        const getData = async () => {
            const data = await sendRequest<Product[]>({
                method: "GET",
                url: PRODUCTS_URL,
                authoritzation: userCtx.token.access
            });

            if (data) {
                setAllProducts(data);
                setFilteredProducts(data);
            }
        };

        getData();
    }, []);

    
    return <div className="products">
        <div className="products-filter-panel">  
            <ProductsSearchBar  onChange={onSearchBarChangeHandler}/>
            <ProductsCategoryFilter onClick={onClickCategoryHandler}/>
            <ProductsPriceFilter onMinPriceChange={onMinPriceChangeHandler} onMaxPriceChange={onMaxPriceChangeHandler}/>
        </div>
        <div className="products-items">
            { !isLoading && <ProductsTable products={filteredProducts} />}
            { isLoading && <LoadingScreen />}
            {error && <ErrorCard errorMessage={error} />}
        </div>
    </div>
};

export default ProductsController;