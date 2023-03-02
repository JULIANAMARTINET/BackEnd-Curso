import { config } from "../config/index.js";
import {
  ProductMongo,
  ProductFilesystem,
  ProductMemory,
} from "./ProductDao/index.js";

const getDaosBySelectedDB = ({ selectedDB }) => {
  switch (selectedDB) {
    case "mongo": {
      const ProductDao = new ProductMongo();
      return { ProductDao};
    }
    case "filesystem": {
      const ProductDao = new ProductFilesystem();
      return { ProductDao};
    }
    case "memory": {
      const ProductDao = new ProductMemory();
      return { ProductDao };
    }
    default: {
      const ProductDao = new ProductMongo();
      return { ProductDao };
    }
  }
};

const { ProductDao } = getDaosBySelectedDB({
  selectedDB: config.SERVER.SELECTED_DATABASE,
});

export { ProductDao};
