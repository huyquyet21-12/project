const express = require("express");//nhung express
const app = express();//goi function express ra
const systemConfig = require("./config/system");
const methodOverride = require("method-override");
const bodyParser = require('body-parser');
const flash = require('express-flash');
const cookieParser = require("cookie-parser");
const session = require("express-session");
//phai ghi de methodOverride truoc routes
app.use(methodOverride("_method"));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
require("dotenv").config();
// goi file .env ra
const database = require("./config/database");
//nhung file database.js vao de su dung

database.connect();//goi ra file database.js



const routes = require("./routes/client/index.route");
//nhung file thi phai ./truoc folder
//=>nhung routes cua ben client
const routesAdmin = require("./routes/admin/index.route");
//import tu ben index.route => routes = (app)


const port = process.env.PORT;



app.set("views", `${__dirname}/views`);
//dung views => di vao thu muc views

app.set("view engine", "pug");
app.use(cookieParser("1m74"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
app.use(express.static(`${__dirname}/public`));
//dung de khoi tao va su dung file tinh~ public
// override with POST having ?_method=DELETE
routes(app);
routesAdmin(app);
// override with POST having ?_method=DELETE


//variable
app.locals.prefixAdmin = systemConfig.prefixAdmin;
//khai bao bien toan cuc de su dung o moi file

//end variable



app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
