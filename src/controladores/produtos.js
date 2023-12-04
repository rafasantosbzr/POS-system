const knex = require('../conexao');
const { uploadImagem, excluirImagem } = require('../servicos/uploads');

const listarProdutos = async (req, res) => {
    const { categoria_id : filtroDeCategoria } = req.query

    try {
        if (filtroDeCategoria) {
            const produtoPorCategoria = await knex('produtos').where('categoria_id', filtroDeCategoria).returning('*');
            
            if (produtoPorCategoria.length < 1) {
                return res.status(404).json({ mensagem: 'Produto não encontrado!' });
            } else {
                return res.json(produtoPorCategoria);
            };
        };

        const produtos = await knex('produtos');
        return res.status(200).json(produtos);
    } catch (error) {
        return res.status(500).json({mensagem: 'Erro interno do servidor!'});
    };
};

const detalharProduto = async(req, res) => {
    const { id } = req.params

    try {
        const produtoEncontrado = await knex('produtos').where('id', id).first();

        if (!produtoEncontrado) {
            return res.status(404).json({ mensagem: 'Produto não encontrado!' });
        };

        return res.status(200).json(produtoEncontrado);
    } catch (error) {
        return res.status(500).json({mensagem: 'Erro interno do servidor!'});
    };
};

const cadastrarProduto = async (req,res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
    
    try {
        
        const categoria = await knex('categorias').where('id', categoria_id).first();
        
        if (!categoria) {
            return res.status(404).json({mensagem: "Categoria Inválida!"});
        };
        
        let novoProduto = await knex('produtos').insert({
            descricao,
            quantidade_estoque,
            valor,
            categoria_id
        }).returning('*');
        
        if (req.file) {
            const { originalname, mimetype, buffer } = req.file;
    
            const id = novoProduto[0].id;
            const produto_imagem = await uploadImagem(
                `produtos/${id}/${originalname}`,
                buffer,
                mimetype
            )
            novoProduto = await knex('produtos').update('produto_imagem', produto_imagem.url).where('id', id).returning('*');
        }
        return res.status(201).json(novoProduto[0]);

    } catch (error) {
        return res.status(500).json({mensagem: 'Erro interno do servidor!'});
    };
};

const excluirProduto = async (req,res) => {
    const { id } = req.params;

    try {
        const produtoEncontrado = await knex('produtos').where('id', id).first();
        
        if (!produtoEncontrado) {
            return res.status(404).json({mensagem: "Produto não encontrado!"});
        };

        const produtoVinculadoAPedido = await knex('pedido_produtos').where('produto_id', id).first();

        if (produtoVinculadoAPedido) {
            return res.status(400).json({mensagem: "Não é possível excluir um produto que esteja vinculado a um pedido ativo!"});
        };

        if (produtoEncontrado.produto_imagem !== null) {
            if (produtoEncontrado.produto_imagem) {
                await excluirImagem(produtoEncontrado.produto_imagem);
            };
        };

        const produtoExcluido = await knex('produtos').where('id', id).update('produto_imagem', null).del();

        if (!produtoExcluido) {
            return res.status(400).json({mensagem: "Não foi possível excluir o produto!"});
        };

        return res.status(204).send();
       
    } catch (error) {
        return res.status(500).json({mensagem: 'Erro interno do servidor!'});
    };
};

const atualizarProduto = async (req, res) => {
    const { id } = req.params;
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

    try {
        const produtoEncontrado = await knex('produtos').where('id', id).first();

        if (!produtoEncontrado) {
            return res.status(404).json({mensagem: "Produto não encontrado!"});
        };

        const categoria = await knex('categorias').where('id', categoria_id).first();

        if (!categoria) {
            return res.status(404).json({mensagem: "Categoria não encontrada!"});
        };

        let imagemAtualizada;

        if (req.file) {
            const { originalname, mimetype, buffer } = req.file;

        if (produtoEncontrado.produto_imagem !== null) {
            await excluirImagem(produtoEncontrado.produto_imagem);
        };

        imagemAtualizada = await uploadImagem(
            `produtos/${produtoEncontrado.id}/${originalname}`,
            buffer,
            mimetype
        );

        await knex('produtos').update('produto_imagem' , imagemAtualizada.url).where('id', id).returning('*');
        };

        const produtoAtualizado = await knex('produtos').update({ 
            descricao,
            quantidade_estoque,
            valor,
            categoria_id
        }).where('id', id).returning('*');

        return res.status(201).json(produtoAtualizado[0]);

        } catch (error) {
        return res.status(500).json({mensagem: 'Erro interno do servidor!'});
        };
    };

module.exports = {
    listarProdutos,
    detalharProduto,
    cadastrarProduto,
    excluirProduto,
    atualizarProduto
};