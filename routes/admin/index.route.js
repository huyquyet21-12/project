const dashboardRoute = require("./dashboard.route");
const systemConfig = require("../../config/system");
const productRoute = require("./product.route");
module.exports = (app) => {
    const PATH_ADMIN = "/" + systemConfig.prefixAdmin;
    
    app.use(PATH_ADMIN + "/dashboard",dashboardRoute);
    app.use(PATH_ADMIN + "/products",productRoute);
    
    
}
















//tao file index ben route roi => phai nhung vao index.js