<template>
  <div class="container">
    <NavBar @toggle-sidebar="toggleSidebar" />
    <component :is="sidebarComponent" :isSidebarOpen="sidebarOpen" @toggle-sidebar="toggleSidebar" />
    <main>
      <!-- Container de boas-vindas -->
      <div class="welcome-container">
        <h2 class="welcome-title">Bem-vindo ao MangeBook!</h2>
        <p>Aqui você encontra todas as informações sobre nossos serviços, políticas e regras para não se perder.</p>
      </div>

      <!-- Container Pai -->
      <div class="main-container">
        <!-- Sobre o MangeBook -->
        <div class="content-container">
          <h2>Sobre o MangeBook</h2>
          <p>O MangeBook é uma plataforma dedicada a oferecer uma experiência única para os amantes de livros. Nosso objetivo é fornecer acesso fácil e rápido a uma vasta biblioteca de livros, com a possibilidade de empréstimos, trocas e muitas outras funcionalidades.</p>
          <p>Explore nossas seções de políticas de privacidade, termos de serviço e regras de empréstimos para entender como funciona a nossa plataforma e como garantir uma experiência segura e agradável para todos os nossos usuários.</p>
          <p>Se você tiver alguma dúvida ou precisar de assistência, nossa equipe de suporte está sempre pronta para ajudar. Não hesite em nos contatar através dos canais de atendimento disponíveis.</p>
        </div>

        <!-- Política de Privacidade -->
        <div class="content-container">
          <h2>Política de Privacidade</h2>
          <p>A privacidade de nossos usuários é extremamente importante para nós. No MangeBook, tomamos medidas rigorosas para proteger suas informações pessoais e garantir que sejam tratadas de forma segura e conforme a lei. Abaixo estão os principais pontos da nossa Política de Privacidade:</p>
          <ul>
            <li><strong>Informações Coletadas:</strong> Coletamos informações como nome, e-mail, dados de cadastro e informações de uso do site para personalizar a experiência do usuário.</li>
            <li><strong>Uso de Informações:</strong> As informações coletadas são usadas para oferecer melhores serviços, enviar notificações de atualizações e melhorar a plataforma.</li>
            <li><strong>Proteção de Dados:</strong> Utilizamos criptografia e outros métodos para proteger os dados dos usuários contra acesso não autorizado.</li>
            <li><strong>Compartilhamento de Informações:</strong> Não compartilhamos suas informações com terceiros, exceto quando necessário para cumprir a lei ou com sua permissão.</li>
            <li><strong>Cookies:</strong> Utilizamos cookies para melhorar a experiência de navegação e para analisar o uso do nosso site.</li>
            <li><strong>Alterações na Política:</strong> Podemos atualizar nossa Política de Privacidade periodicamente. As alterações serão informadas em nosso site.</li>
          </ul>
          <p>Se tiver dúvidas sobre nossa política de privacidade, entre em contato conosco.</p>
        </div>

        <!-- Termos de Serviço -->
        <div class="content-container">
          <h2>Termos de Serviço</h2>
          <p>Os Termos de Serviço do MangeBook descrevem as condições de uso de nossa plataforma e os direitos e deveres dos usuários ao interagir com nossos serviços. Ao utilizar o site, você concorda com os seguintes termos:</p>
          <ul>
            <li><strong>Cadastro e Conta:</strong> O usuário deve fornecer informações precisas ao se cadastrar no site e é responsável por manter a confidencialidade de sua conta.</li>
            <li><strong>Propriedade Intelectual:</strong> Todo o conteúdo do site, incluindo textos, imagens e designs, são propriedade do MangeBook e não podem ser reproduzidos sem permissão.</li>
            <li><strong>Uso Responsável:</strong> O usuário concorda em usar a plataforma de forma ética e não violar os direitos de outros usuários ou a legislação vigente.</li>
            <li><strong>Serviços de Empréstimos:</strong> O usuário pode solicitar empréstimos de livros dentro das condições e limitações estabelecidas pela plataforma.</li>
            <li><strong>Limitação de Responsabilidade:</strong> O MangeBook não se responsabiliza por danos diretos ou indiretos resultantes do uso da plataforma.</li>
            <li><strong>Rescisão:</strong> O MangeBook se reserva o direito de suspender ou encerrar a conta do usuário que violar os Termos de Serviço.</li>
          </ul>
          <p>Ao continuar usando nossos serviços, você aceita essas condições. Se tiver dúvidas ou precisar de esclarecimentos, entre em contato.</p>
        </div>

        <!-- Regras de Empréstimos -->
        <div class="content-container">
          <h2>Regras de Empréstimos</h2>
          <p>As regras de empréstimos do MangeBook são essenciais para garantir que nossos usuários possam usufruir de nossos serviços de maneira justa e eficiente. Ao solicitar um empréstimo, você concorda com as seguintes regras:</p>
          <ul>
            <li><strong>Cadastro e Identificação:</strong> Para solicitar um empréstimo, o usuário deve estar devidamente cadastrado na plataforma e fornecer informações de contato válidas.</li>
            <li><strong>Limite de Empréstimos:</strong> Cada usuário pode ter no máximo 3 livros emprestados ao mesmo tempo. O prazo de empréstimo é de 15 dias, podendo ser renovado conforme disponibilidade.</li>
            <li><strong>Condições do Livro:</strong> Os livros emprestados devem ser devolvidos em bom estado. Caso contrário, o usuário será responsável por danos ou perdas.</li>
            <li><strong>Renovação de Empréstimo:</strong> A renovação do empréstimo depende da disponibilidade do livro e da solicitação do usuário antes do vencimento do prazo.</li>
            <li><strong>Devolução:</strong> O livro deve ser devolvido no prazo estabelecido. Caso contrário, o usuário poderá ser penalizado com a suspensão temporária de seus direitos de empréstimo.</li>
            <li><strong>Reserva de Livros:</strong> Caso o livro desejado esteja emprestado, o usuário pode fazer uma reserva para ser notificado quando o livro estiver disponível novamente.</li>
          </ul>
          <p>Essas regras garantem o bom funcionamento dos serviços de empréstimo e a equidade para todos os usuários. Em caso de dúvidas, entre em contato com nossa equipe.</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import SideBar from '@/components/SideBar.vue';
import AdmSideBar from '@/components/adm_SideBar.vue';

export default {
  components: {
    NavBar,
    SideBar,
    AdmSideBar
  },

  data() {
    return {
      sidebarOpen: false,
    };
  },

  computed: {
    sidebarComponent() {
      // Verifica o tipo de usuário no localStorage e seleciona a Sidebar adequada
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.role === 'admin') {
        return 'AdmSideBar'; // Sidebar de administrador
      }
      return 'SideBar'; // Sidebar padrão de usuário
    }
  },

  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;  // Alterna o estado da Sidebar
    },
  }
};
</script>


<style scoped>
/* Reset de estilo básico */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, sans-serif; /* Fonte padrão */
}

/* Container principal (main) */
main {
  width: 90%; /* Utiliza 90% da largura da tela para espaçamentos laterais */
  max-width: 1000px; /* Largura reduzida para 1000px */
  margin: 50px auto; /* Centraliza o conteúdo com margem superior e inferior */
  padding: 20px; /* Espaçamento interno */
  box-sizing: border-box; /* Garante que o padding não afete a largura */
}

/* Seção de Boas-vindas */
.welcome-container {
  background-color: #fff;
  padding: 20px;
  text-align: center;
  margin: 30px auto 30px auto; /* Margem superior de 30px */
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15); /* Box-shadow levemente reduzido */
  width: 100%; /* Garante que ocupe 100% da largura disponível */
  max-width: 1000px; /* Mesma largura máxima que o main */
  box-sizing: border-box; /* Garante que padding não afete a largura */
}

/* Título e parágrafo da seção de boas-vindas */
.welcome-title {
  font-size: 28px;
  margin-bottom: 10px;
  color: #00334e;
}

.welcome-container p {
  font-size: 16px;
  color: #333;
}

/* Seção de Conteúdo */
.main-container {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2); /* Aumenta a sombra superior */
  margin-top: 50px; /* Reduz o espaçamento superior */
  width: 100%; /* Garante que ocupe 100% da largura disponível */
  max-width: 1000px; /* Mesma largura máxima que o main e o welcome-container */
  box-sizing: border-box; /* Garante que padding não afete a largura */
}

/* Containers de conteúdo */
.content-container {
  max-width: 800px; /* Largura reduzida para 800px */
  margin: 0 auto 30px auto; /* Centraliza e dá espaçamento inferior */
  width: 100%; /* Garante que ocupe 100% da largura disponível */
}

/* Títulos e parágrafos dos containers de conteúdo */
.content-container h2 {
  font-size: 24px;
  margin-bottom: 10px;
  color: #00334e;
  margin-top: 50px; /* Adiciona o espaçamento superior para os títulos */
  text-align: center; /* Centraliza os títulos */
}

.content-container p {
  font-size: 16px;
  color: #333;
  line-height: 1.6;
  text-align: justify; /* Justifica o texto dos parágrafos */
}

/* Listas dentro das seções */
.content-container ul {
  text-align: justify; /* Justifica o texto das listas */
  margin-top: 20px;
  line-height: 1.8;
}
</style>

