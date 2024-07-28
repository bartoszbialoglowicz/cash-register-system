import { Discount } from "../../utils/types"
import Card from "../UI/Card";

import './DiscountCard.css';

type Props = {
    discount: Discount
}

const SaleCard: React.FC<Props> = (props) => {
    return <Card>
        <div className="discount-card">
            <p>{props.discount.product}</p>
        </div>
    </Card>
};

export default SaleCard;