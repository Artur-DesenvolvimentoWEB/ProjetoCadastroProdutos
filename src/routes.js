
import { Router } from "express";

import ProdutosController from "./controllers/ProdutosController.js";
import authMiddleware from "./middlewares/auth.js";
import UserController from "./controllers/UserController.js";
import LoginController from "./controllers/LoginController.js";

const routes = new Router();

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

/* Login */
/** Criar a rota de login com o método post. */

/* User */
routes.post("/users", UserController.create);

/**
 * Se a autenticação estiver funcionando adequadamente, pode utilizar essas rotas como teste.
 */

/* Me (usuário autenticado) */
routes.get("/me", authMiddleware, UserController.listMe);
routes.put("/me", authMiddleware, UserController.updateMe);
routes.delete("/me", authMiddleware, UserController.deleteMe);

//module.exports = routes;
export default routes;
