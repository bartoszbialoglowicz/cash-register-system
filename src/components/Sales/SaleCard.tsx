import { Sale } from "../../utils/types"
import Card from "../UI/Card";

import './SaleCard.css';

type Props = {
    sale: Sale
}

const SaleCard: React.FC<Props> = (props) => {
    return <Card>
        <div className="sale-card">
            <div className="sale-card-image">
                <img src={props.sale.imgSrc} alt={props.sale.description} />
            </div>
            <p>{props.sale.description}</p>
        </div>
    </Card>
};

export default SaleCard;