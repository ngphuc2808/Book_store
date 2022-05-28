// Import lib
const express = require('express');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/public', express.static(__dirname + '/public'));

// Engine HBS
app.engine('hbs', engine({ 
  extname: '.hbs', 
  defaultLayout: "Main",
  layoutsDir: 'views/layouts',
  partialsDir: 'views/partials'
}));

app.set('view engine', 'hbs');

// DB
dotenv.config();
mongoose.connect(process.env.MONGODB_URL,(err) => {
    if(!err) console.log('Kết nối thành công');
});

// Router
const adminRouter = require('./routes/Admin.route');
app.use('/admin', adminRouter);

const homePageRouter = require('./routes/HomePage.route');
app.use('/', homePageRouter);

const categoriesRouter = require('./routes/Categories.route');
app.use('/danh-muc-san-pham', categoriesRouter);

const basketRouter = require('./routes/Basket.route');
app.use('/gio-hang', basketRouter);

const productRouter = require('./routes/Product.route');
app.use('/thong-tin-san-pham', productRouter);

const listFavoriteRouter = require('./routes/ListFavorite.route');
app.use('/danh-sach-yeu-thich', listFavoriteRouter);

const userRouter = require('./routes/User.route');
app.use('/thong-tin-ca-nhan', userRouter);

const orderRouter = require('./routes/Order.route');
app.use('/trang-dat-hang', orderRouter);

// Run host
const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})