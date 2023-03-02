import * as graphql from "graphql";

import { ProductController } from "./controller/index.js";

const { GraphQLObjectType, GraphQLSchema } = graphql;

const QueryType = new GraphQLObjectType({
  name: "QueryType",
  description: "Queries",
  fields: {
    ...ProductController.queries,
  },
});

const MutationType = new GraphQLObjectType({
  name: "MutationType",
  description: "Mutations",
  fields: {
    ...ProductController.mutations,
  },
});

const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});

export { schema };