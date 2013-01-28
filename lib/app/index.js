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
    
    model.subscribe('blog.entry', function(err, headlines) {
    //  headlines.set("mytest","test");
     // model.ref( "_headlines", headlines)
     headlines.setNull('blog.entry',[ 
          {
              content:'very important topic, new'
          },
          {
              content:'even more very important topic'
          }
      ])

     /*
     created this structure:
      { "_id"  : "entry",
        "blog" : { "entry" : [ 
                     { "content" : "very important topic, new" }, 
                     { "content" : "even more very important topic" } 
                  ]}
      }

      */




       
        model.ref('_headlines', headlines)
        
        console.log('!!! headlines:',model.get('_headlines'));
        page.render('home',{
            navItems  : navItems,
            content   : "Welcome to the homepage"

        })
    })
});






// CONTROLLER FUNCTIONS //

ready(function(model) {
    
    /*This will create a mongo document with no name!*/ 
    //model.set('blog.headlines',[ 
    //     {
    //         content:'very important topic'
    //     },
    //     {
    //         content:'even more very important topic'
    //     }
    // ])

    exports.newHeadline = function (e, el, next) {
        var newItem=
        {
          //how can I transfer data from the template 
          //without that they get persisted?
            content: model.get('_headlines.name')
        };
       
       //console.log("create new Headline!",newItem);
       model.push( '_headlines', newItem, function(data){
          console.log("created new Headline!",newItem);
        } )
        
    }


})
