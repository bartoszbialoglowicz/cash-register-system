import { PRODUCTS_CATEGORY } from "./business"

export type ProductCategory = typeof PRODUCTS_CATEGORY[number];

export type TokenResponse = {
    refresh: string,
    access: string
}

export type ErrorMessage = {
    message: string,
    code: number
}

export type User = {
    id: number,
    username: string,
    isAdmin: boolean
}

export type Token = {
    access: string,
    refresh: string
}

export type AuthState = {
    isAuthenticated: boolean,
    user: User,
    token: Token,
    assignNewToken: (access: string) => void,
    login: (user: User, token: Token) => void,
    logout: () => void
}

export type HTTPMethod = "GET" | "POST" | "PUT" | "PATCH";

export type RequestConfig = {
    method: HTTPMethod,
    url: string,
    authoritzation?: string,
    body?: object,
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