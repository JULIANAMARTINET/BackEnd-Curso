import { MongoContainer } from "../../Api/index.js";
import { ProductModel } from "../../models/index.js";

class ProductMongo extends MongoContainer {
  constructor() {
    super({ collection: "products", schema: ProductModel.ProductSchema });
  }
}

export { ProductMongo };
