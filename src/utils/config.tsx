import ProductsController from "../components/Products/ProductsController";
import { MenuItem } from "./types";

export class AppConfig {
    // Admin password for testing the app
    // Credentials will be stored on the server side
    private static readonly DUMMY_ADMIN_PASSWORD = 'test';

    public static readonly DEFAULT_MAIN_CONTENT: MenuItem = {
        id: 0,
        text: "PRODUKTY",
        elementToRender: <ProductsController />,
        icon: '',
        requireAdmin: false,
    }

    public static authenticateAdmin = (password: string) => {
        return password === this.DUMMY_ADMIN_PASSWORD;
    }
}