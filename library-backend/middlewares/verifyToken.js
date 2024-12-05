// middlewares/verifyToken.js

const jwt = require('jsonwebtoken');

/*const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extrai o token do cabeçalho

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decodifica o token
    req.user = decoded; // Salva os dados do token no objeto `req.user`
    next(); // Prossegue para o próximo middleware ou rota
  } catch (error) {
    res.status(403).json({ error: 'Token inválido' });
  }
};

module.exports = verifyToken; */

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decodifica o token
    console.log('Token decodificado:', decoded); // Log para depurar o conteúdo do token
    req.user = decoded; // Salva os dados do token no objeto req
    next();
  } catch (error) {
    res.status(403).json({ error: 'Token inválido' });
  }
};

module.exports = verifyToken;