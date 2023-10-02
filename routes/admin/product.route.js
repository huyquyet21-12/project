const express = require("express");//nhung
const multer  = require('multer');
const storageMulterHelper = require("../../helpers/storageMulter");
const storage = storageMulterHelper();
const upload = multer({ storage: storage  });
const validate = require("../../validates/admin/products.validate");

//nhung multer va upload de up anh trong form
//nhung multer de up image
const router = express.Router();
//khai bao ra ham router roi gan 
const controller = require("../../controllers/admin/product.controller")

//../ de di ra ngoai
router.get("/",controller.index);
router.patch("/change-status/:status/:id",controller.changeStatus);
//patch de tranh nguoi dung truy cap vao duong link
//bat nguoi dung khi gui len bang phuong thuc patch
//moi cap nhat duoc
//=>get la mac dinh => doi phuong thuc get thanh patch
//khi duoc gui len bang phuong thuc vi du
//action => se nhan duoc o trang va xu li
router.patch("/change-multi",controller.changeMulti);
router.delete("/delete/:id",controller.deleteItem);
//xoa => gui len phuong thuc delete
router.get("/create",controller.create);
router.post(
    "/create",
    upload.single('thumbnail'),
    validate.createPost,
    controller.createPost
);
//thumbnail la name chung ta gui len => name la thumbnail
router.get("/edit/:id", controller.edit);
//co id roi => phai lay id
router.patch(
  "/edit/:id",
  upload.single("thumbnail"),
  validate.createPost,
  controller.editPatch
);
router.get("/detail/:id",controller.detail);

module.exports = router;