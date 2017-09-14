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
    info: false,
    layout1: true
  },
  watch: {
    query() {

      seneca.act({
        role: 'web',
        cmd: 'sug',
        query: this.$data.query
      }, function(err, result) {
        if (result) {
          seneca.act({
            omar: 'suggestions',
            suggestions: result.sug
          })
        }
      })
    }
  },

  methods: {
    search() {
      var self = this;
      seneca.act({
        role: 'web',
        cmd: 'query',
        query: this.$data.query
      }, function(err, out) {
        console.log(out)
        if (out.items.length != 0) {
          seneca.act({
            ann: 'results',
            results: out.items
          });
        }else{
          seneca.act({
            noel: 'no_matches_found',
            matches: self.query
          })
        }
      })
    },
    clear() {
      seneca.act({
        claire: 'clear_results',
        results: ''
      })
    },
    layout() {
      this.layout1 = false;
      vm2.$data.layout2 = false;
      vm3.$data.layout3 = false;
      vm4.$data.layout4 = true;
    },
    revertLayout() {
      this.layout1 = true;
      vm2.$data.layout2 = true;
      vm3.$data.layout3 = true;
      vm4.$data.layout4 = false;
    },
  }
})

// Start of Results Vue Instance
var vm2 = new Vue({
  el: '#results',
  data: {
    matches: false,
    nomatch: '',
    results: '',
    layout2: true
  },
  methods: {
    moduleInfo(item) {
      var self = this;
      seneca.act({
        role: 'web',
        cmd: 'info',
        name: item
      }, function(err, mod) {
        if (mod) {
          seneca.act({
            ian: 'get_info',
            name: mod
          });
        }
      });
      vm1.layout1 = false;
      this.$data.layout2 = false;
      vm3.$data.layout3 = false;
      vm4.$data.layout4 = true;
    },
  },
  beforeCreate: function() {
    var self = this

    seneca
      .add('ann:results', function(msg, reply) {
        self.results = msg.results
        self.results.forEach(function(item) {
          if (!item.hasOwnProperty(item.giturl)) {
            item.npmurl = "http://npmjs.com/package/" + item.name.toString()
            item.namelink = item.npmurl
          }

          if ('giturl' in item) {
            if (item.giturl.startsWith('git://')) {
              var x = item.giturl.replace('git://', 'http://')
              item.giturl = x
              item.namelink = item.giturl
            }
            if (item.giturl.startsWith('git+')) {
              var y = item.giturl.replace('git+', '')
              item.giturl = y
              item.namelink = item.giturl
            }
          } else {
            item.npmurl = "http://npmjs.com/package/" + item.name.toString()
            item.namelink = item.npmurl
          }
        })
        reply()
      })
      .add('claire:clear_results', function(msg, reply) {
        self.results = msg.results
        self.matches = false
        reply()
      })
      .add('noel:no_matches_found', function(msg, reply) {
        self.nomatch = msg.matches
        self.matches = true
        reply()
      })
  },
})



// Start of Suggest Vue Instance
var vm3 = new Vue({
  el: '#suggest',
  data: {
    suggest: '',
    layout3: true
  },
  beforeCreate: function() {
    var self = this;
    seneca
      .add('omar:suggestions', function(msg, reply) {
        self.suggest = msg.suggestions
        var list = document.getElementById('suggestlist');
        document.getElementById('suggestlist').innerHTML = '';
        self.suggest.forEach(function(item) {
          var option = document.createElement('option');
          option.value = item;
          list.appendChild(option);
        });
        reply()
      })
  }
})


// Start of Info Vue Instance
var vm4 = new Vue({
  el: '#info',
  data: {
    npm: '',
    github: '',
    name: '',
    information: '',
    layout4: false,
    error: false,
    nomatch:''
  },
  methods: {
    getInfo() {
      seneca.act({
        role: 'web',
        cmd: 'info',
        name: this.$data.name
      }, function(err, mod) {
        if (mod) {
          seneca.act({
            ian: 'get_info',
            name: mod
          });
        }
      });
    },
  },
  beforeCreate: function() {
    var self = this;
    seneca
      .add('ian:get_info', function(msg, reply) {
        console.log(msg)
        if(msg.name.no_github == true && msg.name.no_npm == false){
          if(Object.keys(msg.name.npm).length == 3){
            self.npm = ''
            self.github = ''
            self.error = true
            self.nomatch = msg.name.npm.id
          }else{
            self.error = false
            self.github = msg.name.github
            self.npm = msg.name.npm
          }
        }else if(msg.name.no_github == true && msg.name.no_npm == true){
          self.npm = ''
          self.nomatch = ''
          self.error = true
          self.github = ''
        }else{
          self.error = false
          self.github = msg.name.github
          self.npm = msg.name.npm
        }
        reply()
      })
  }
})
