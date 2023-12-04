CREATE DATABASE pdv; 

CREATE TABLE usuarios (
  id serial primary key, 
  nome text not null,
  email text not null unique,
  senha text not null
);

CREATE TABLE categorias (
  id serial primary key,
  descricao text not null
);

INSERT INTO categorias (descricao)
values 
('Informática'),
('Celulares'),
('Beleza e Perfumaria'),
('Mercado'),
('Livros e Papelaria'),
('Brinquedos'),
('Moda'),
('Bebê'),
('Games');

CREATE TABLE produtos (
	id serial primary key,
	descricao text not null,
	quantidade_estoque int not null,
	valor int not null ,
	categoria_id int not null references categorias(id)
);

CREATE TABLE clientes (
	id serial primary key,
	nome text not null,
	email text not null unique,
	cpf text not null unique,
	cep text,
	rua text,
	numero text,
	bairro text,
	cidade text,
	estado text
);

CREATE TABLE pedidos (
	id serial primary key,
	cliente_id int not null references clientes(id),
	observacao text,
	valor_total int not null
);

CREATE TABLE pedido_produtos (
	id serial primary key,
	pedido_id int not null references pedidos(id),
	produto_id int not null references produtos(id),
	quantidade_produto int not null,
	valor_produto int not null
);

ALTER TABLE produtos
ADD COLUMN produto_imagem text;