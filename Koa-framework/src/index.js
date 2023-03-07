import { koaBody } from 'koa-body'
import koa from 'koa'
import { config } from "./config/index.js";
import { productsRouter} from "./routers/index.js";
import { MongoDBService } from "./services/index.js";
import { schema } from "./graphql/index.js";

import { graphqlHTTP } from "express-graphql";

const app = new koa()
app.use(koaBody())


// app.use(express.static("public"));

// app.use(
//   "/graphql",
//   graphqlHTTP({
//     graphiql: true,
//     schema,
//   })
// );
app.use(productsRouter.routes())

// app.use("/api/products", productsRouter);

const server = app.listen(config.SERVER.PORT, () => {
  console.log(`Server running on port ${server.address().port}`);
});
server.on("error", (error) => {
  console.error(`Server error: ${error}`);
});
