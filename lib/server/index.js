var http = require('http')
  , path = require('path')
  , express = require('express')
  , gzippo = require('gzippo')
  , derby = require('derby')
  , app = require('../app')
  , serverError = require('./serverError')

derby.use(require('racer-db-mongo'));




// SERVER CONFIGURATION //

var expressApp = express()
  , server = module.exports = http.createServer(expressApp)

derby.use(derby.logPlugin)
//var store = derby.createStore({listen: server})

store = derby.createStore({
  db: {
    type: 'Mongo',
    uri: 'mongodb://localhost/derby-kiss-blog'
  },
  listen: server
});


/*app.createStore({
  listen  :  server
  , db    :  {type: 'Mongo', uri: 'mongodb://localhost/derby-kiss-blog'}
});*/

var ONE_YEAR = 1000 * 60 * 60 * 24 * 365
  , root = path.dirname(path.dirname(__dirname))
  , publicPath = path.join(root, 'public')



expressApp
  .use(express.favicon())
  // Gzip static files and serve from memory
  .use(gzippo.staticGzip(publicPath, {maxAge: ONE_YEAR}))
  // Gzip dynamically rendered content
  .use(express.compress())

  // Uncomment to add form data parsing support
  .use(express.bodyParser())
  .use(express.methodOverride())

  //Uncomment and supply secret to add Derby session handling
  //Derby session middleware creates req.model and subscribes to _session
  .use(express.cookieParser())
  .use(store.sessionMiddleware({
     secret: process.env.SESSION_SECRET || 'MY SECRET HERE'
  , cookie: {maxAge: ONE_YEAR}
  }))

  // Adds req.getModel method
  .use(store.modelMiddleware())
  // Creates an express middleware from the app's routes
  .use(app.router())
  .use(expressApp.router)
  .use(serverError(root))









// var blogModel=  store.createModel();
//     /*
//      cray0000
//      * mongo accepts primitive types only on it's third part of path
//      first two must be object
//      * */
//     blogModel.setNull('blog.headlines',[
//         {
//             id:'1',
//             content:'very important topic'
//         },
//         {
//             id:'2',
//             content:'even more very important topic'
//         }
//     ])

//module.exports = function(store) {
//    store.writeAccess("*", "users.*.balance", function(id, newBalance, next) {
//        var isServer, purchasingSomethingOnClient;
//        if (!(this.session && this.session.userId)) {
//            return;
//        }
//        purchasingSomethingOnClient = newBalance < this.session.req._racerModel.get("users." + id + ".balance");
//        isServer = !this.req.socket;
//        return next(purchasingSomethingOnClient || isServer);
//    });
//    return store.writeAccess("*", "users.*.flags.ads", function() {
//        var isServer, next;
//        if (!(this.session && this.session.userId)) {
//            return;
//        }
//        next = arguments[arguments.length - 1];
//        isServer = !this.req.socket;
//        return next(isServer);
//    });
//};


// SERVER ONLY ROUTES //

expressApp.all('*', function(req) {
  throw '404: ' + req.url
})
