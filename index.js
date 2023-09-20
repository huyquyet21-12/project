const express = require("express");//nhung express
const app = express();//goi function express ra
const methodOverride = require("method-override");
require("dotenv").config();
// goi file .env ra
const database = require("./config/database");
//nhung file database.js vao de su dung

database.connect();//goi ra file database.js

const systemConfig = require("./config/system");
//nhung file dc exports ra

const routes = require("./routes/client/index.route");
//nhung file thi phai ./truoc folder
//=>nhung routes cua ben client
const routesAdmin = require("./routes/admin/index.route");
//import tu ben index.route => routes = (app)


const port = process.env.PORT;



app.set("views", "./views");
//dung views => di vao thu muc views

app.set("view engine", "pug");
routes(app);
routesAdmin(app);

app.use(express.static("public"));
//dung de khoi tao va su dung file tinh~ public
// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// override with POST having ?_method=DELETE


//variable
app.locals.prefixAdmin = systemConfig.prefixAdmin;
//khai bao bien toan cuc de su dung o moi file

//end variable



app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
