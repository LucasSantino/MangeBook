<template>
  <div id="app">
    <Navbar />
    <router-view></router-view> <!-- Renderiza o componente da rota ativa -->
    <Footer /> <!-- Adicione o componente Footer aqui -->
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'; // Ajuste o caminho se necessário
import Footer from './components/Footer.vue'; // Importe o Footer

export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
  },
};
</script>

<style>
nav {
  margin-bottom: 20px;
}
</style>
