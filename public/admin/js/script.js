//Tao file de nhung vao file pug
//=> nhung vao layouts/default
//bat su kien cho button ben admin/products/products.pug
//xu li ben frontend
const buttonStatus = document.querySelectorAll("[button-status]");
if (buttonStatus.length > 0) {
    let url = new URL(window.location.href);
    //tao moi url de truyen vao duong dan gui sang backend
    buttonStatus.forEach(button => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status");
            //khi click vao button => lay ra duoc trang thai cau status
            
            if (status != "") {
                url.searchParams.set("status", status);
                //lay duoc status => set lai url
                //them status ="" vao cuoi localhost
                //vi du lay duoc active => status=active
                
                
            } else {
                url.searchParams.delete("status");
                //neu status = " " => xoa status ra khoi
                //localhost
            }
            window.location.href = url.href;
            //chuyen huong sang trang url moi
        });
    });
}
//vi du 
//click vao nut hoat dong => se lay ra gia tri cua thuoc tinh button-status
//=> status = "active" => "active" != ""
//=> set lai url moi them vao status=active
//=>localhost:3000/admin/products?status=active
//=>chuyen huong sang localhost tren roi gui len backend 
//backend xu li => in ra views
//B1
//End ButtonStatus

// Form Search
const formSearch = document.querySelector("#form-search");
if(formSearch) {
    let url = new URL(window.location.href);
    //khi nhap se lay ra gia tri
    formSearch.addEventListener("submit",(event) => {
        event.preventDefault();//ngan load lai trang
        let value = event.target.elements.keyword.value;
        //set value = keyword ng dung nhap vao
        if (value != "") {
            url.searchParams.set("keyword",value);
            //lay duoc value => set lai url
            //them value ="" vao cuoi localhost
            //vi du lay duoc keyword=> keyword=iphone
        } else {
            url.searchParams.delete("key");
            //neu key = " " => xoa key ra khoi
            //localhost
        }
        window.location.href = url.href;
        //tra ve url moi => de ben backend tim ra keyword
        
    })
}
// End Form Search
// Pagination
const buttonPagination = document.querySelectorAll("[button-pagination]");
if(buttonPagination.length > 1){
    let url = new URL(window.location.href);
    buttonPagination.forEach(button => {
        button.addEventListener("click",() => {
            const page = button.getAttribute("button-pagination");
            //khai bao nut page bang gia tri cua button-pagination
            url.searchParams.set("page",page);
            //set page = page vua duoc khai bao
            window.location.href = url.href;
            
        })
    })
}
//khi click vao trang 1 => 
// url thay doi thanh
// localhost:3000/admin/products?page=1
// End Pagination

//Change Status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
if(buttonChangeStatus.length > 0){
    const formChangeStatus = document.querySelector("#form-change-status");
    const path = formChangeStatus.getAttribute("data-path");
    
    buttonChangeStatus.forEach(button => {
        button.addEventListener("click",() => {
            const statusCurrent = button.getAttribute("data-status");
            const id = button.getAttribute("data-id");
            
            const statusChange = statusCurrent == "active" ? "inactive" : "active";
            const action = path + `/${statusChange}/${id}?_method=PATCH`;

            formChangeStatus.action = action;
            
            // formChangeStatus.setAttribute("action",action);
            formChangeStatus.submit();
            //khi click vao button => tu dong submit

            
        });
    });
}


//End Change Status


