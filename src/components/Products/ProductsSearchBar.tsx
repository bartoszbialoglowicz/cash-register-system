import { useRef } from 'react';
import './ProductsSearchBar.css';

type Props = {
    onChange: (text: string | null) => void
}

const ProductsSearchBar: React.FC<Props> = (props) => {

    
const inputRef = useRef<HTMLInputElement>(null);

    return <div className="products-search-bar">
        <label>Filtruj po nazwie</label>
        <input type="text" placeholder="Nazwa produktu..." ref={inputRef} onChange={() => props.onChange(inputRef.current!.value)}/>
    </div>
};

export default ProductsSearchBar;