const express = require("express");//nhung
const router = express.Router();
//khai bao ra ham router roi gan 
const controller = require("../../controllers/client/product.controller")

//../ de di ra ngoai
router.get("/",controller.index);

router.get("/add",controller.add);

router.get("/edit",controller.edit);

router.get("/detail/:slug",controller.detail);



module.exports = router;//exports no ra