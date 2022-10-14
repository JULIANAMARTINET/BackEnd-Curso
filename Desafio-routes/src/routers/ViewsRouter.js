import { Router } from "express";
import { ProductApi } from "../Api/ProductApi.js"

const viewsRouter = Router();

viewsRouter.get("/", (req, res) => {
    res.render("form-products");
});

viewsRouter.post("/productos", (req, res) => {

    const { title, price, thumbnail } = req.body;
    ProductApi.save({title, price, thumbnail})

    res.redirect("/");
});

viewsRouter.get("/productos", (req, res)=>{
    const products = ProductApi.getAll();
    res.render("table-products", {productos: products})
})

export { viewsRouter }

