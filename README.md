# Projeto Cardápio Online para Restaurante

## Descrição

Este projeto consiste na criação de um cardápio online para um restaurante, utilizando as funcionalidades aprendidas durante as aulas. O objetivo é proporcionar uma interface amigável e funcional para gerenciamento e visualização dos produtos oferecidos pelo restaurante.

## Funcionalidades

- **Banco de Dados em JSON**: O projeto utiliza um arquivo `Cardapio.JSON` como API, contendo informações sobre os produtos, incluindo nome, ingredientes, valor e imagem. O banco de dados possui cerca de 20 produtos, organizados em quatro categorias.
- **Telas do Sistema**:

  1. **Cadastro**: Formulário para novos usuários se cadastrarem.
  2. **Cadastro Realizado com Sucesso**: Confirmação visual de cadastro bem-sucedido.
  3. **Login**: Tela de login, com verificação de usuários cadastrados.
  4. **Listagem de Produtos**: Visualização dos produtos disponíveis no cardápio.
  5. **Carrinho**: Adição e remoção de produtos, com cálculo dinâmico de valores e opção de adicionar gorjeta.
  6. **Confirmação do Pedido**: Tela de confirmação de pedido com resumo das compras.

- **Autenticação de Usuários**: Implementação de funcionalidade que impede o cadastro de usuários já existentes e permite login apenas para usuários cadastrados.

- **Conexão Front End e API**: Navegação fluida entre as telas com integração completa com a API JSON. O sistema redireciona automaticamente após ações como cadastro e login.

- **Interface Amigável**: Design intuitivo e fácil de usar. Demonstrar o projeto pode destacar essas características.

## Tecnologias Utilizadas

- **Front End**: HTML, CSS, JavaScript
- **Back End**: Node.js, Express.js
- **Banco de Dados**: JSON (Cardapio.JSON)

## Estrutura do Projeto
