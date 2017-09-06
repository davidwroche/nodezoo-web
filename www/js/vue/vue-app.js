var seneca = Seneca()
  .test('print')
  .client({
    type: 'browser',
    pin: 'role:web'
  })


// Start of Search Vue Instance
var vm1 = new Vue({
  el: '#search',
  data: {
    query: '',
  },
  watch: {
    query() {
      seneca.act({
        role: 'web',
        cmd: 'query',
        query: this.$data.query
      }, function(err, out) {
        if (out && out.items) {
          seneca.act({
            ann: 'results',
            results: out.items
          })
        }
      })
    },

    /*
    xquery: function(newVal) {
      axios.get('/api/query?q=' + this.$data.query).then(response => {
        vm2.results = response.data.items
      }).catch(function(error) {
        console.log(error);
      });

      axios.get('/api/suggest?q=' + this.$data.query).then(response => {
        var list = document.getElementById('suggestlist');
        document.getElementById('suggestlist').innerHTML = '';
        response.data.forEach(function(item){
        var option = document.createElement('option');
        option.value = item;
        list.appendChild(option);
      });
      }).catch(function(error) {
        console.log(error);
      });
    }
    */
  },
  methods: {
    search() {
      this.$data.suggest = ''
      /*
            axios.get('api/query?q=' + this.$data.query).then(response => {
              console.log(response.data.items)
              vm2.results = response.data.items
            }).catch(function(error) {
              console.log(error);
            });
      */
    },
    suggested(item) {
      this.$data.query = item;
    },
    clear() {
      if (vm2.results.length > 0) {
        vm2.results = ''
      }
    }
  }
})

// Start of Results Vue Instance
var vm2 = new Vue({
  el: '#results',
  data: {
    results: ''
  },
  beforeCreate: function() {
    var self = this

    seneca
      .add('ann:results', function(msg, reply) {
        self.results = msg.results
        reply()
      })
  },
  methods: {

  }
})



// Start of Suggest Vue Instance
var vm3 = new Vue({
  el: '#suggest',
  data: {}
})
