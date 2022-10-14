import { Router } from "express";
import { ProductApi } from "../Api/ProductApi.js"

const productRouter = Router();

productRouter.get("/", (req,res)=>{
  const products = ProductApi.getAll()
  res.send({sucess: true, data: products}) 
});

productRouter.get("/:id", (req,res)=>{
  const {id} = req.params;
  const product = ProductApi.getById(Number(id))

  if(!product){
  return res.send({ saccess: false, data: undefined, mmessage: "no se encontro el producto" });
  }
  res.send({sucess: true, data: product}) 
});

productRouter.post("/", (req,res)=>{
  
    const { title, price, thumbnail } = req.body;
    const product = ProductApi.save({title, price, thumbnail})
    res.send({sucees:true, data: {id: product.id}})
});

productRouter.put("/:id", (req,res)=>{
  const {id} = req.params
  const { title, price, thumbnail } = req.body;

  const updateProduct = ProductApi.updateById({id, title, price, thumbnail})
  res.send({sucees:true, data: {update: updateProduct}})
});


export  {productRouter} 