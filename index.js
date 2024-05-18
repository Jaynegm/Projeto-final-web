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

    // Se o login for bem-sucedido, redireciona para a calculadora
    res.redirect('/calculadora.html');
});



// Endpoint para a página da calculadora
app.get('/calculadora', (req, res) => {
    // Aqui você deve enviar a página HTML da calculadora
});

// Função para calcular as raízes da equação do segundo grau
function calcularRaizes(a, b, c) {
  const delta = b * b - 4 * a * c;
  if (delta < 0) {
      return 'Não existem raízes reais';
  } else if (delta === 0) {
      const x = -b / (2 * a);
      return `Raiz única: ${x}`;
  } else {
      const x1 = (-b + Math.sqrt(delta)) / (2 * a);
      const x2 = (-b - Math.sqrt(delta)) / (2 * a);
      return `Raízes: ${x1} e ${x2}`;
  }
}

// Rota para calcular a equação do segundo grau
app.post('/calculadora', (req, res) => {
  const { a, b, c } = req.body;

  // Validar se os coeficientes foram fornecidos
  if (!a || !b || !c) {
      return res.status(400).json({ error: 'Coeficientes não fornecidos' });
  }

  // Converter os coeficientes para números
  const coefA = parseFloat(a);
  const coefB = parseFloat(b);
  const coefC = parseFloat(c);

  // Verificar se os coeficientes são números válidos
  if (isNaN(coefA) || isNaN(coefB) || isNaN(coefC)) {
      return res.status(400).json({ error: 'Coeficientes inválidos' });
  }

  // Calcular as raízes da equação do segundo grau
  const resultado = calcularRaizes(coefA, coefB, coefC);

  res.status(200).json({ resultado });
});


app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
