//const User = require("../models/User");
import * as Yup from 'yup';
import Produtos from "../models/Produtos.js";

class ProdutosController {
    // GET /Produtos > Listar Produtos
    // errors code: 100..109
    async list(req, res) {
        // consultar no banco os Produtos
        Produtos.find({}).then((produtos) => {
            return res.json({
                error: false,
                produtos: produtos
            });
        }).catch(() => {
            return res.status(400).json({
                error: true,
                code: 100,
                message: "Erro: Não foi possível executar a solicitação!"
            });
        });
        }
    // GET /users/:id > Listar um usuário
    // errors code: 110..119
    async listOne(req, res) {
        Produtos.findOne({ _id: req.params.id }, '_id nome marca categoria createAt updateAt').then((produtos) => {
            return res.json({
                error: false,
                produtos: produtos
            });
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 110,
                message: "Erro: Não foi possível executar a solicitação!"
            })
        })
    }
    // POST /users
    // errors code: 120..129
    async create(req, res) {
        // Validação com Yup
        const schema = Yup.object().shape({
            nome: Yup.string()
                .required(),
            marca: Yup.string()
                .required(),
            categoria: Yup.string()
                .required()
        });
        try {
            await schema.validate(req.body);
        } catch(err) {
            return res.status(400).json({
                error: true,
                code: 120,
                message: err.message
            });
        };
        const ProdutoExiste = await Produtos.findOne({ _id: req.body.id });
        if (ProdutoExiste) {
            console.log(ProdutoExiste);
            return res.status(400).json({
                error: true,
                code: 121,
                message: "Error: Este produto já está cadastrado!"
            });
        };
        
        
        Produtos.create(req.body).then((produtos) => {
            return res.json(produtos);
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 122,
                message: "Error: Produto não foi cadastrado com sucesso"
            });
        });
    }
    // PUT /users/:id
    // errors code: 130..139
    async update(req, res) {
        // Validação com Yup
        const schema = Yup.object().shape({
            _id: Yup.string()
                  .required()
                  .notOneOf(['']),
            nome: Yup.string()
                .notOneOf(['']),
            marca: Yup.string()
                .notOneOf(['']),
            categoria: Yup.string()
                .notOneOf([''])
        });
        try {
            await schema.validate(req.body);
        } catch(err) {
            return res.status(400).json({
                error: true,
                code: 130,
                message: err.message
            });
        }
        
        const ProdutoExiste = await Produtos.findOne({_id: req.params.id});

        if(!ProdutoExiste){
            return res.status(400).json({
                error: true,
                code: 131,
                message: "Erro: Produto não encontrado!"
            });
        };

        Produtos.updateOne({_id: req.params.id}, req.body).then(() => {
            return res.json({
                error: false,
                message: "Produto editado com sucesso!"
            });
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 133,
                message: "Erro: Produto não foi editado com sucesso!"
            });
        });
    }
    // DELETE /users/:id
    // errors code: 140..149
    async delete(req, res) {
        Produtos.deleteOne({ _id: req.params.id }).then(() => {
            return res.json({
                error: false,
                message: "Produto apagado com sucesso!"
            });
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 140,
                message: "Error: Produto não foi apagado com sucesso."
            });
        });
    }
}

//module.exports = new UserController();
export default new ProdutosController();