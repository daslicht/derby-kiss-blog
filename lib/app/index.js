var derby = require('derby')
  , app = derby.createApp(module)
  , get = app.get
  , view = app.view
  , ready = app.ready
  , start = +new Date()

derby.use(require('../../ui'))


navItems =[
    { title: 'Home', link: '/' },
    { title: 'About', link: '/about' },
    { title: 'Contact us', link: '/contact' }
]

// ROUTES //

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

  
get('/', function(page, model, params){
    
    model.subscribe('blog.headlines', function(err, headlines) {
        model.ref('_headlines', headlines)
        model.setNull('blog.headlines',[ 
            {
                content:'very important topic'
            },
            {
                content:'even more very important topic'
            }
        ])
        console.log(model.get('_headlines'));
        page.render('home',{
            navItems  : navItems,
            content   : "Welcome to the homepage"

        })
    })
});






// CONTROLLER FUNCTIONS //

ready(function(model) {

    exports.newHeadline = function (e, el, next) {
        var newItem=
        {
            content: model.get('_headlines.name')
        };
       
       //console.log("create new Headline!",newItem);
       model.push( '_headlines', newItem, function(data){
          console.log("created new Headline!",newItem);
        } )
        
    }


})
