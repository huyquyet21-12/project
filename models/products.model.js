const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
//slug de khai bao dung slug
mongoose.plugin(slug);
//nhung de su dung

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
        slug: { 
          type: String,
          slug: "title",
          //lay tu truong title
          unique: true
          //unique de cac san pham khong trung slug
          //slug chi la duy nhat =>
          //neu title trung nhau => slug se tu sinh 1 string random
        },
        deleted: {
                type: Boolean,
                default: false,
               
        },
        deletedAt: Date,
},
        { timestamps: true }
);//dinh nghia ra Schema

const Product = mongoose.model("Product", productSchema, "products");

module.exports = Product;//exports ra de dung o file khac
//cau hinh model
//cho deleted la 1 Object => kieu la boolean => neu khong
//dien gia tri => mac dinh default la false
//timestamps => tu dong cap nhap khi them moi 1 ban ghi
//slug them 1 key la string tren database
//slug an theo title => luu vao database
