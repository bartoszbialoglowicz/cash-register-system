import { Discount } from "../../utils/types";
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../store/user-context'; 
import { AlertContext } from '../../store/alert-context';
import { useApiRequest } from '../../hooks/use-api-request';
import { DISCOUNTS_LIST_URL } from "../../utils/urls";
import DiscountCard from './DiscountCard';

import './DiscountList.css';

const DiscountList = () => {
    
    const [discounts, setDiscounts] = useState<Discount[]>([]);

    const userCtx = useContext(UserContext);
    const alertCtx = useContext(AlertContext);
    const {error, isLoading, sendRequest} = useApiRequest();

    useEffect(() => {
        const getData = async () => {
            const data = await sendRequest<Discount[]>({
                url: DISCOUNTS_LIST_URL,
                method: 'GET',
                authoritzation: userCtx.token.access
            });

            if (data) {
                setDiscounts(data);
            }
        };

        getData();
    }, []);

    useEffect(() => {
        if (error)
            alertCtx?.addAlert("Nie udało się pobrać listy promocji", 'error');
    }, [error])

    const discountItems = discounts.map(discount => <DiscountCard discount={discount}/>);

    return <div className="discount-list">
        {discountItems}
    </div>;
};

export default DiscountList;