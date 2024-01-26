import { PRODUCTS_CATEGORY } from "../../utils/business";
import { ProductCategory } from "../../utils/types";
import ProductCategoryItem from "./ProductCategoryItem";

import './ProductsCategories.css';

type Props = {
    onClick: (category: ProductCategory) => void,
}

const ProductsCategories: React.FC<Props> = (props) => {

    const categoriesItems = PRODUCTS_CATEGORY.map(el => {
        return <ProductCategoryItem name={el} key={el} onClick={props.onClick}/>
    })

    return <div className="products-categories">
        {categoriesItems}
    </div>
};

export default ProductsCategories;