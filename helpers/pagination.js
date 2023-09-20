module.exports = (objectPagination,query,countProducts) => {
    //truyen query voi countProducts
    //truyen objectPagination tu ben kia vao

    if(query.page){
        objectPagination.currentPage = parseInt(query.page);
        //neu ng dung truyen nen page => thay doi curent page
    }
    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItem;
    //no trang no bo qua
    //trang 1 khong skip (1-1) * 4 = 0
    //trang 2 skip = (2-1) * 4 = 4 => bo qua 4 san pham
    //End Pagination
    
    //ham tran ve so phan tu de hien thi ra trang
    objectPagination.totalPage =  Math.ceil(countProducts/objectPagination.limitItem);
    return objectPagination;
}