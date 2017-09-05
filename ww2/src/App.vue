<template>
<div class="container">
  <div class="row">
    <div class="header">
      <searchsection></searchsection>
    </div>
  </div>
</div>
</template>

<script>
import Search from './components/search.vue';

export default {
  components: {
    searchsection: Search,
  }
}

</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Pacifico);

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
h1{
  font-family: 'Pacifico', cursive;
}
</style>
