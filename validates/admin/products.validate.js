module.exports.createPost = (req,res,next) => {
    //next => neu thoa man dieu kien => goi den next
    //de cho qua va chay den ham controller
    if(!req.body.title){
        //neu nguoi dung ko nhap tieu de vao
        req.flash("error", `Tiêu đề không được để trống!`);
        res.redirect("back");//back ve trang truoc do
        return;//return de ngat' nhung cau lenh ben duoi
    }
    if(req.body.title.length < 5){
        req.flash("error",`Tiêu đề tối thiểu 5 ký tự!`);
        res.redirect("back");
        return;
    }
    //neu khong ton tai nhung dieu kien => return luon
    //=> ko chay den next => ko chay den controller
    next();//pass qua => chay den ham controller
}
module.exports.editPatch = (req,res,next) => {
    //next => neu thoa man dieu kien => goi den next
    //de cho qua va chay den ham controller
    if(!req.body.title){
        //neu nguoi dung ko nhap tieu de vao
        req.flash("error", `Tiêu đề không được để trống!`);
        res.redirect("back");//back ve trang truoc do
        return;//return de ngat' nhung cau lenh ben duoi
    }
    if(req.body.title.length < 5){
        req.flash("error",`Tiêu đề tối thiểu 5 ký tự!`);
        res.redirect("back");
        return;
    }
    //neu khong ton tai nhung dieu kien => return luon
    //=> ko chay den next => ko chay den controller
    next();//pass qua => chay den ham controller
}