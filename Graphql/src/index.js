import express from "express";
import { config } from "./config/index.js";
import { productsRouter} from "./routers/index.js";
import { MongoDBService } from "./services/index.js";
import { schema } from "./graphql/index.js";

import { graphqlHTTP } from "express-graphql";

const app = express();

app.use(express.static("public"));

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", productsRouter);


// MongoDBService.init();

const server = app.listen(config.SERVER.PORT, () => {
  console.log(`Server running on port ${server.address().port}`);
});
server.on("error", (error) => {
  console.error(`Server error: ${error}`);
});
