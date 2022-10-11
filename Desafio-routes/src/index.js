import express from "express";
import {create} from "express-handlebars";

import homeRoutes from "./routes/home.js";
import productRoutes from "./routes/productos.js";

const app = express();
const PORT = process.env.PORT || 8080;

const hbs = create({
    extname: ".hbs",
    helpers: {
    }
 });


app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views","./views")

app.use(express.static('public'));
// app.use('/static', express.static('public'));

app.use("/", homeRoutes);
app.use("/productos", productRoutes);


const server = app.listen( PORT, () => console.log(`Server listening on PORT ${PORT}`))


