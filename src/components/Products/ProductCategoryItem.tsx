import { ProductCategory } from '../../utils/types';
import './ProductCategoryItem.css';

type Props = {
    name: ProductCategory;
    onClick: (category: ProductCategory) => void
}

const ProductCategoryItem: React.FC<Props> = (props) => {
    return <div className="product-cateogory-item" onClick={() => props.onClick(props.name)}>
        {props.name}
    </div>
};

export default ProductCategoryItem;