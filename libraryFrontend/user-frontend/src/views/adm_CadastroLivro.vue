<template>
    <div id="app">
      <!-- Navbar com o evento de toggle para abrir/fechar a sidebar -->
      <NavBar @toggle-sidebar="toggleSidebar" />
  
      <!-- Sidebar Administrativa para administradores -->
      <adm_SideBar :isSidebarOpen="isSidebarOpen" @toggle-sidebar="toggleSidebar" />
  
      <!-- Conteúdo principal -->
      <main class="main-content">
        <div class="container-pai">
          <h2>Cadastro de Livros</h2>
          <form @submit.prevent="submitForm" class="book-form">
            <!-- Campos do formulário -->
            <div class="form-group">
              <label for="thumbnail">Miniatura do Livro</label>
              <input type="file" id="thumbnail" name="thumbnail" accept="image/*" @change="previewImage" />
              <img v-if="imagePreview" :src="imagePreview" class="thumbnail-preview" alt="Pré-visualização da miniatura" />
            </div>
  
            <div class="form-group">
              <label for="livroId">ID do Livro:</label>
              <input type="text" id="livroId" v-model="livro.id" placeholder="Insira o ID do livro" />
            </div>
  
            <div class="form-group">
              <label for="titulo">Título</label>
              <input type="text" id="titulo" v-model="livro.titulo" required />
            </div>
  
            <div class="form-group">
              <label for="autor">Autor</label>
              <input type="text" id="autor" v-model="livro.autor" required />
            </div>
  
            <div class="form-group">
              <label for="anoPublicacao">Ano de Publicação</label>
              <input type="number" id="anoPublicacao" v-model="livro.anoPublicacao" required />
            </div>
  
            <div class="form-group">
              <label for="genero">Gênero</label>
              <input type="text" id="genero" v-model="livro.genero" required />
            </div>
  
            <div class="form-group">
              <label for="isbn">ISBN</label>
              <input type="text" id="isbn" v-model="livro.isbn" required />
            </div>
  
            <div class="form-group">
              <label for="numCopias">Número de Cópias Disponíveis</label>
              <input type="number" id="numCopias" v-model="livro.numCopias" required />
            </div>
  
            <div class="form-group">
              <label for="descricao">Descrição</label>
              <textarea id="descricao" v-model="livro.descricao" rows="4" required></textarea>
              <div class="text-length-indicator">{{ charCount }} caracteres</div>
            </div>
  
            <div class="form-group">
              <button type="submit">Cadastrar Livro</button>
            </div>
            <div class="form-group">
    <button type="submit" @click="finalizarCadastro">Finalizar Cadastro</button>
</div>
          </form>
  
          <!-- Seção de Pré-visualização do Livro -->
          <div v-if="showPreview" class="detalhes-container">
            <img :src="imagePreview" alt="Capa do Livro" class="book-thumbnail" />
            <div class="detalhes-livro">
              <table>
                <tr>
                  <th>ID-Livro:</th>
                  <td>{{ livro.id }}</td>
                </tr>
                <tr>
                  <th>Título do Livro:</th>
                  <td>{{ livro.titulo }}</td>
                </tr>
                <tr>
                  <th>Autor</th>
                  <td>{{ livro.autor }}</td>
                </tr>
                <tr>
                  <th>Ano de Publicação</th>
                  <td>{{ livro.anoPublicacao }}</td>
                </tr>
                <tr>
                  <th>Gênero</th>
                  <td>{{ livro.genero }}</td>
                </tr>
                <tr>
                  <th>ISBN</th>
                  <td>{{ livro.isbn }}</td>
                </tr>
                <tr>
                  <th>Número de Cópias Disponíveis</th>
                  <td>{{ livro.numCopias }}</td>
                </tr>
                <tr>
                  <th>Descrição</th>
                  <td>{{ livro.descricao }}</td>
                </tr>
              </table>
            </div>
          </div>

        </div>
      </main>
    </div>
  </template>
  
  
  <script>
import NavBar from '@/components/NavBar.vue';
import adm_SideBar from '@/components/adm_SideBar.vue';

export default {
  components: {
    NavBar,
    adm_SideBar,
  },
  data() {
    return {
      isSidebarOpen: false,
      livro: {
        id: '',
        titulo: '',
        autor: '',
        anoPublicacao: '',
        genero: '',
        isbn: '',
        numCopias: '',
        descricao: '',
      },
      imagePreview: null,
      showPreview: false,
      charCount: 630,
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    previewImage(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreview = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    submitForm() {
      this.showPreview = true;
    },
    finalizarCadastro() {
      // Exemplo de ação após finalizar o cadastro
      alert('Cadastro finalizado com sucesso!');
      // Limpar os campos do formulário
      this.livro = {
        id: '',
        titulo: '',
        autor: '',
        anoPublicacao: '',
        genero: '',
        isbn: '',
        numCopias: '',
        descricao: '',
      };
      this.imagePreview = null;
      this.showPreview = false;
    },
  },
};
</script>

  
<style scoped>
/* Estilos gerais do contêiner principal */
.main-content {
    display: flex;
    flex-direction: column; /* Alinha os itens na coluna */
    align-items: center; /* Centraliza os itens horizontalmente */
    padding: 20px;
    margin: 190px auto; /* Espaçamento automático */
    max-width: 1200px; /* Largura máxima do contêiner */
    background-color: #f9f9f9; /* Cor de fundo */
    border-radius: 8px; /* Bordas arredondadas */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra */
    min-height: 100vh; /* Garante que o conteúdo ocupe a altura mínima da tela */
    box-sizing: border-box; /* Inclui o padding no cálculo de altura */
}

/* Formulário de cadastro de livros */
.book-form {
    width: 100%; /* O formulário vai ocupar 100% da largura disponível do contêiner pai */
    height: 100%; /* O formulário vai ocupar 100% da altura disponível do contêiner pai */
    padding: 20px;
    display: flex;
    flex-direction: column;
    margin: 0 auto; /* Centraliza o formulário */
    background-color: #ffffff; /* Fundo branco */
    border-radius: 8px; /* Bordas arredondadas */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra */
    overflow-y: auto; /* Adiciona rolagem vertical, caso o conteúdo ultrapasse a altura máxima */
}

/* Container do form para garantir que ocupe a altura total disponível */
.container-pai {
    width: 100%; /* Largura total do contêiner pai */
    height: 100%; /* Altura total do contêiner pai */
    display: flex;
    flex-direction: column;
    align-items: center; /* Centraliza o conteúdo horizontalmente */
    justify-content: center; /* Centraliza o conteúdo verticalmente */
}

h2 {
    margin-bottom: 20px; /* Espaçamento abaixo do título */
    text-align: center; /* Centraliza o texto do título */
}

/* Formulário de cadastro de livros */
.book-form {
    width: 100%; /* O formulário vai ocupar 100% da largura disponível do contêiner pai */
    padding: 20px;
    display: flex;
    flex-direction: column;
    margin: 0 auto; /* Centraliza o formulário */
    background-color: #ffffff; /* Fundo branco */
    border-radius: 8px; /* Bordas arredondadas */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra */
    max-height: 900px; /* Altura máxima do formulário */
    overflow-y: auto; /* Adiciona rolagem vertical, caso o conteúdo ultrapasse a altura máxima */
}

/* Estilo dos grupos de formulário */
.form-group {
    display: flex;
    align-items: center;
    margin-bottom: 15px; /* Espaçamento entre os campos */
}

/* Container para a miniatura */
.thumbnail-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start; /* Alinha os itens à esquerda */
    margin-right: auto; /* Espaçamento à direita */
}

.thumbnail-container input[type="file"] {
    width: 100%; /* Largura total para o input */
    padding: 10px; /* Um pouco de padding */
    border: 1px solid #ccc; /* Borda */
    border-radius: 4px; /* Bordas arredondadas */
    margin-top: 10px; /* Espaçamento acima do input */
}

.thumbnail-preview {
    margin-top: 10px; /* Espaçamento acima da imagem */
    max-width: 200px; /* Largura máxima da imagem */
    max-height: 200px; /* Altura máxima da imagem */
    border: 1px solid #ccc; /* Borda para a imagem */
    border-radius: 4px; /* Bordas arredondadas */
}

.form-group label {
    font-weight: bold; /* Negrito para rótulos */
    padding-right: 15px; /* Espaçamento à direita do rótulo */
    width: 25%; /* Largura do rótulo */
    text-align: right; /* Alinha o texto à direita */
}

.form-group input,
.form-group textarea {
    flex: 1; /* Permite que os campos se expandam */
    padding: 8px; /* Espaçamento interno */
    font-size: 16px; /* Tamanho da fonte */
    border: 1px solid #ccc; /* Borda */
    border-radius: 4px; /* Bordas arredondadas */
}

/* Estilo do campo de descrição */
.form-group textarea {
    height: 100px; /* Altura fixa para o campo de descrição */
    overflow-y: auto; /* Adiciona scroll vertical se o texto exceder */
}

button[type="submit"] {
    padding: 12px 20px; /* Mantém o padding */
    background-color: #00334e; /* Cor de fundo */
    color: white; /* Cor do texto */
    border: none; /* Remove bordas */
    border-radius: 4px; /* Bordas arredondadas */
    cursor: pointer; /* Cursor de ponteiro */
    margin-top: 20px; /* Margem acima */
    display: block; /* Exibe como bloco */
    width: 50%; /* Define largura para 50% do contêiner pai */
    font-size: 16px; /* Tamanho da fonte */
    margin-left: auto; /* Centraliza horizontalmente */
    margin-right: auto; /* Centraliza horizontalmente */
}

button[type="submit"]:hover {
    background-color: #45a049; /* Cor ao passar o mouse */
}


/* Container de detalhes do livro */
.detalhes-container {
    display: flex; /* Alinha os itens em linha */
    align-items: stretch; /* Estica para a mesma altura */
    gap: 20px; /* Espaço entre imagem e tabela */
    background-color: #fff; /* Fundo branco */
    border-radius: 8px; /* Bordas arredondadas */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Sombra */
    padding: 20px; /* Padding interno */
    margin-top: 20px; /* Espaçamento acima da pré-visualização */
}

/* Miniatura do livro */
.book-thumbnail {
    width: 300px; /* Largura fixa para a imagem */
    max-width: 100%; /* Permite que a imagem seja responsiva */
    max-height: 400px; /* Limita a altura para não exceder o container */
    height: auto; /* Mantém a proporção */
    object-fit: contain; /* Ajusta a imagem para caber no contêiner sem cortar */
    border-radius: 8px; /* Bordas arredondadas */
    flex-shrink: 0; /* Evita que a imagem encolha */
}

/* Container dos detalhes */
.detalhes-livro {
    flex: 1; /* Permite que o container ocupe o espaço restante */
    display: flex;
    flex-direction: column; /* Alinha os itens na coluna */
    justify-content: space-between; /* Espaça os elementos verticalmente */
}

/* Tabela de detalhes */
table {
    width: 100%; /* Ocupa toda a largura disponível */
    height: 100%; /* Mantém a altura total */
    border-collapse: separate; /* Permite bordas arredondadas */
    border-spacing: 0; /* Remove espaços entre células */
    border-radius: 8px; /* Borda arredondada na tabela */
    overflow: hidden; /* Garante que o conteúdo respeite as bordas */
}

th, td {
    padding: 10px; /* Espaçamento interno */
    text-align: left; /* Alinhamento à esquerda */
    border-radius: 8px; /* Bordas arredondadas nas células */
    border: none; /* Remove as bordas */
}

th {
    background-color: #f0f0f0; /* Cor de fundo dos cabeçalhos */
    font-weight: bold; /* Negrito para os cabeçalhos */
}

/* Estilo específico para garantir que o texto tenha tamanho fixo */
textarea::placeholder {
    color: #aaa; /* Cor do texto placeholder */
}

.text-length-indicator {
    font-size: 12px; /* Tamanho do texto do indicador */
    color: #666; /* Cor do texto do indicador */
    margin-top: 5px; /* Espaçamento acima do indicador */
}

</style>
  