const mongoose = require("mongoose");
//import de dung o day
const productSchema = new mongoose.Schema({
        title: String,
        description: String,
        price: Number,
        discountPercentage: Number,
        stock: Number,
        thumbnail: String,
        status: String,
        position: Number,
        deleted: Boolean
});//dinh nghia ra Schema

const Product = mongoose.model("Product",productSchema,"products");

module.exports = Product;//exports ra de dung o file khac
//cau hinh model