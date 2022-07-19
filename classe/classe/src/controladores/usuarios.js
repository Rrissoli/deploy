const conexao = require('../conexao');
const bcrypt = require('bcrypt');
const knex = require('../conexao');

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha, nome_loja } = req.body;

    if (!nome) {
        return res.status(404).json("O campo nome é obrigatório");
    }

    if (!email) {
        return res.status(404).json("O campo email é obrigatório");
    }

    if (!senha) {
        return res.status(404).json("O campo senha é obrigatório");
    }

    if (!nome_loja) {
        return res.status(404).json("O campo nome_loja é obrigatório");
    }

    try {
        const usuarioexistente = await knex('usuarios').where({ email: email }).debug
        if (!usuarioexistente) {
            return res.status(400).json("O email já existe");
        }
        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const usuarioAdicionado = {
            nome,
            email,
            senha: senhaCriptografada,
            nome_loja
        }
        const positivo = await knex('usuarios').insert(usuarioAdicionado)
        if (!positivo) {
            return res.status(400).json("O usuário não foi cadastrado.");
        }

        return res.status(200).json("O usuario foi cadastrado com sucesso!");
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const obterPerfil = async (req, res) => {
    const { email, nome } = req.body
    try {
        if (!email || !nome) return res.json('adicione algum parametro de busca')
        let usuario = {}
        if (email) {
            usuario = await knex('usuarios').where({ email })
        }

        if (nome) {
            usuario = await knex('usuarios').where({ nome })
        }
        return res.json(usuario)
    } catch (error) {
        return res.json(error.message)
    }
    return res.status(200).json(req.usuario);
}

const atualizarPerfil = async (req, res) => {
    const { nome, email, senha, nome_loja } = req.body;

    if (!nome && !email && !senha && !nome_loja) {
        return res.status(404).json('É obrigatório informar ao menos um campo para atualização');
    }

    try {
        const senhaCriptografada = await bcrypt.hash(senha, 10);
        const usuario = {
            nome,
            email,
            senha: senhaCriptografada,
            nome_loja
        }
        const usuarioAtualizado = await knex('usuarios').where({ email: email }).update(usuario)
        if (!usuarioAtualizado) {
            return res.status(400).json("O usuario não foi atualizado");
        }
        return res.status(200).json('Usuario foi atualizado com sucesso.');
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    cadastrarUsuario,
    obterPerfil,
    atualizarPerfil
}