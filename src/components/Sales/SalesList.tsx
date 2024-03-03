import { Sale } from "../../utils/types";
import SaleCard from "./SaleCard";

import './SalesList.css';

const SalesList = () => {
    const DUMMY_SALES_LIST: Sale[] = [
        {
            saleId: 1,
            description: "Banany 20% taniej",
            productId: 1,
            imgSrc: "https://owocnegodnia.pl/wp-content/uploads/2022/09/Banan-str-1.png",
            percentageDiscount: 0.20,    
        },
        {
            saleId: 2,
            description: "Mango za 2zł",
            productId: 2,
            imgSrc: 'https://www.lokalnywarzywniak.pl/745-large_default/mango-odmiana-keitt.jpg',
            priceDiscount: 2,
        }
    ];

    const salesJSX = DUMMY_SALES_LIST.map(sale => <SaleCard sale={sale} />);

    return <div className="sales-list">
        {salesJSX}
    </div>;
};

export default SalesList;