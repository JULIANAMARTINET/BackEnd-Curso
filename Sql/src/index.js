import express from "express";
import { ProductApi, MessagesApi } from "./Api/index.js"
import { Server as HttpServer } from 'http'
import {Server as IOServer} from 'socket.io'
import { DATE_UTILS } from "./utils/index.js";

const app = express();
const PORT = process.env.PORT || 8080;
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"));

io.on("connection", async (socket) => {
    console.log(`Nuevo cliente conectado ${socket.id}`);
  
    socket.emit("mensajes", await MessagesApi.getAll());
  
    socket.on("mensajeNuevo", async ({ name, text }) => {
    const message = { name, text, timestamp: DATE_UTILS.getTimestamp() };
    await MessagesApi.save(message);
  
    io.sockets.emit("mensajes", await MessagesApi.getAll());
 });
  
    socket.emit("products", await ProductApi.getAll());
  
    socket.on("add-product", async (data) => {
      const products = await ProductApi.save(data);
  
      io.sockets.emit("products", await ProductApi.getAll());
    });
  });
  
  const server = httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
  });
  server.on("error", (error) => {
    console.error(`Error en el servidor ${error}`);
  });
  