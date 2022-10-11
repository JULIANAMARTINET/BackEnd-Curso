import { Router } from "express";
import { Container } from "../server/Container.js"

const router = Router();
const ProductContainer = new Container("productos");

router.get("/productos", async(req,res)=>{
  const productos = await ProductContainer.getAll()
  res.render("productos/item", {
    productos,
  });
});

router.get("/edit/:id",async (req,res)=>{
  const { id } = req.params;
  const producto =  await ProductContainer.getById(id)
  const formInfo={
    botonName:"Actualizar",
    metodo:"POST",
    url:"/productos/edit/"+id
  }
  return res.render("productos/formTareas", { producto , ...formInfo});
});

router.get("/create", (req, res) => {
  const formInfo={
    botonName:"Crear",
    metodo:"POST",
    url:"/productos/create"
  }
  res.render("productos/formTareas",formInfo);
});


router.get("/delete/:id", async(req,res)=>{
  try{
    const { id } = req.params;
    await ProductContainer.delete(id)
    res.redirect("/productos/item");
  }
  catch(e){
    res.redirect("/error");
  }

});

router.post("/create", async (req,res)=>{
  try {
    const { title, description } = req.body;
    await ProductContainer.create({title,description})
    res.redirect("/productos/item");
  } catch (errors) {
    res.redirect("/error");
  }
});
router.post("/edit/:id",async (req,res)=>{
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    console.log("holaaa",id,req.body)
    await ProductContainer.modify(id,{title,description})
    res.redirect("/productos/item");
  } catch (errors) {
    res.redirect("/error");
  }
});

export default router 