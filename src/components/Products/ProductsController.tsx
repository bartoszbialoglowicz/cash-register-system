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

const ProductsController = () => {

    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [currentCategories, setCurrentCategories] = useState<ProductCategory[]>([]);
    const [currentCategoryProducts, setCurrentCategoryProducts] = useState<Product[]>([]);
    const [currentProducts, setCurrentProducts] = useState<Product[]>([]);

    const {isLoading, error, sendRequest} = useApiRequest();
    const userCtx = useContext(UserContext);

    const onSearchBarChangeHandler = (text: string) => {
        filterProductsByName(text);
    }

    const onMinPriceChangeHandler = (value: number) => {

    };

    const onMaxPriceChangeHandler = (value: number) => {
        if (value !== 0) {
            setCurrentProducts(prevState => {
                return currentCategoryProducts.filter(product => {
                    return product.price < value;
                })
            })
        }
    };

    const onClickCategoryHandler = (category: ProductCategory) => {
        setCurrentCategories(prevCategories => {
            const index = prevCategories.findIndex(el => el === category);
            if (index === -1)
                return [...prevCategories, category];
            else
                return prevCategories.filter((el) => el !== category);
        });
    };

    const filterProductsByName = (text: string) => {
        setCurrentProducts(prevState => {
                return currentCategoryProducts.filter(product => {
                    return product.name.toLowerCase().includes(text.toLowerCase());
            })
        });
    };

    const filterProductsByCategory = (categories: ProductCategory[]) => {
        const products = categories.length === 0 ? allProducts :
            allProducts.filter(product => {
                return categories.find(category => category === product.category);
            });

        setCurrentCategoryProducts(products);
        setCurrentProducts(products);
    }

    useEffect(() => {
        filterProductsByCategory(currentCategories);
    }, [currentCategories])

    useEffect(() => {
        const getData = async () => {
            const data = await sendRequest<Product[]>({
                method: "GET",
                url: PRODUCTS_URL,
                authoritzation: userCtx.token.access
            });

            if (data) {
                setAllProducts(data);
                setCurrentCategoryProducts(data);
                setCurrentProducts(data);
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
            { !isLoading && <ProductsTable products={currentProducts} />}
            { isLoading && <LoadingScreen />}
            {error && <ErrorCard errorMessage={error} />}
        </div>
    </div>
};

export default ProductsController;