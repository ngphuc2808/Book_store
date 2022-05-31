// Import lib
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/public', express.static(__dirname + '/public'));

//Middleware
require('./middlewares/BodyParser.middleware')(app);
require('./middlewares/Session.middleware')(app);
require('./middlewares/View.middleware')(app);
require('./middlewares/Local.middleware')(app);

// DB
dotenv.config();
mongoose.connect(process.env.MONGODB_URL,(err) => {
    if(!err) console.log('Kết nối thành công');
});

// Router
const adminRouter = require('./routes/Admin.route');
app.use('/admin', adminRouter);

const authRouter = require('./routes/Auth.route');
app.use(authRouter);

const userRouter = require('./routes/User.route');
app.use('/thong-tin-ca-nhan', userRouter);

const homePageRouter = require('./routes/HomePage.route');
app.use('/trang-chu', homePageRouter);

const categoriesRouter = require('./routes/Categories.route');
app.use('/danh-muc-san-pham', categoriesRouter);

const basketRouter = require('./routes/Basket.route');
app.use('/gio-hang', basketRouter);

const productRouter = require('./routes/Product.route');
app.use('/thong-tin-san-pham', productRouter);

const listFavoriteRouter = require('./routes/ListFavorite.route');
app.use('/danh-sach-yeu-thich', listFavoriteRouter);


const orderRouter = require('./routes/Order.route');
app.use('/trang-dat-hang', orderRouter);

// Run host
const port = 9000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})