import { useState } from 'react';
import { ProductCategory } from '../../utils/types';
import checked from '../../assets/svg/checked-tick-svgrepo-com.svg';

import './ProductCategoryItem.css';

type Props = {
    name: ProductCategory;
    onClick: (category: ProductCategory) => void
}

const ProductCategoryItem: React.FC<Props> = (props) => {

    const [isChecked, setIsChecked] = useState(false);

    const onClickHandler = () => {
        setIsChecked(prevState => !prevState);
        props.onClick(props.name);
    }

    const className = isChecked ? 'checked' : '';

    return <div className="product-cateogory-item" onClick={onClickHandler}>
        <div className={`product-category-item-checkbox ${className}`}>
            {isChecked && <img src={checked} alt='checked' />}
        </div>
        <div className='product-category-item-name'>
            <p>{props.name}</p>
        </div>
    </div>
};

export default ProductCategoryItem;