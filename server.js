let express = require("express")
let axios = require("axios")
let bodyparser = require("body-Parser")

app = express()

app.use(bodyparser.urlencoded())

app.set('view engine', 'ejs');

const user_info = []
const final_list = []

app.get('/', function(req, res){
    var url = "https://jsonplaceholder.typicode.com/users";
    axios.get(url)
    .then((response)=>{
        let example = response.data
        length_of_json = Number(example.length)
        for (let i = 0; i < length_of_json; i++) { 
            name_of_user = example[i]["name"]
            city_of_user = example[i]["address"]["city"]
            users_company = example[i]["company"]["name"]

            user_var = {"name" : name_of_user, "city" : city_of_user, "company" : users_company}

            user_info.push(user_var)
        }
          res.render('pages/index',{})
        }
)})
   
app.post('/post', function(req, res){

  //console.log("checkedbox checked: " + check);
 for (let i = 0; i < 3; i++){
   random_number = Math.floor(Math.random()*10)
   string_to_add = user_info[random_number]
   final_list.push(string_to_add)
   }

   res.render('pages/index.ejs', {body: final_list})
  
  })



app.listen(8080)
console.log("Application is connected")
