import express from "express";
// import handlebars from "express-handlebars";
import __dirname from "./dirname.js";
import { productRouter } from "./routers/ProductRouter.js";
import { viewsRouter } from "./routers/ViewsRouter.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.engine("hbs", handlebars.engine({
    extname: ".hbs",
    defaultLayout: "main.hbs",
}));

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");


app.use("/", viewsRouter);
app.use("/api/productos", productRouter);


const server = app.listen( PORT, () => console.log(`Server listening on PORT ${PORT}`))


