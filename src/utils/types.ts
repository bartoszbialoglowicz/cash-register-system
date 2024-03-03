import { PRODUCTS_CATEGORY } from "./business"

export type ProductCategory = typeof PRODUCTS_CATEGORY[number];

export type ServerAuthResponse = {
    code: number,
    message: string,
    user?: User
}

export type User = {
    id: number,
    username: string,
    isAdmin: boolean
}

export type AuthState = {
    isAuthenticated: boolean,
    user: User,
    login: (user: User) => void,
    logout: () => void
}

export type MenuItem = {
    id: number,
    text: string,
    icon: string,
    elementToRender: JSX.Element,
    requireAdmin: boolean
}

export type DiscountConditions = {
    minimumProductsCount?: number,
    minimumTotalOrderPrice?: number,
}

export type Sale = {
    saleId: number;
    description: string;
    productId: number;
    imgSrc: string,
    priceDiscount?: number;
    percentageDiscount?: number;
    discountConditions?: DiscountConditions,
}

export type Product = {
    id: number;
    name: string;
    category: ProductCategory;
    price: number;
    onSale: boolean;
    imgUrl: string;
}

export type LabelStatus = "CONNECTED" | "DISCONNECTED";