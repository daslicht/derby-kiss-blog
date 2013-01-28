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
    model.subscribe('blogs', function(err, blogs) {

        model.ref( "_blogs", blogs)     

        var uuid = derby.uuid();
        var blog = [{
                  id       : uuid,
                  headline :'This is the first headline',
                  details  :'this is the first blog post' 
                }];
        model.set('blogs', blog);
       // model.set('blogs.' + blog.id, blog);
        model.push('blogs',blog);

        page.render('home',{
            navItems  : navItems,
            some_content   : "Welcome to the homepage"
        })
    })
});

  //get blogs hash
       // console.log('blogs hash:',model.get('_blogs'))

        //get blogs array
        //var arr = model.filter('_blogs').get();
        //console.log('blogs array:',arr);
   /* {"bea9ddab-4d11-4920-8825-7357604045b3":

        {   
            "headline":"This is the second headline",
            "details":"this is the second blog post",
            "id":"bea9ddab-4d11-4920-8825-7357604045b3"
        },
    "facade73-e95e-44b5-bb91-3d4a5845afe8":
        {
            "headline":"This is the first headline",
            "details":"this is the first blog post",
            "id":"facade73-e95e-44b5-bb91-3d4a5845afe8"
        }
    }*/



// CONTROLLER FUNCTIONS //

ready(function(model) {
    
  
    exports.newHeadline = function (e, el, next) {
        console.log('newHeadline', model.get('_inputvalue'));
        /*var uuid = derby.uuid();
        var blog = { id       : uuid,
                  headline :'This is the first headline',
                  details  :'this is the first blog post' 
                };
        model.set('blogs.' + blog.id, blog);*/
       
       //console.log("create new Headline!",newItem);
      /* model.push( '_headlines', newItem, function(data){
          console.log("created new Headline!",newItem);
        } )*/
        
    }


})
