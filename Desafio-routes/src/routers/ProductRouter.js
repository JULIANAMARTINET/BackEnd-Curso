import { Router } from "express";
import { Container } from "../server/Container.js"

const productRouter = Router();
const ProductContainer = new Container();

productRouter.get("/", (req,res)=>{
  const products = ProductContainer.getAll()
  res.send({sucess: true, data: products}) 
});

productRouter.get("/:id", (req,res)=>{
  const {id} = req.params;
  const product = ProductContainer.getById(Number(id))

  if(!product){
  return res.send({ saccess: false, data: undefined, mmessage: "no se encontro el producto" });
  }
  res.send({sucess: true, data: product}) 
});

productRouter.post("/", (req,res)=>{
  
    const { title, price, thumbnail } = req.body;
    const product = ProductContainer.save({title, price, thumbnail})
    res.send({sucees:true, data: {id: product.id}})
});

productRouter.put("/:id", (req,res)=>{
  const {id} = req.params
  const { title, price, thumbnail } = req.body;

  const updateProduct = ProductContainer.updateById({id, title, price, thumbnail})
  res.send({sucees:true, data: {update: updateProduct}})
});





export  {productRouter} 