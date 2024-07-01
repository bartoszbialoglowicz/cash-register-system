import { useEffect, useState } from "react";
import { Product } from "../../utils/types";

import './ProductsTable.css';

type Column = {
    name: string,
    selected: boolean,
    asc: boolean,
    key: string
};

const initialColumnState: Column[] = [
    {name: 'Lp.', selected: false, asc: false, key: ''},
    {name: 'Nazwa', selected: false, asc: false, key: 'name'},
    {name: 'Kategoria', selected: false, asc: false, key: 'category'},
    {name: 'Cena', selected: false, asc: false, key: 'price'},
    {name: 'Producent', selected: false, asc: false, key: 'manufacturer'},
    {name: 'Stan magazynowy', selected: false, asc: false, key: 'stock_quantity'},
    {name: 'Utworzono', selected: false, asc: false, key: 'created_at'},
    {name: 'Zmodyfikowano', selected: false, asc: false, key: 'updated_at'}
]

const ProductsTable: React.FC<{products: Product[]}> = (props) => {

    const [currentColumns, setCurrentColumns] = useState(initialColumnState);
    const [prevIndex, setPrevIndex] = useState(initialColumnState.findIndex(el => el.selected === true));

    const thOnClickHandler = (index: number) => {
        const newColumns = currentColumns.map((column, idx) => {
            if (idx === index) {
                return {
                    ...column,
                    selected: true,
                    asc: column.selected ? !column.asc : column.asc,
                };
            } else if (column.selected) {
                return {
                    ...column,
                    selected: false,
                };
            }
            return column;
        });
        setCurrentColumns(newColumns);
        setPrevIndex(index);
    };

    const columnNames = currentColumns.map((el, index) => {
        return <th key={index} onClick={() => {thOnClickHandler(index)}}>{el.selected && <div className={`filter-order ${el.asc ? 'asc' : 'dsc'}`}>V</div>}<span>{el.name}</span></th>
    })

    const sortRows = (products: Product[]) => {
        const selectedColumn = currentColumns.find(column => column.selected);
        if (!selectedColumn)
            return products;

        const sortedProducts = [...products].sort((a, b) => {
            let aVal = a[selectedColumn.key.toLowerCase() as keyof Product];
            let bVal = b[selectedColumn.key.toLowerCase() as keyof Product];
            if (aVal < bVal)
                return selectedColumn.asc ? -1 : 1;
            if (aVal > bVal)
                return selectedColumn.asc ? 1 : -1;
            return 0;
        });
        return sortedProducts;
    }

    const sortedProducts = sortRows(props.products);
    const rows = sortedProducts.map((product) => {
        return <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.category}</td>
            <td>{product.price}</td>
            <td>{product.manufacturer.name}</td>
            <td>{product.stock_quantity}</td>
            <td>{product.created_at}</td>
            <td>{product.updated_at}</td>
        </tr>
    });

    return <table className="products-table">
            <thead className="thead-dark">
                <tr>
                    {columnNames}
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
};

export default ProductsTable;