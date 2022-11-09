
import { Container } from "../containers/Container.js";
import { ContainerFs } from "../Containers/ContainerFs.js";

const DB_TYPE = "filesystem";

const PRODUCTS_FILENAME = "productos";
const MESSAGES_FILENAME = "messages";

const ProductApi =
  DB_TYPE === "filesystem"
    ? new ContainerFs(PRODUCTS_FILENAME)
    : new Container();

const MessagesApi =
  DB_TYPE === "filesystem"
    ? new ContainerFs(MESSAGES_FILENAME)
    : new Container();

export {ProductApi, MessagesApi};