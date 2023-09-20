//tao 1 ham de goi router => tra ra nhung router
// roi nhung ben index.js
const productRoutes = require("./products.route");
//nhung file products.route.js
const homeRoutes = require("./home.route");
module.exports = (app) => {
    
    app.use("/",homeRoutes);
    
    app.use("/products",productRoutes);
    
   

    
}
//module.exports de tao ham vao exports nhung sang trang khac