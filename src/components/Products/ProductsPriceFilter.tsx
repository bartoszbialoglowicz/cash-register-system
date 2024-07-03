import { useRef, useState } from 'react';
import './ProductsPriceFilter.css';

type Props = {
    onMinPriceChange: (value: number | null) => void,
    onMaxPriceChange: (value: number | null) => void
};

const ProductsPriceFilter: React.FC<Props> = (props) => {
    
    const minPriceInputRef = useRef<HTMLInputElement>(null);
    const maxPriceInputRef = useRef<HTMLInputElement>(null);

    const [inputInvalidClass, setInputInvalidClass] = useState('');
    const invalidClassName = 'invalid';

    const minPriceOnChangeHandler = () => {
        // Get value from input every time it changes
        setInputInvalidClass('');
        const currentValue: number = Number(minPriceInputRef.current!.value);
        if ((currentValue > Number(maxPriceInputRef.current!.value)) && Number(maxPriceInputRef.current!.value) !== 0) {
            // Update css class and clear filters if invalid criterias
            setInputInvalidClass(invalidClassName);
            props.onMaxPriceChange(null);
            props.onMinPriceChange(null);
            return;
        }
        props.onMinPriceChange(currentValue);
    }

    const maxPriceOnChangeHandler = () => {
        // Get value from input every time it changes
        setInputInvalidClass('');
        const currentValue: number = Number(maxPriceInputRef.current!.value);
        if (currentValue < Number(minPriceInputRef.current!.value) && Number(currentValue) !== 0) {
            // Update css class and clear filters if invalid criterias
            setInputInvalidClass(invalidClassName);
            props.onMaxPriceChange(null);
            props.onMinPriceChange(null);
            return;
        }
        props.onMaxPriceChange(currentValue);
    }
    
    return <div className="products-price-filter-container">
        <p>Cena</p>
        <div className="products-price-filter-inputs">
            <div className="products-price-filter-input-container">
                <input type="number" inputMode="numeric" placeholder="Od" ref={minPriceInputRef} onChange={minPriceOnChangeHandler} className={inputInvalidClass}/>
                <span></span>
                <span>zł</span>
            </div>
            <div className="products-price-filter-input-container">
                <input type="number" inputMode="numeric" placeholder="Do" ref={maxPriceInputRef} onChange={maxPriceOnChangeHandler} className={inputInvalidClass}/>
                <span></span>
                <span>zł</span>
            </div>
        </div>
    </div>
}

export default ProductsPriceFilter;