import Router from 'koa-router'
import { ERRORS_UTILS, JOI_VALIDATOR } from "../utils/index.js";
import { ProductDao } from "../dao/index.js";


const productsRouter = new Router({ prefix: '/api/products' })

const ProductApi = ProductDao; // new FilesystemContainer(config.FILESYSTEM_DB.products);

productsRouter.get("/", async ctx => {
  try {
    const products = await ProductApi.getAll();
    ctx.body = { success: true, data: products }
  } catch (error) {
    console.log(error, `error from getProducts`);
    ctx.body = { success: false }
  }
});

productsRouter.get("/:id", async ctx => {
  try {
    const { id } = ctx.params

    const product = await ProductApi.getById(id);

    if (!product) res.send({ error: ERRORS_UTILS.MESSAGES.NO_PRODUCT });

    ctx.body = { success: true, data: product }
  } catch (error) {
    console.log(error, `error from getProduct`);
    ctx.body = { success: false }
  }
});

productsRouter.post("/", async ctx => {
  try {
    const { nombre, descripcion, codigo, foto, precio, stock } = ctx.request.body

    // con el validador que creamos en el archivo joi validator, podemos invocar al método validateAsync y pasarle las propiedades que creemos seran nuestro producto, y si están bien, nos devolvera el objeto que guardamos en product
    // si no, saltará al catch
    const product = await JOI_VALIDATOR.product.validateAsync({
      nombre,
      descripcion,
      codigo,
      foto,
      precio,
      stock,
    });

    const productSaved = await ProductApi.save(product);
    ctx.body = { success: true, data: productSaved }
 
  } catch (error) {
    console.log(error, `error from saveProduct`);
    ctx.body = { success: false }
  }
});

productsRouter.put("/:id", async ctx => {
  try {
    const { id } = ctx.params
    const { nombre, descripcion, codigo, foto, precio, stock } = ctx.request.body

    // con el validador que creamos en el archivo joi validator, podemos invocar al método validateAsync y pasarle las propiedades que creemos seran nuestro producto, y si están bien, nos devolvera el objeto que guardamos en product
    // si no, saltará al catch
    const product = await JOI_VALIDATOR.product.validateAsync({
      nombre,
      descripcion,
      codigo,
      foto,
      precio,
      stock,
    });

    const productSaved = await ProductApi.updateById(id, product);

    ctx.body = { success: true, data: productSaved }
  } catch (error) {
    console.log(error, `error from updateProduct`);
    ctx.body = { success: false }
  }
});

productsRouter.delete("/:id", async ctx => {
  try {
    const { id } = ctx.params
    const response = await ProductApi.deleteById(id);
    ctx.body = { success: true, data: response}
  } catch (error) {
    console.log(error, `error from deleteProduct`);
    ctx.body = { success: false, data: undefined, message: ERRORS_UTILS.MESSAGES.NO_PRODUCT }
  }
});

export { productsRouter };
