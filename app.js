const express = require('express');
const app = express();
const port = 3000

app.set('view engine', 'ejs');
app.set('views', './views');

app.use("/public", express.static(__dirname + "/public"));

app.get('/HomePage', (req, res) => {
    res.render('HomePage.ejs');
})

app.get('/User', (req, res) => {
  res.render('FormUserProfile.ejs');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})