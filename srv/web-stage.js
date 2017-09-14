/* Copyright (c) 2014-2017 Richard Rodger and other contributors, MIT License */

var PORT = process.env.PORT || 9000

var Seneca = require('seneca')

var init_hapi = require('../web.js')
var browser = require('../node_modules/seneca-browser/browser.js')

Seneca({tag: 'web', legacy: {transport: false}})
  .test('print')

  .use(browser)
  .listen({type:'browser', pin:'role:web'})

  .use('zipkin-tracer', {host: 'zipkin', sampling: 1})
  .use('statsd', {host: 'stats'})

  .listen(PORT)

  .client({pin:'role:search', host:'search', port:PORT})
  .client({pin:'role:info', host:'info', port:PORT})
  .client({pin:'role:suggest', host:'suggest', port:PORT})


    .add('role:web,cmd:sug', function (msg, reply) {
      this.act('role:suggest,cmd:suggest',{query:msg.query,default$:[]},
              function(err,sug){
              reply(null,{sug})
        })
    })

    .add('role:web,cmd:query', function (msg, reply) {
      this.act({role:'search', cmd:'search', query:msg.query}, reply)
    })

    .add('role:web,cmd:info', function (msg, reply){
      this.act({role:'info',cmd:'get',name:msg.name},
        function (err, info) {
              if( err ) {
                info = {}
              }
              //reply({mod:'hi'})

              info.no_npm = !info.npm
              info.no_github = !info.github

              reply(info)
            })
    })

  .ready(function(){
    var server = init_hapi({seneca: this})

    this.log.info(server.info)
  })
