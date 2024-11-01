<template>
    <div class="book-card">
      <router-link :to="link">
        <img :src="image" :alt="title" class="book-image">
        <h5>{{ title }}</h5>
        <h5>Autor: {{ author }}</h5>
        <h5>Disponibilidade: {{ availability }}</h5>
      </router-link>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: String,
      author: String,
      availability: String,
      image: String,
      link: String,
    },
  };
  </script>
  
  <style scoped>
  .book-card {
      background-color: #f0f0f0;
      padding: 15px;
      border-radius: 5px;
      width: 140px;
      height: 220px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      text-align: center;
  }
  .book-card a {
      text-decoration: none;
      color: inherit;
  }
  .book-image {
      width: 100%;
      height: 150px;
      object-fit: cover;
      border-radius: 5px;
  }
  </style>
  