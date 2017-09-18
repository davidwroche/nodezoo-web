/* Copyright (c) 2014-2017 Richard Rodger and other contributors, MIT License */

var Seneca = require('seneca')


// Build the frontend server using the hapi framework.
var app = require('../web.js')


Seneca({tag: 'web', legacy: {transport: false}})
  //.test()
  .test('print')
  .use('monitor')

  .use('browser')
  .listen({type:'browser', pin:'role:web'})

  .use('mesh')
  .use('seneca-repl', {port:10010})

  .client({pin:'role:search'})
  .client({pin:'role:info'})
  .client({pin:'role:suggest'})

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
    var server = app({seneca: this})

    this.log.info(server.info)
  })
