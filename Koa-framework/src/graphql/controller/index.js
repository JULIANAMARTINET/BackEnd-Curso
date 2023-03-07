import * as graphql from "graphql";
import { ProductType } from "../types/Products.js";
import { ProductDao } from "../../dao/index.js";

const { GraphQLFloat, GraphQLList, GraphQLNonNull, GraphQLString, GraphQLInt } =
  graphql;

const Products = {
  type: new GraphQLList(ProductType),
  description: "return a products array object",
  resolve: async () => {

    const products = await ProductDao.getAll();
    return products;
  },
};
const Product = {
  type: ProductType,
  args: {
    id: { type: GraphQLInt },
  },
  description: "return a product object",
  resolve: async (_, { id }) => {
    const product = await ProductDao.getById(id);
    return product;
  },
};

const saveProduct = {
  type: ProductType,
  args: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    thumbnail: { type: new GraphQLNonNull(GraphQLString) },
    code: { type: new GraphQLNonNull(GraphQLString) },
    precio: { type: new GraphQLNonNull(GraphQLFloat) },
    stock: { type: new GraphQLNonNull(GraphQLString) }
  },

  resolve: async (_, product) => {
    const response = await ProductDao.save(product);
    return response;
  },
};

const ProductController = {
  mutations: {
    Product: saveProduct,
  },
  queries: {
    Product,
    Products,
  },
};

export { ProductController };
