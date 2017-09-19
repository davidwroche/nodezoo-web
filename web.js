/* Copyright (c) 2014-2017 Richard Rodger and other contributors, MIT License */

var hapi       = require('hapi')
var vision     = require('vision')
var Inert      = require('inert')
//var handlebars = require('handlebars')


module.exports = function init_hapi(options) {
  var folder = options.folder || __dirname

  var server = new hapi.Server()
  server.connection({port: options.port || 8000})

  //server.register( vision )
  server.register( Inert )

  var seneca = options.seneca
  var browser_handler = seneca.export('browser/handler')

  server.route({
    method: 'POST', path: '/seneca',
    handler: function( request, reply ) {
      browser_handler(request.payload, reply)
    }
  })

  server.route({
    method: 'GET',
    path: '/{path*}',
    handler: {
      directory: {
        path: folder + "/www/",
      }
    }
  })

  server.start()

  return server
}
