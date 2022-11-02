import { ContainerFs } from "../containers/index.js";
import { config } from "../config/index.js";

const ProductDao = new ContainerFs(config.DATABASES.filesystem.PRODUCTS_FILENAME)
const CartDao = new ContainerFs(config.DATABASES.filesystem.CARTS_FILENAME)

export {ProductDao, CartDao}
