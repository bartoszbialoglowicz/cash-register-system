import ProductsController from "../components/Products/ProductsController";
import { MenuItem } from "./types";

export class AppConfig {
    public static readonly DEFAULT_MAIN_CONTENT: MenuItem = {
        id: 0,
        text: "PRODUKTY",
        elementToRender: <ProductsController />,
        icon: '',
        requireAdmin: false,
    }

    public static SERVER_URL = '127.0.0.1:8000';
}