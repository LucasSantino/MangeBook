<template>
  <div class="book-card">
    <a :href="book.detailsLink">
      <img :src="book.image" :alt="book.title" class="book-image" />
      <h5 class="book-title">{{ book.title }}</h5>
      <p class="book-author"><strong>Autor:</strong> {{ book.author }}</p>
      <p class="book-availability"><strong>Disponibilidade:</strong> {{ book.availability }}</p>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    // Propriedades recebidas do componente pai (MainContent.vue)
    book: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
/* Estilos específicos para o card de livros */
.book-card {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.2s ease-in-out;
}

.book-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

.book-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 10px;
}

.book-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.book-author,
.book-availability {
  font-size: 14px;
  color: #666;
}
</style>
