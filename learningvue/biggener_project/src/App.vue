<template>
  <h1>{{ title }}</h1>
  <Nav @open="showForm = true" />
  <br /><br /><br />
  <div v-if="showForm">
    <FormComp :formTitle="formTitle" :tags="tags" @close="toggleForm" />
  </div>
  <br /><br /><br />
  <AnimeList />
</template >
  
<script>
import Nav from "./components/Nav.vue";
import FormComp from "./components/FormComp.vue";
import AnimeList from "./components/AnimeList.vue";
export default {
  name: "App", data() {
    return {
      title: "Anime Collection", formTitle: "Sign in watch and have fun :)", tags: ["Action", "Emotion", "Drama"
        , "Inteligence", "Romance"], showForm: false
    };
  }, components: { FormComp, Nav, AnimeList },
  methods: {
    toggleForm() {
      this.showForm = !this.showForm;
    }
  }
}; </script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
