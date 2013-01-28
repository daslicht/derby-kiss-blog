var derby = require('derby')
  , app = derby.createApp(module)
  , get = app.get
  , view = app.view
  , ready = app.ready
  , start = +new Date()

derby.use(require('../../ui'))



// ROUTES //

// Derby routes can be rendered on the client and the server
get('/room/:roomName?', function(page, model, params) {
  console.log('PAGE: ',page);
  var roomName = params.roomName || 'home'

  // Subscribes the model to any updates on this room's object. Calls back
  // with a scoped model equivalent to:
  //   room = model.at('rooms.' + roomName)
  model.subscribe('rooms.' + roomName, function(err, room) {
    model.ref('_room', room)

    // setNull will set a value if the object is currently null or undefined
    room.setNull('welcome', 'Welcome to ' + roomName + '!')

    room.incr('visits')

    // This value is set for when the page initially renders
    model.set('_timer', '0.0')
    // Reset the counter when visiting a new route client-side
    start = +new Date()

    // Render will use the model data as well as an optional context object
     page.render({
      navItems: [
        { title: 'Home', link: '/' },
        { title: 'About', link: '/about' },
        { title: 'Contact us', link: '/contact' }
      ],
      roomName: roomName,
     randomUrl: parseInt(Math.random() * 1e9).toString(36)
    })


  })
})

navItems =[
    { title: 'Home', link: '/' },
    { title: 'About', link: '/about' },
    { title: 'Contact us', link: '/contact' }
]




    /*
     cray0000
     * mongo accepts primitive types only on it's third part of path
     first two must be object
     * */
    

get('/', function(page, model, params){
    model.ref('_headlines', headlines)
    var blogModel=  store.createModel();
        blogModel.setNull('blog.headlines',[
            {
                id:'1',
                content:'very important topic'
            },
            {
                id:'2',
                content:'even more very important topic'
            }
        ])
    model.subscribe('blog.headlines', function(err, headlines) {
        

        page.render('home',{
            navItems  : navItems,
            content   : "Welcome to the homepage"

        })
    })
});


get('/about', function(page, model, params){

    page.render('about',{
        navItems: navItems,
        content : "About Us"
    })
});


get('/contact', function(page, model, params){

    page.render('contact',{
        navItems: navItems,
        content : "contact content"
    })
});



// CONTROLLER FUNCTIONS //

ready(function(model) {

    exports.newHeadline = function (e, el, next) {
        var newItem=
        {
            id:'2',
            content: model.get('_headlines.name')
        };
         //console.log("create new Headline!",newItem);

       // This throws an error:
       // Uncaught TypeError: [object Object] is not an Array  
       //  why ?
       model.push( '_headlines', newItem, function(data){
          console.log("create new Headline!",newItem);
        } )
        

    }


  var timer

  // Functions on the app can be bound to DOM events using the "x-bind"
  // attribute in a template.
  this.stop = function() {
    // Any path name that starts with an underscore is private to the current
    // client. Nothing set under a private path is synced back to the server.
    model.set('_stopped', true)
    clearInterval(timer)
  }

  this.start = function() {
    model.set('_stopped', false)
    timer = setInterval(function() {
      model.set('_timer', (((+new Date()) - start) / 1000).toFixed(1))
    }, 100)
  }
  this.start()

})
