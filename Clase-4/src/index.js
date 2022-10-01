import { Container } from "./containers/Container.js"

const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

const ProductContainer = new Container("productos");

//  ProductContainer.save({
//    title: "Producto 1",
//    price: 500,
//    thumbnail: "ruta",
//  })
//    .then((data) => console.log({ data }))
//    .catch((error) => console.log({ error }));

const randomFunction=(limite) => {
  return parseInt(Math.random()*limite)+ 1
}

app.get("/productos", (req, res) => {
  ProductContainer.getAll()
   .then( lista=>
    JSON.parse(lista))
    .then( listaParse=>{
    res.json(listaParse)
  })
})

app.get("/productosRandom", (req, res) => {
  ProductContainer.getAll()
    .then( lista =>
    JSON.parse(lista)
  )
    .then(listaParse =>
    listaParse[randomFunction(listaParse.length)]
  )
    .then( itemLista =>
    res.json(itemLista))
});


const server = app.listen( PORT, () => console.log(`Server listening on PORT ${PORT}`))