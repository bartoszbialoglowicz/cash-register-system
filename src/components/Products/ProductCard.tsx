import { Product } from "../../utils/types"

import './ProductCard.css';

type Props = {
    product: Product
};

const ProductCard: React.FC<Props> = (props) => {
    return <div className="product-card">
        <div className="product-card-image">
            <img src={props.product.imgUrl} alt={props.product.name} />
        </div>
        <p>{props.product.name}</p>
    </div>
};

export default ProductCard;