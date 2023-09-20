//[GET] /admin/product
const Product = require("../../models/products.model");
const filterStatusHelper = require("../../helpers/fileter.status");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
module.exports.index = async (req,res) => {

    const filterStatus = filterStatusHelper(req.query);
    let objectSearch = searchHelper(req.query)
    
    
    

    let find = {
        //khai bao find la 1 Object
        deleted : false,
    };
    
    if(req.query.status){
        find.status = req.query.status;
        //neu nguoi dung gui len status => them key status
        //vi du ng dung click vao nut active
        //=>gui len localhost:3000/admin/products?status=active
        // tu req.query.status => Object find them key
        //status : "active"
    }
   
    if(req.query.keyword){
        // find.title = regex;
        // //title la 1 key trong database gui ve
        find.title = objectSearch.regex;
    }
    //Pagination
    let initPagination = {
        currentPage : 1 ,//so trang
        limitItem : 4,//moi trang 4 san pham
    };
    
    const countProducts = await Product.count(find);
    const objectPagination = paginationHelper(initPagination,req.query,countProducts);
    //khi truyen initpagination => initPagination = objectPagination o ben pagination.js
    //ham tran ve so phan tu de hien thi ra trang
    
    

    const product = await Product.find(find)
    .limit(objectPagination.limitItem)
    .skip(objectPagination.skip);
    res.render("admin/pages/products/index.pug",{
        pageTitle : "Trang danh sách sản phẩm",
        products : product,
        filterStatus : filterStatus,
        keyword : objectSearch.keyword,
        pagination : objectPagination

        //objectSearch.keyword = objectSearch.keyword
        //ben file search.js
        //ben file pug => se nhan duoc 
        //pageTitle
        //products
        //filterStatus
    });
};
//ham req.query de nhan yeu cau gui tu phia front-end
//vi du front end gui ra status=active
//=>o backend ham find them status : active

//ham find tra ve 
// find = {
//     delteted : false,
//     status :
//     keyword
// }
// module.exports.changeStatus = async (req,res) =>{
//     //click vao nut se hien ra 1 link => dc dinh nghia
//     const status = req.params.status;
//     //lay ra trang thai cua duong link
//     const id = req.params.id;
//     //lay ra id cua duong link
//     console.log("OK");
    
//     //duong link duoc dinh nghia doi nguoc
//     //duong link la tu viet
//     //vi du active => 
//     // localhost:3000/admin/products/incative/id
//     await Product.updateOne({ _id : id},{ status : status});
//     //ham ho tro cap nhap lai khi click vao nut hoat dong hoac dung hoat dong
//     //no se cap nhap lai status
//     // res.redirect("/admin/products");
//     // //khi update xong => quay tro lai trang san pham
//     res.redirect("back");
//     //khi update ve trang truoc do

// }
// [GET] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req,res) => {
    //khi click vao se lay ra status va id duoc 
    //dinh nghia ben front end
    const status = req.params.status;
    const id = req.params.id;
    await Product.updateOne({_id: id},{ status: status});
    //update database Product voi id = id , thay status = status moi
    res.redirect("back");
    //back ve trang truoc do
    
  }

