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
    firstName: string,
    lastName: string,
    isStaff: boolean
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

export type Manufacturer = {
    id: number;
    country: string;
    name: string;
}

export type Product = {
    id: number;
    name: string;
    category: ProductCategory;
    price: number;
    manufacturer: Manufacturer;
    image: string;
    stock_quantity: string;
    created_at: Date;
    updated_at: Date;
}

export type Discount = {
    discount_percentage: number,
    product: string,
    start_date: Date,
    end_date: Date
}


export type LabelStatus = "CONNECTED" | "DISCONNECTED";

export type AlertType = 'error' | 'warning' | 'info' | 'success';

export interface AlertMessage {
    id: number,
    message: string,
    type: AlertType
};