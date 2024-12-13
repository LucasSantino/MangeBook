📚 ManageBook - Projeto de Sistema de Gerenciamento de Biblioteca.

ManageBook é uma aplicação web moderna e completa desenvolvida para otimizar o gerenciamento de reservas de livros, oferecendo uma interface amigável, responsiva e interativa. O projeto foi criado com foco em proporcionar aos usuários uma experiência fluida para explorar, buscar, devolver e avaliar livros, integrando perfeitamente o front-end e o back-end.

Principais Funcionalidades:


| **Funcionalidade**           | **Descrição**                                                                                         |
|-------------------------------|---------------------------------------------------------------------------------------------------------|
| **Gerenciamento de Reservas** | Visualização dos livros reservados com informações detalhadas (título, autor, ano de publicação e capa). Busca eficiente por título ou autor, devolução de reservas pela interface e avaliação de livros (em estágio final de desenvolvimento). |
| **Paginação Dinâmica**        | Navegação simples e organizada entre páginas para exibição de grandes volumes de livros.               |
| **Autenticação com JWT**      | Sistema de login seguro utilizando tokens JWT para proteger os dados dos usuários.                     |
| **Comunicação Front-End e Back-End** | Requisições HTTP para APIs RESTful utilizando Axios, garantindo integração rápida e confiável.        |
| **Interface Responsiva**      | Design adaptado para dispositivos móveis, tablets e desktops, garantindo uma experiência amigável.      |


____________________________________________________________________________________________________________________________________


Tecnologias Utilizadas:

| **Categoria**     | **Tecnologia**             | **Descrição**                                                                                   |
|--------------------|----------------------------|-------------------------------------------------------------------------------------------------|
| **Back-End**       | **Node.js**               | Plataforma para criação de aplicações escaláveis e performáticas.                              |
|                    | **Express.js**            | Framework minimalista para construção de APIs RESTful.                                         |
|                    | **MongoDB Atlas**         | Banco de dados NoSQL para armazenamento e gerenciamento dos dados.                             |
| **Front-End**      | **Vue.js**                | Framework JavaScript progressivo para criação de interfaces dinâmicas e reativas.              |
|                    | **Axios**                 | Biblioteca para requisições HTTP e comunicação com o back-end.                                 |
|                    | **HTML**                  | Para estruturação da base (esqueleto) do projeto.                                              |
|                    | **CSS3**                  | Estilização do front-end, com design moderno e responsivo.                                     |
|                    | **JavaScript**            | Para atribuir funcionalidades ao projeto.                                                     |
_____________________________________________________________________________________________________________________________________

Comandos Utilizados neste projeto:

| **Categoria**     | **Descrição**                                    | **Comando**                                |
|--------------------|------------------------------------------------|-------------------------------------------|
| **Back-End**       | Inicializar o projeto Node.js                 | `npm init -y`                             |
|                    | Express.js (framework para APIs REST)          | `npm install express`                     |
|                    | Cors (habilitar comunicação entre diferentes origens) | `npm install cors`                   |
|                    | Mongoose (ODM para MongoDB)                    | `npm install mongoose`                    |
|                    | Dotenv (gerenciamento de variáveis de ambiente) | `npm install dotenv`                      |
|                    | JSON Web Token (JWT) (autenticação segura)     | `npm install jsonwebtoken`                |
|                    | Nodemon (reinício automático do servidor)      | `npm install --save-dev nodemon`          |
|                    | Iniciar o servidor Node.js                     | `npm start`                               |
|                    | Durante o desenvolvimento                      | `node Server.js`                          |
| **Front-End**      | Inicializar o projeto Vue.js                   | `vue create user-frontend`                |
|                    | Axios (requisições HTTP para comunicação com o back-end) | `npm install axios`               |
|                    | Iniciar o servidor de desenvolvimento Vue.js   | `npm run serve`                           |

Acesso à Aplicação:

- Front-End: http://localhost:8080
- Back-End: http://localhost:3000
- Deploy relizado no Vercel (em progresso nos estagios finais)

______________________________________________________________________________________________________________________________________________________
Sobre o Projeto:

Este projeto foi desenvolvido como parte da disciplina de Desenvolvimento Front-End - MangeBook pelo o estudante Lucas Santino da Silva, aluno do curso de Análise e Desenvolvimento de Sistemas da Escola e Faculdade de Tecnologia Senai Roberto Mange. Com a orientação da Profª Ma. Tatiana Aparecida de Almeida.

Exploramos práticas modernas de desenvolvimento web, destacando a comunicação eficiente entre front-end e back-end, além de técnicas para otimizar a experiência do usuário.












