const knex = require('../conexao');
const transportador = require('../servicos/email');


const cadastrarPedido = async (req,res) => {
    const { cliente_id, observacao, pedido_produtos } = req.body;

    try {
        const cliente = await knex('clientes').where('id', cliente_id).first();

    if (!cliente) {
        return res.status(404).json({ mensagem: 'Cliente não encontrado!' });
    };

    let soma = 0;

    for (let i = 0; i < pedido_produtos.length; i++) {
      let idProduto = pedido_produtos[i].produto_id;

      const produto = await knex('produtos').where('id', idProduto);

        if (!produto) {
            return res.status(404).json({ mensagem: 'Produto não encontrado!' });
        };

        const quantidade = pedido_produtos[i].quantidade_produto;

        const estoque = produto[0].quantidade_estoque;

        if (estoque < quantidade) {
            return res.status(404).json({ mensagem: `Estoque insuficiente para ${produto.descricao}` });
        };

        const valorProduto = produto[0].valor;
        soma += valorProduto * quantidade;
    };
        const pedidoRealizado = await knex('pedidos').insert({
            cliente_id,
            observacao,
            valor_total: soma
        }).returning('*');

        for (let i = 0; i < pedido_produtos.length; i++) {
          const idProduto = pedido_produtos[i].produto_id;
          const produto = await knex('produtos').where('id', idProduto);

          const quantidade = pedido_produtos[i].quantidade_produto;
          const valor = produto[0].valor;
          
          const atualizarEstoque = produto[0].quantidade_estoque - quantidade;

          await knex('produtos').where('id', idProduto).update('quantidade_estoque', atualizarEstoque);
          
          await knex('pedido_produtos').insert({
            pedido_id: pedidoRealizado[0].id,
            produto_id: pedido_produtos[i].produto_id,
            quantidade_produto: pedido_produtos[i].quantidade_produto,
            valor_produto: valor
          })

    pedidoJson = {
        cliente_id,
        observacao,
        pedido_produtos
    };

    transportador.sendMail({
        from: `${process.env.EMAIL_NAME} < ${process.env.EMAIL_FROM}>`,
        to: `${cliente.nome} <${cliente.email}>`,
        subject: 'Verificação de Pedido Realizado',
        html: `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Confirmação de Pedido</title>
        </head>
        <body>
            <div>
                <h2>Confirmação de Pedido</h2>
                <p>Olá ${cliente.nome},</p>
                <p>Obrigado por fazer o seu pedido conosco.</p>
                
                <p>Agradecemos pela sua compra. Se precisar de assistência, entre em contato conosco.</p>
                
                <p>Atenciosamente,<br> Equipe ERROR 404 - Name Not Found</p>
            </div>
        </body>
        </html>
        ` 
    });
  };
    return res.status(201).json(pedidoJson);
        
    } catch (error) {
        return res.status(500).json({mensagem: 'Erro interno do servidor.'});
    };
};

const listarPedidos = async (req, res) => {
    const { cliente_id } = req.query
  
    try {
      if (cliente_id) {
        const clienteEncontrado = await knex('clientes').where('id', cliente_id).first();

        if (clienteEncontrado) {
          const pedidosCliente = await knex('pedidos').where('cliente_id', cliente_id);

        let resultado = []

        for (let pedido of pedidosCliente) {
          const pedido_produtos = await knex('pedido_produtos').where('pedido_id', pedido.id);

          resultado.push({pedido, pedido_produtos});
        };

      return res.status(200).json(resultado);
    };
  };
    const pedidosGerais = await knex('pedidos'); 

    const resultado = [];

    for (let pedido of pedidosGerais) {
      const pedido_produtos = await knex('pedido_produtos').where('pedido_id', pedido.id);

      resultado.push({pedido, pedido_produtos});
    };

    return res.status(200).json(resultado);
    }
    catch (error) {
      return res.status(500).json({mensagem: 'Erro interno do servidor.'});
    };
  };

module.exports = {
    cadastrarPedido,
    listarPedidos
};