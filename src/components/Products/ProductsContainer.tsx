import { Product } from "../../utils/types"
import ProductCard from "./ProductCard";

import './ProductsContainer.css';

type Props = {
    products: Product[]
}

const ProductsContainer: React.FC<Props> = (props) => {
    return <div className="products-container">
        {props.products.map(el => <ProductCard product={el} key={el.id}/>)}
    </div>
};

export default ProductsContainer;