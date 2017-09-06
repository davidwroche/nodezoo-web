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
            omar: 'suggestions',
            suggestions: out.items
          })
        }
      })
    }
  },

  methods: {
    search() {

      seneca.act({
        role: 'web',
        cmd: 'query',
        query: this.$data.query
      }, function(err, out) {
        if (out && out.items) {
          seneca.act({
            ann: 'results',
            results: out.items
          });
        }
      })
    },
    clear() {
      seneca.act({
        claire: 'clear_results',
        results: ''
      })
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
      .add('claire:clear_results', function(msg, reply) {
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
  data: {
    suggest: ''
  },
  beforeCreate: function() {
    var self = this;
    seneca
      .add('omar:suggestions', function(msg, reply) {
        self.suggest = msg.suggestions
        console.log(self.suggest)
        reply()
          var list = document.getElementById('suggestlist');
          document.getElementById('suggestlist').innerHTML = '';
          self.suggest.forEach(function(item){
          console.log(item)
          var option = document.createElement('option');
          option.value = item.name;
          list.appendChild(option);
        });
      })
  }
})
