import { Product } from "../../utils/types"
import Card from "../UI/Card";

import './ProductCard.css';

type Props = {
    product: Product
};

const ProductCard: React.FC<Props> = (props) => {
    return <Card>
        <div className="product-card">
            <div className="product-card-image">
                <img src={props.product.image} alt={props.product.name} />
            </div>
            <p>{props.product.name}</p>
        </div>
    </Card>
    
};

export default ProductCard;