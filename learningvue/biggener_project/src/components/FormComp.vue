<template>
  <div class="backdrop" @click.self="toggleForm">
    <div class="form">
      <h1>{{ formTitle }}</h1>
      <label for="username">Username : </label>
      <input type="text" id="username" name="username" required />
      <br /><br /><br />
      <label for="pwd">Password : </label>
      <input type="password" id="pwd" name="pwd" />
      <br /><br /><br />
      <label>Select Tags :) </label>
      <select name="Tags" id="Tags" multiple>
        <option :value="tag" v-for="tag in tags">{{ tag }}</option>
      </select>
      <br /><br /><br />
      <button @click="toggleForm">Submit</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["formTitle", "tags"],
  methods: {
    toggleForm() {
      this.$emit('close')
    }
  }
};
</script>


<style>
.backdrop {
  background: rgb(243, 171, 171);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  position: fixed;
}

.form {
  text-align: center;
  margin: 10px;
  height: 400px;
  width: 600px;
  background: rgb(212, 239, 179);
}
</style>