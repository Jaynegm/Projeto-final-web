const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const usuarios = [
    { id: 1, nome: 'UsuarioTeste', email: 'usuario@teste.com', senha: 'senha123' }
];

// Endpoint para enviar a página de login
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cadastro.html'));
});

// Endpoint para enviar a página de cadastro
app.get('/cadastro', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cadastro.html'));
});

// Endpoint para processar o cadastro
app.post('/cadastro', (req, res) => {
  const { nome, email, senha } = req.body;
  const usuarioExistente = usuarios.find(u => u.email === email);

  if (usuarioExistente) {
      return res.status(400).send('Este email já está cadastrado');
  }

  const novoUsuario = { nome, email, senha };
  usuarios.push(novoUsuario);

  // Após o cadastro bem-sucedido, redireciona para a página de sucesso
  res.redirect('/sucesso.html');
});

// Endpoint para enviar a página de sucesso
app.get('/sucesso', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'sucesso.html'));
});

// Endpoint para processar o login
app.post('/login', (req, res) => {
    const { email, senha } = req.body;
    const usuario = usuarios.find(u => u.email === email);

    if (!usuario || usuario.senha !== senha) {
        return res.status(401).send('Credenciais inválidas');
    }

    // Redireciona para a página de produtos após o login bem-sucedido
    res.redirect('/produtos.html');
});

// Endpoint para a página de produtos
app.get('/produtos.html', (req, res) => {
    try {
        // Carregar os produtos do arquivo JSON
        const produtos = carregarProdutos();
        res.json(produtos); // Envie os produtos para a página HTML
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        res.status(500).send('Erro ao carregar produtos');
    }
});

// Função para carregar os dados dos produtos do arquivo JSON
function carregarProdutos() {
    const filePath = path.join(__dirname, 'cardapio.json');
    const rawData = fs.readFileSync(filePath);
    const cardapio = JSON.parse(rawData);
    // Combine todas as categorias de produtos em uma lista única
    const allProducts = [].concat(cardapio.pizzas, cardapio.massas, cardapio.risotos, cardapio.sobremesas);
    return allProducts;
}
// Endpoint para a página da calculadora
app.get('/calculo.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'calculo.html'));
});
//página de confirmação compra
app.get('/confirmacao.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'confirmacao.html'));
});


app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
