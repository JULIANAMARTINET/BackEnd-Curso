import { FilesystemContainer } from "../../Api/index.js";
import { config } from "../../config/index.js";

class ProductFilesystem extends FilesystemContainer {
  constructor() {
    super(config.FILESYSTEM_DB.products);
  }
}

export { ProductFilesystem };
