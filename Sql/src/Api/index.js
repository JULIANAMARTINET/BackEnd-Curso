import { config } from "../config/index.js";
import {Container, ContainerFs, ContainerSql} from "../Containers/index.js";
import { KnexService } from "../server/index.js";

// Aca podríamos importar todos nuestros "Containers base", y crear las instancias correspondientes. Luego las exportamos para que puedan ser usadas en otros archivos
// También nos sirve para seleccionar un tipo de instancia. Acá lo que hacemos es elegir entre Memoria y Archivo dependiend de la variable PRODUCTS_FILENAME

const ALL_DATABASES = {
  filesystem: () => ({
    ProductApi: new ContainerFs(
      config.DATABASES.filesystem.collections.PRODUCTS_FILENAME
    ),
    MessagesApi: new ContainerFs(
      config.DATABASES.filesystem.collections.MESSAGES_FILENAME
    ),
  }),
  memory: () => ({
    ProductApi: new Container(),
    MessagesApi: new Container(),
  }),
  sql: () => {
    //esto es para que se invoquen las funciones que tiene ese service, para comprobar y crear las tablas
    KnexService.init();
    return {
      ProductApi: new ContainerSql(KnexService.KnexMySQL, "productos"),
      MessagesApi: new ContainerSql(KnexService.KnexMySQL, "messages"),
    };
  },
};

export const { ProductApi, MessagesApi } =
  ALL_DATABASES[config.SELECTED_DATABASE.name]();