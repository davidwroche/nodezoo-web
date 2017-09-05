<template>
<div id="third">
<div v-for="item in results">
  <div class="panel panel-info">
      <div class="panel-heading"><a :href="item.giturl">{{ item.name }}</a></div>
      <div class="panel-body">
        {{ item.version }}
        <br>
        {{ item.desc }}
      </div>
    </div>
</div>
</div>
</template>

<script>
export default {

   props:['results'],

  data() {
    return {
      results: ''
    }
  },


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
