# POS-system

## Descrição do projeto

A aplicação oferece ao usuário uma experiência abrangente, permitindo não apenas o cadastro e login no sistema, mas também a visualização e edição do seu perfil. Além disso, proporciona uma listagem completa de todas as categorias disponíveis para o cadastro de produtos.

Em complemento, o usuário possui a capacidade de gerenciar produtos de maneira eficaz, realizando operações como listagem e exclusão. De maneira semelhante, é possível obter detalhes e efetuar edições em qualquer produto registrado. Essa flexibilidade não se restringe aos produtos; o usuário também pode manipular as informações relacionadas aos clientes, permitindo o cadastro, listagem e edição dessas informações com facilidade.

É possível ainda criar registros dos pedidos realizados pelos clientes cadastrados e listar esses pedidos sempre que necessário.

Dessa forma, a aplicação proporciona um controle completo sobre o perfil do usuário, os produtos e as informações dos clientes. Além disso, o sistema incorpora autenticação JWT e criptografia de senha com o Bcrypt, garantindo uma maior segurança no manuseio e armazenamento das informações tratadas.

## Funcionalidades

* Listar Categorias
* Cadastrar Usuário
* Efetuar Login do Usuário
* Detalhar Perfil do Usuário Logado
* Editar Perfil do Usuário Logado
* Cadastrar Produto
* Editar Dados do Produto
* Listar Produtos
* Detalhar Produto
* Excluir Produto por ID
* Cadastrar Cliente
* Editar Dados do Cliente
* Listar Clientes
* Detalhar Cliente
* Cadastrar Pedido
* Listar Pedidos

## Como executar o projeto

* Faça um clone do projeto

    * `
git clone git@github.com:rafasantosbzr/POS-system.git
`

* Instale as bibliotecas e dependências de desenvolvimento

    * `
npm i
`

* Inicie o servidor local

    * `
npm run dev
`

## Endpoints

**LISTAR CATEGORIAS**

#### `GET` `/categoria`

Esta é a rota que será chamada quando o usuário quiser listar todas as categorias cadastradas.
_____________________________

**CADASTRAR USUÁRIO**

#### `POST` `/usuario`

Esta é a rota utilizada para cadastrar um novo usuário no sistema.

Os dados do novo usuário devem ser informados no corpo da requisição, conforme o exemplo abaixo:

```JSON
{
    "nome": "John Doe",
    "email": "johndoe@email.com",
    "senha": "johndoe"
}
```
_____________________________   

**EFETUAR LOGIN DO USUÁRIO**

#### `POST` `/login`

Esta é a rota que permite ao usuário cadastrado efetuar login no sistema.

Os dados de usuário necessários para a realização do login devem ser informados no corpo da requisição, conforme o exemplo abaixo:

```JSON
{
    "email": "johndoe@email.com",
    "senha": "johndoe"
}
```
_____________________________   

**DETALHAR PERFIL DO USUÁRIO LOGADO**

#### `GET` `/usuario`

Esta é a rota que permite ao usuário logado visualizar os dados do seu próprio perfil.
_____________________________  

**EDITAR PERFIL DO USUÁRIO LOGADO**

#### `PUT` `/usuario`

Esta é a rota que permite ao usuário logado atualizar as informações do seu próprio cadastro.

Os dados de usuário a serem atualizados devem ser informados no corpo da requisição, conforme o exemplo abaixo:

```JSON
{
    "nome": "Jane Doe",
    "email": "janedoe@email.com",
    "senha": "janedoe"
}
```
_____________________________  

**CADASTRAR PRODUTO**

#### `POST` `/produto`

Esta é a rota que permite ao usuário logado cadastrar um novo produto no sistema.

Os dados do novo produto devem ser informados no corpo da requisição, conforme o exemplo abaixo:

```JSON
{
    "descricao": "Keyboard",
    "quantidade_estoque": 10,
    "valor": 5000,
    "categoria_id": 1
}
```

Adicionalmente, também pode ser feita a vinculação de uma imagem do produto ao cadastro dele no sistema, em formato de URL, conforme o exemplo abaixo:

```JSON
{
    "descricao": "Motorola Moto G9 Plus",
    "quantidade_estoque": 100,
    "valor": 15000,
    "categoria_id": 2,
    "produto_imagem": "https://s3.us-east-005.backblazeb2.com/exemplo.jpg"
}
```
_____________________________  

**EDITAR DADOS DO PRODUTO**

#### `PUT` `/produto/:id`

Esta é a rota que permite ao usuário logado atualizar as informações de um produto cadastrado.

Os dados a serem atualizados devem ser informados no corpo da requisição, conforme o exemplo abaixo:

```JSON
{
    "descricao": "Mousepad",
    "quantidade_estoque": 5,
    "valor": 3000,
    "categoria_id": 1
}
```

O campo adicional referente a imagem do produto também pode ser atualizado.
_____________________________

**LISTAR PRODUTOS**

#### `GET` `/produto`

Esta é a rota que permite ao usuário logado listar todos os produtos cadastrados.

No entanto, caso um parâmetro de query nomeado `categoria_id` seguido de um id válido seja passado, será feita a listagem apenas dos produtos vinculados ao id informado.
_____________________________

**DETALHAR PRODUTO**

#### `GET` `/produto/:id`

Esta é a rota que permite ao usuário logado obter informações sobre um dos produtos cadastrados.
_____________________________

**EXCLUIR PRODUTO POR ID**

#### `DELETE` `/produto/:id`

Esta é a rota que permite ao usuário logado excluir um dos produtos cadastrados no sistema. A exclusão do produto também deverá remover do servidor de armazenamento a imagem vinculada a ele.

Caso o produto a ser excluído esteja vinculado a algum pedido ativo, a exclusão não será realizada.
_____________________________

**CADASTRAR CLIENTE**

#### `POST` `/cliente`

Esta é a rota que permite ao usuário logado cadastrar um novo cliente no sistema.

Os dados do novo cliente devem ser informados no corpo da requisição, conforme o exemplo abaixo:

```JSON
{
    "nome": "Average Joe",
    "email": "averagejoe@email.com",
    "cpf": "09139942711"
}
```
Adicionalmente, também podem ser cadastrados dados referentes ao endereço do cliente, conforme o exemplo abaixo:

```JSON
{
    "nome": "Average Joe",
    "email": "averagejoe@email.com",
    "cpf": "09139942711",
    "cep": "50988970",
    "rua": "Avenida Tiradentes",
    "numero": "42",
    "bairro": "Centro",
    "cidade": "Campinas",
    "estado": "São Paulo"
}
```
_____________________________

**EDITAR DADOS DO CLIENTE**

#### `PUT` `/cliente/:id`

Esta é a rota que permite ao usuário realizar a atualização dos dados de um cliente cadastrado.

Os dados de cliente a serem atualizados devem ser informados no corpo da requisição, conforme o exemplo abaixo:

```JSON
{
    "nome": "Sally Sample",
    "email": "sallysample@email.com",
    "cpf": "69134672391"
}
```

Os campos adicionais referentes ao endereço do cliente também podem ser atualizados.
_____________________________

**LISTAR CLIENTES**

#### `GET` `/cliente`

Esta é a rota que permite ao usuário logado listar todos os clientes cadastrados.
_____________________________

**DETALHAR CLIENTE**

#### `GET` `/cliente/:id`

Esta é a rota que permite ao usuário logado obter as informações de um dos clientes cadastrados.
_____________________________

**CADASTRAR PEDIDO**

#### `POST` `/pedido`

Esta é a rota que permite ao usuário logado cadastrar um novo pedido no sistema.

O pedido só deverá ser cadastrado caso todos produtos vinculados a ele realmente existam no banco de dados, conforme o exemplo abaixo:

```JSON
{
    "cliente_id": 1,
    "observacao": "Em caso de ausência, recomendo deixar o produto com algum vizinho.",
    "pedido_produtos": [
        {
            "produto_id": 1,
            "quantidade_produto": 10
        },
        {
            "produto_id": 2,
            "quantidade_produto": 20
        }
    ]
}
```    
O cliente receberá uma notificação por e-mail informando que o pedido foi realizado com sucesso.
_____________________________

**LISTAR PEDIDOS**

#### `GET` `/pedido`

Esta é a rota que permite ao usuário logado listar todos os pedidos cadastrados.

No entanto, caso um parâmetro de query nomeado `cliente_id` seguido de um id válido seja passado, será feita a listagem apenas dos pedidos cadastrados para o cliente atrelado ao id informado.
_____________________________

## Tecnologias Utilizadas

[![My Skills](https://skillicons.dev/icons?i=js,nodejs,express,git,postgres,vscode&perline=3)](https://skillicons.dev)

## Deploy

O deploy da aplicação está disponível em: https://good-plum-lion-sock.cyclic.app/

## Autores

[Rafael Santos Bezerra](https://github.com/rafasantosbzr)

[Brenner Henrique de Oliveira Gama](https://github.com/bhenrique07)

[Gerson Gabriel Mendes dos Santos](https://github.com/gabrielmdss)

[Romão Bernardo de Souza ](https://github.com/romaobernnardo)

[Vitor Valério Rocha Vasconcelos](https://github.com/vitor-valerio)