<template>
  <div class="container">
    <NavBar />
    <SideBar />
    <MainContent />
    <Footer />
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";
import MainContent from "@/components/MainContent.vue";
import NavBar from "@/components/NavBar.vue";
import SideBar from "@/components/SideBar.vue";

export default {
  components: {
    NavBar,
    SideBar,
    MainContent,
    Footer
  },

  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    toggleDropdown(menu) {
      this.dropdown[menu] = !this.dropdown[menu];
    },
    changePage(direction) {
      if (direction === 'prev' && this.currentPage > 1) {
        this.currentPage--;
      } else if (direction === 'next') {
        this.currentPage++;
      }
    }
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

</style>
