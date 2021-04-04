//const { Router } = require("express");
import { Router } from "express";
import ProdutosController from "./controllers/ProdutosController.js";
const routes = new Router();

// rotas
routes.get("/", async (req, res) => {
  res.send("Olá mundo!");
});

// GET /products > Listar produtos
routes.get("/Produtos", ProdutosController.list);
// GET /Produtos/:id > Listar um produto
routes.get("/Produtos/:id", ProdutosController.listOne);
// POST /Produtos > Criar um produto
routes.post("/Produtos", ProdutosController.create);
// PUT /Produtos/:id > Atualizar um produto
routes.put("/Produtos/:id", ProdutosController.update);
// DELETE /Produtos/:id > Deletar um produto
routes.delete("/Produtos/:id", ProdutosController.delete); 

//module.exports = routes;
export default routes;