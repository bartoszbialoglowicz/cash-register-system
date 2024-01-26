import { Product, ProductCategory } from "../../utils/types";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import ProductsContainer from "./ProductsContainer";
import ProductsSearchBar from "./ProductsSearchBar";

import './ProductsController.css';
import { useEffect, useState } from "react";
import ProductsCategories from "./ProductsCategories";

const ProductsController = () => {
    
    const DUMMY_PRODUCTS: Product[] = [
        {
            id: 1,
            name: 'Banan',
            category: 'OWOCE',
            price: 6,
            onSale: false,
            imgUrl: "https://owocnegodnia.pl/wp-content/uploads/2022/09/Banan-str-1.png"
        },
        {
            id: 2,
            name: 'Mango',
            category: 'OWOCE',
            price: 10,
            onSale: false,
            imgUrl: 'https://www.lokalnywarzywniak.pl/745-large_default/mango-odmiana-keitt.jpg'
        }
    ]

    const [isLoading, setIsLoading] = useState(false);
    const [allProducts, setAllProducts] = useState(DUMMY_PRODUCTS);
    const [currentCategory, setCurrentCategory] = useState<ProductCategory>('WSZYSTKO');
    const [currentCategoryProducts, setCurrentCategoryProducts] = useState(DUMMY_PRODUCTS);
    const [currentProducts, setCurrentProducts] = useState(DUMMY_PRODUCTS);

    const onSearchBarChangeHandler = (text: string) => {
        filterProductsByName(text);
    }

    const onClickCategoryHandler = (category: ProductCategory) => {
        setCurrentCategory(category);
    };

    const filterProductsByName = (text: string) => {
        setIsLoading(true);
        setCurrentProducts(prevState => {
                return currentCategoryProducts.filter(product => {
                    return product.name.toLowerCase().includes(text.toLowerCase());
                })
        });
        setIsLoading(false);
    };

    const filterProductsByCategory = (category: ProductCategory) => {
        setIsLoading(true);
        const products = category === "WSZYSTKO" ? allProducts :
            allProducts.filter(product => {
                return product.category === category;
            })

        setCurrentCategoryProducts(products)
        setCurrentProducts(products);
        setIsLoading(false);
    }

    useEffect(() => {
        filterProductsByCategory(currentCategory);
        console.log('e');
    }, [currentCategory]);

    
    return <div className="products">
        <ProductsSearchBar  onChange={onSearchBarChangeHandler}/>
        <ProductsCategories onClick={onClickCategoryHandler}/>
        { !isLoading && <ProductsContainer products={currentProducts} />}
        { isLoading && <LoadingScreen />}
    </div>
};

export default ProductsController;