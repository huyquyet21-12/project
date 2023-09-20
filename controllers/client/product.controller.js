// [GET] /product
//dung de viet logic
const Product = require("../../models/products.model");
//goi products.model.js ra
module.exports.index = async (req,res) => {

    const products = await Product.find({
        status : "active",
        deleted : false
    });
    //choc vao model de ket noi data base
    //tra database cho products
    const newProducts = products.map(item => {
        item.priceNew = ((item.price * (100 - item.discountPercentage)) / 100).toFixed(0);
        return item;
    });
    console.log(newProducts);
    res.render("client/pages/products/index.pug",{
        pageTitle : "Trang danh sách sản phẩm",
        products : products
    });
};

module.exports.add = (req,res) => {
    res.send("Trang thêm sản phẩm");
};

module.exports.edit = (req,res) => {
    res.send("Trang chỉnh sửa");
};