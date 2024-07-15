const express = require("express");
const {db} = require('./config/database')
const passport = require("passport")
const session = require("express-session") 
const adminrouter = require("./routers/admin_router");
const path = require('path');
const { localAuth } = require("./middleware/middleware");
const { catRouter } = require("./routers/category.router");
const { SubcatRouter } = require("./routers/subCategory.router");
const { extracatRouter } = require("./routers/ExtraCat.router");
const flash = require('connect-flash');
const productRouter = require("./routers/product.router");

const app = express();

app.use(express.urlencoded({extended: true}));

app.use(session({secret:'private-key'}));

app.use(passport.initialize());

app.use(passport.session());

localAuth(passport);

app.set("view engine", "ejs");

app.use("/uploads", express.static("uploads"));

app.use(express.static(path.join(__dirname,"public")));

app.use(express.json());

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

app.use(flash())

app.use('/product',productRouter)
app.use('/category', catRouter)
app.use('/Subcategory', SubcatRouter)
app.use('/extra', extracatRouter)

app.use(adminrouter)

app.listen(8088, (err) => {
  db();
  if (!err) {
    console.log("http://localhost:8088");
  }
});