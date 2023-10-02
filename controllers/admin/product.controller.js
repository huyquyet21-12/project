//[GET] /admin/product
const Product = require("../../models/products.model");
const systemConfig = require("../../config/system");
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
    .sort({position: "desc"})
    .limit(objectPagination.limitItem)
    .skip(objectPagination.skip);
    //sort de loc sap xep
    //desc => sap xep theo vi tri giam dan
    //asc => sap xep theo vi tri tang dan
    if(product.length > 0 || countProducts == 0){
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
    }
    else {
        let stringQuery = "";
    
        for(const key in req.query) {
          if(key != "page") {
            stringQuery += `&${key}=${req.query[key]}`;
          }
        }
    
        const href = `${req.baseUrl}?page=1${stringQuery}`;
    
        res.redirect(href);
      }
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

    req.flash("success", "Cập nhật trạng thái thành công!");
    //khi cập nhập =) in ra dòng chữ
    
    res.redirect("back");
    //back ve trang truoc do
};
module.exports.changeMulti = async(req,res) => {
    console.log(req.body);
    //lay ra data nguoi dung gui len cho backend qua o input
    //=>can cai dat npm body-parse
    //data tu req.body la tu form
    const type = req.body.type;
    //lay ra type nghia la value cua select => lay ra status muon thay doi
    const ids = req.body.ids.split(", ");
    //lay ra ids nghia la value cua nut input => lay ra id muon thay doi status
    switch (type) {
        case "active":
        case "inactive":    
            await Product.updateMany({_id: {$in: ids}},{status : type});
            req.flash("success", `Cập nhật trạng thái thành công ${ids.length} sản phẩm!`);
            break;
            
        case "delete-all":
            await Product.updateMany({_id: {$in: ids}},{
                deleted : true,
                deletedAt : new Date()
            });
            break;
            //khi gui len value la delete-all => xoa di nhung san pham   
        case "change-position":
            for (const item of ids) {
                //vong for cac phan tu duoc chon
                const [id,position] = item.split("-");
                //tach rieng id voi position ra
                await Product.updateOne({_id: id},{position: position});
                //dung for => chi can updateOne
            }
            break;     
        default:
            break;    
    }
    res.redirect("back");
}
//[DELETE]
module.exports.deleteItem = async (req,res) => {
    const id = req.params.id
    //nhan ve id de xoa
    // await Product.deleteOne({_id : id});
    // //xoa san pham
    await Product.updateOne(
        {_id: id},
        {
        deleted : true,
        deletedAt: new Date()
    });
    //deletedAt => khi xoa se hien them ca thoi gian xoa
    req.flash("success", `Xóa thành công sản phẩm!`);
    res.redirect("back");
}
// [GET] /admin/products/create
module.exports.create = async(req,res) => {
    res.render("admin/pages/products/create",{
        pageTitle : "Tạo mới sản phẩm"
    })
}
module.exports.createPost = async(req,res) => {
  
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    if(req.body.position === ""){
        const countProducts = await Product.countDocuments();
        req.body.position = countProducts + 1;
    }else{
        req.body.position = parseInt(req.body.position);
    }
    if(req.file && req.file.filename){
        //check xem co file gui len vao co ten filename k
        req.body.thumbnail = `/uploads/${req.file.filename}`;
        //thumbnail la link anh tai tu may tinh
    }
    const product = new Product(req.body);
    //tao moi 1 csdl san pham co data la req.body 
    //them san pham moi vao Products
    await product.save();
    //awati de doi => product.save() => luu them vao database
    //req.body la gui tu form => nhan du lieu tu form
    res.redirect(`/${systemConfig.prefixAdmin}/products`);
};
// [GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
    const id = req.params.id;
  
    const product = await Product.findOne({
      _id: id,
      deleted: false
    });
  
    
  
    res.render("admin/pages/products/edit", {
      pageTitle: "Chỉnh sửa sản phẩm",
      product: product
    });
  };
  
  // [PATCH] /admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
    try{
    const id = req.params.id;
  
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
  
    req.body.position = parseInt(req.body.position);
  
    if(req.file && req.file.filename) {
      req.body.thumbnail = `/uploads/${req.file.filename}`;
    }
    //neu upload 1 file len => update lai thumbnail
    //neu khong upload len => van su dung anh cu~
  
    await Product.updateOne({ _id: id }, req.body);
  
    req.flash("success", "Cập nhật sản phẩm thành công!");
  
    res.redirect("back");
    }catch(error){
        res.redirect(`/${systemConfig.prefixAdmin}/products`);
    }
  };
// [GET] /admin/products/detail/:id
module.exports.detail = async (req, res) => {
  
    try{
        const id = req.params.id;
  
        const product = await Product.findOne({
          _id: id,
          deleted: false
        });
        res.render("admin/pages/products/detail", {
          pageTitle: "Chi tiết sản phẩm",
          product: product
        });

    } catch(error){
        res.redirect(`/${systemConfig.prefixAdmin}/products`);
    }
  };  

  
  


