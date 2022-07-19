const knex = require('../conexao');
const jwt = require('jsonwebtoken');
const senhaHash = require('../senhaHash');
const listarProdutos = async (req, res) => {
    try {
        const produtos = await knex('produtos')
        return res.status(200).json(produtos);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const obterProduto = async (req, res) => {
    const { id } = req.params;
    try {
        const produtos = await knex('produtos').where('usuario_id', "=", id)
        return res.status(200).json(produtos);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const cadastrarProduto = async (req, res) => {
    const { nome, estoque, preco, categoria, descricao, imagem, usuario_id } = req.body;
    if (!nome) {
        return res.status(404).json('O campo nome é obrigatório');
    }
    if (!estoque) {
        return res.status(404).json('O campo estoque é obrigatório');
    }
    if (!preco) {
        return res.status(404).json('O campo preco é obrigatório');
    }
    if (!descricao) {
        return res.status(404).json('O campo descricao é obrigatório');
    }
    try {
        const produtoCadastrodo = {
            nome,
            usuario_id,
            estoque,
            preco,
            categoria,
            descricao,
            imagem
        }
        const produtoAceito = await knex('produtos').insert(produtoCadastrodo)
        return res.status(200).json('O produto foi cadastrado com sucesso.');
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const atualizarProduto = async (req, res) => {
    const { id } = req.params;
    const { nome, estoque, preco, categoria, descricao, imagem } = req.body;

    if (!nome && !estoque && !preco && !categoria && !descricao && !imagem) {
        return res.status(404).json('Informe ao menos um campo para atualizaçao do produto');
    }

    try {
        const produtoSelecionado = await knex('produtos').where({ id })
        return res.status(200).json('produto foi atualizado com sucesso.');
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const excluirProduto = async (req, res) => {

    const { id } = req.params;

    try {
        const excluido = await knex('produtos').where({ id }).delete()
        return res.status(200).json('Produto excluido com sucesso');
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    listarProdutos,
    obterProduto,
    cadastrarProduto,
    atualizarProduto,
    excluirProduto
}