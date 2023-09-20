const express = require("express");//nhung
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
module.exports = router;