const express = require('express');
const verificarUsuarioLogado = require('./intermediarios/autenticacao');
const validarParametroRota = require('./intermediarios/validarParametroRota')
const validarRequisicao = require('./intermediarios/validarRequisicao');
const clienteSchema = require('./validacoes/clienteSchema');
const loginSchema = require('./validacoes/loginSchema');
const parametroSchema = require('./validacoes/parametroSchema');
const produtoSchema = require('./validacoes/produtoSchema');
const usuarioSchema = require('./validacoes/usuarioSchema');
const { listarCategorias } = require('./controladores/categorias');
const { listarClientes, cadastrarCliente, atualizarCliente, detalharCliente } = require('./controladores/clientes');
const { listarProdutos, detalharProduto, cadastrarProduto, excluirProduto, atualizarProduto } = require('./controladores/produtos');
const { cadastrarUsuario, login, atualizarUsuario, detalharUsuario } = require('./controladores/usuarios');
const { cadastrarPedido, listarPedidos } = require('./controladores/pedidos');
const pedidoSchema = require('./validacoes/pedidoSchema');
const multer = require('./intermediarios/multer');

const rotas = express();

rotas.get('/', (req, res) => {
    return res.status(200).json({ mensagem: 'API de Ponto de Venda (PDV)!' });
});

rotas.get('/categoria', listarCategorias);

rotas.post('/usuario', validarRequisicao(usuarioSchema), cadastrarUsuario);

rotas.post('/login', validarRequisicao(loginSchema), login);

rotas.use(verificarUsuarioLogado);

rotas.get('/usuario', detalharUsuario);

rotas.put('/usuario', validarRequisicao(usuarioSchema), atualizarUsuario);

rotas.post('/produto', multer.single('produto_imagem'), validarRequisicao(produtoSchema), cadastrarProduto); 

rotas.put('/produto', (req, res) => {
    return res.status(404).json({ mensagem: 'Rota não encontrada!' });
});

rotas.put('/produto/:id', multer.single('produto_imagem'), validarParametroRota(parametroSchema), validarRequisicao(produtoSchema), atualizarProduto);

rotas.get('/produto', listarProdutos); 

rotas.get('/produto/:id', validarParametroRota(parametroSchema), detalharProduto); 

rotas.delete('/produto/:id', validarParametroRota(parametroSchema), excluirProduto); 

rotas.post('/cliente', validarRequisicao(clienteSchema), cadastrarCliente);

rotas.put('/cliente/:id', validarParametroRota(parametroSchema), validarRequisicao(clienteSchema), atualizarCliente);

rotas.get('/cliente', listarClientes);

rotas.get('/cliente/:id', validarParametroRota(parametroSchema), detalharCliente);

rotas.post('/pedido',validarRequisicao(pedidoSchema),cadastrarPedido);

rotas.get('/pedido', listarPedidos);

module.exports = rotas;