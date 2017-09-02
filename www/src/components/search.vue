<template>
<div id="search">
  <div class="container" style="margin-top: 8%;">
<div class="col-md-6 col-md-offset-3">
<div class="row">
<div id="logo" class="text-center">
  <a href="http://nodezoo.com" class="logo"><img src="http://nodezoo.com/img/logo80.png"></a>
<p>Search for <a href="http://nodejs.org">Node.js</a> modules.</p>
</div>
<div id="form-buscar">
<div class="form-group">
<div class="input-group">
<input id="1" class="form-control" type="text" name="search" v-model="query" v-on:click="clear" placeholder="Search..." autocomplete="off" required/>
<span class="input-group-btn">
<button type="submit" class="btn btn-success" v-on:click="search">
<i class="glyphicon glyphicon-search" aria-hidden="true"></i> Search
</button>
</span>
</div>
<span v-if="suggest.length > 0">
  <li class="suggest" v-for="item in suggest" v-on:click="suggested(item, $event)">
      <span>{{ item }}</span>
  </li>
</span>
</div>

  <resultssection :results="results"></resultssection>
</div>
</div>
</div>
</div>
</template>

<script>
import Results from './results.vue';
import axios from 'axios';

export default {
  components: {
    resultssection: Results
  },

  data() {
    return {
      query: '',
      results: '',
      suggest: ''
    }
  },
  watch: {
    query: function(newVal) {
      axios.get('/api/suggest?q=' + this.$data.query).then(response => {
        if (response.data.length != 0) {
          this.$data.suggest = response.data
        } else {
          this.$data.suggest = ''
        }
      }).catch(function(error) {
        console.log(error);
      });
    }
  },
  methods: {
    search() {
      this.$data.suggest = ''
      axios.get('api/query?q=' + this.$data.query).then(response => {
        this.$data.results = response.data.items
      }).catch(function(error) {
        console.log(error);
      });
    },
    suggested(item) {
      this.$data.query = item;
    },
    clear(){
      if(this.$data.results.length > 0){
        this.$data.results = ''
      }
    }
  }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

* {
  -webkit-border-radius: 1px !important;
     -moz-border-radius: 1px !important;
          border-radius: 1px !important;
}
#logo {
color: #666;
width:100%;
}
#logo h1 {
    font-size: 60px;
    text-shadow: 1px 2px 3px #999;
    font-family: Roboto, sans-serif;
    font-weight: 700;
    letter-spacing: -1px;
}
#logo p{
  padding-bottom: 20px;
}


#form-buscar >.form-group >.input-group > .form-control {
    height: 40px;
}
#form-buscar >.form-group >.input-group > .input-group-btn > .btn{
        height: 40px;
        font-size: 16px;
        font-weight: 300;


}
#form-buscar >.form-group >.input-group > .input-group-btn > .btn .glyphicon{
 margin-right:12px;
}


#form-buscar >.form-group >.input-group > .form-control {
    font-size: 16px;
    font-weight: 300;

}

#form-buscar >.form-group >.input-group > .form-control:focus {
  border-color: #33A444;
  outline: 0;
  -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 1px rgba(0, 109, 0, 0.8);
          box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 1px rgba(0, 109, 0, 0.8);
}
.btn-success{
  background-color: #7ab3bf;
}
.suggest{
  color: #7ab3bf;
  margin: 10px 0;
  font-size: 20px;
  text-align: center;
}
li {
  list-style: none;
}
</style>
