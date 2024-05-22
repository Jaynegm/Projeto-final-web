const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
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
})
// Função para carregar os dados dos produtos do arquivo JSON
function carregarProdutos() {
    const rawData = fs.readFileSync('produtos.json');
    return JSON.parse(rawData);
}

// Endpoint para a página da calculadora
app.get('/calculo', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'calculo.html'));
});

// Rota para calcular a soma dos valores dos produtos selecionados
app.post('/calculo', (req, res) => {
    const { produtos } = req.body;

    // Verificar se produtos foram fornecidos
    if (!produtos || produtos.length === 0) {
        return res.status(400).json({ error: 'Nenhum produto selecionado' });
    }

    // Carregar os dados dos produtos do arquivo JSON
    const listaProdutos = carregarProdutos();

    // Calcular a soma dos valores dos produtos selecionados
    let total = 0;
    produtos.forEach(produtoId => {
        const produto = listaProdutos.find(p => p.id === produtoId);
        if (produto) {
            total += produto.valor;
        }
    });

    res.status(200).json({ total });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
