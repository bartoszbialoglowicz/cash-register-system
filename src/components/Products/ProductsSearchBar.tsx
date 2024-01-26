import { useRef } from 'react';
import './ProductsSearchBar.css';

type Props = {
    onChange: (text: string) => void
}

const ProductsSearchBar: React.FC<Props> = (props) => {

    
const inputRef = useRef<HTMLInputElement>(null);

    return <div className="products-search-bar">
        <input type="text" placeholder="Nazwa produktu..." ref={inputRef} onChange={() => props.onChange(inputRef.current!.value)}/>
    </div>
};

export default ProductsSearchBar;