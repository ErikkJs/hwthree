let express = require('express');
let axios = require('axios');
let bodyparser = require('body-parser');

const app = express();

app.use(bodyparser.urlencoded());

app.set('view engine', 'ejs');

const final_list = [];

app.get('/', function (req, res) {
  let url = 'https://jsonplaceholder.typicode.com/users';
  const user_info = [];

  axios.get(url).then(response => {
    let data = response.data;
    console.log(data);
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomUser = data[randomIndex];
      user_info.push({
        name: randomUser.name,
        city: randomUser.address.city,
        company: randomUser.company.name,
      });
    }

    console.log(user_info);
    res.render('pages/index', {
      user_info,
    });
  });
});

app.post('/', function (req, res) {
  for (let i = 0; i < 3; i++) {
    let random_number = Math.floor(Math.random() * 10);
    let string_to_add = user_info[random_number];
    final_list.push(string_to_add);
  }

  res.render('pages/index.ejs', {body: final_list});
});

app.listen(8080);
console.log('Application is connected to port 8080');
console.log('http://localhost:8080/');
