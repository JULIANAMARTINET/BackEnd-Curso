import * as graphql from "graphql";

const { GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLString } = graphql;

// "exclusivo para la interfaz con graphql"

const ProductType = new GraphQLObjectType({
  name: "Product",
  description: "Product type",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    price: { type: GraphQLInt },
    thumbnail: { type: GraphQLString },
    code: { type: GraphQLString },
    stock: { type: GraphQLString },
    timestamp: { type: GraphQLString },
  }),
});

export { ProductType };