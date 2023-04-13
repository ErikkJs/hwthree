// load the things we need
var express = require('express');
var app = express();
const bodyParser  = require('body-parser');

// required module to make calls to a REST API
const axios = require('axios');

app.use(bodyParser.urlencoded());

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page 
app.get('/', function(req, res) {
    //res.render("pages/index.ejs", {});
    res.render("pages/alias.ejs", {});
});


app.post('/process_form', function(req, res){
    var hero = req.body.hero;
    var url = "https://www.superheroapi.com/api.php/10221405381743383/search/" + hero;
    axios.get(url)
        .then((response)=>{
            let myHeroArray = response.data.results;
            let hero = myHeroArray[0];
            let aliases = hero.biography.aliases;
            
            res.render('pages/thanks.ejs', {
                aliases: aliases
            });
        });
  
  })

  app.post('/process_login', function(req, res){
    var user = req.body.username;
    var password = req.body.password;

    if(user === 'admin' && password === 'password')
    {
        res.render('pages/welcome.ejs', {
            user: user,
            auth: true
        });
    }
    else
    {
        res.render('pages/welcome.ejs', {
            user: 'UNAUTHORIZED',
            auth: false
        });
    }
  })



app.listen(8080);
console.log('8080 is the magic port');
