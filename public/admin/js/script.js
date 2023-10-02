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
if (formSearch) {
    let url = new URL(window.location.href);
    //khi nhap se lay ra gia tri
    formSearch.addEventListener("submit", (event) => {
        event.preventDefault();//ngan load lai trang
        let value = event.target.elements.keyword.value;
        //set value = keyword ng dung nhap vao
        if (value != "") {
            url.searchParams.set("keyword", value);
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
if (buttonPagination.length > 1) {
    let url = new URL(window.location.href);
    buttonPagination.forEach(button => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination");
            //khai bao nut page bang gia tri cua button-pagination
            url.searchParams.set("page", page);
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
if (buttonChangeStatus.length > 0) {
    const formChangeStatus = document.querySelector("#form-change-status");
    const path = formChangeStatus.getAttribute("data-path");

    buttonChangeStatus.forEach(button => {
        button.addEventListener("click", () => {
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

//Checkbox Multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
//lay ra table checkboxMulti
if (checkboxMulti) {
    //neu co table checkboxMulti
    const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
    //khai bao ra input checkAll tu checkboxMulti
    const inputsId = checkboxMulti.querySelectorAll("input[name='id']");
    //khai bao ra input id tu checkboxMulti

    inputCheckAll.addEventListener("click", () => {
        //bat su kien cho nut checkAll
        // inputCheckall.checked =>lay ra trang thai hien tai cua nut checkall
        if (inputCheckAll.checked) {
            //neu input checkAll duoc check =>
            inputsId.forEach(input => {
                input.checked = true;
                //cac nut check o moi phan tu => se dc check theo
            });
        }
        else {
            //neu checkAll ko dc check => gan cac nut = false
            inputsId.forEach(input => {
                input.checked = false;
            });
        }
    });
    inputsId.forEach(input => {
        input.addEventListener("click", () => {
            const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length;
            //khi click vao cac nut input => loc ra cac nut da duoc check tu checkboxMulti
            //dem so luong o input da duoc check

            // inputsId.length =>lay ra so phan tu input tren giao dien
            if (countChecked == inputsId.length) {
                //neu so luong nut input duoc check bang so luong nut input co trong trang
                //=> input checkAll duoc tu dong check
                inputCheckAll.checked = true;
            }
            else {
                inputCheckAll.checked = false;
                //neu so luong input duoc check ko bang so luong nut input co trang trang
                //=> nut inputCheckAll ko duoc check
            }
        });
    });
}
//End Checkbox Multi

//Form Change Multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
    formChangeMulti.addEventListener("submit", (e) => {
        //khi an submit => ap dung => se chay ra su kien  
        e.preventDefault();// ngan chan su kien mac dinh(submit)
        //boi vi neu khong co => no se submit luon
        //khong chay nhung dong code duoi

        const checkboxMulti = document.querySelector("[checkbox-multi]");
        const inputsChecked = checkboxMulti.querySelectorAll(
            "input[name='id']:checked");
        
        const typeChange = e.target.elements.type.value;
        //lay ra gia tri cua nut input
        //vi du click vao nut Xoa tat ca roi submit(Ap dung)=> tra ra value la "delete-all"

        if(typeChange == "delete-all"){
            const isConfirm = confirm("Bạn có chắc muốn xóa những bản ghi này không ?");
            if(!isConfirm){
                return;
                //neu nguoi ta chon Huy => tat ca nhung doan code sau se khong duoc thuc thi
                //neu chon Ok => chay xuong nhung dong code
            }
        }  
        //cac o input da duoc check  
        //khi click vao cac nut trong tung phan tu
        //roi an vao nut ap dung (nut ap dung la submit trong form)
        //=> ra so phan tu 
        if (inputsChecked.length > 0) {
            //neu so luong input duoc check > 0
            let ids = []; // lay mang ids la mang rong
            const inputIds = formChangeMulti.querySelector("input[name='ids']");
            //lay ra o input trong form de insert data(id) vao de ap dung
            inputsChecked.forEach(input => {
                //lap qua tung cai mot
                const id = input.value;
                if(typeChange == "change-position") {
                    const position = input.closest("tr").querySelector("input[name='position']").value;
                    //tu o input (input o day la nut check)=>lay ra the cha cua no => phan tu bao gom hang ngang => lay ra the tr
                    //tu the tr cha => querySelector den the input co name = postion
                    //=>lay ra vi tri cua the input Vi tri
          
                    ids.push(`${id}-${position}`);
                    //them ca vi tri vao sau id
                }          
                else{
                    ids.push(id);
                //them cac gia tri (tuc la id) cua cac input vua duoc check vao mang ids
            }

        });
            inputIds.value = (ids.join(", "));
            
            //them gia tri cua o input trong form = gia tri cua mang ids
            formChangeMulti.submit();//gui len tren server
            //submit form de gui len cho ong backend => gui id cua nhung nut input
            
        }
        else{
            alert("Vui long chon it nhat 1 ban ghi");
        }

    });
}
//xu li xong roi gui data sang backend =>
//=>submit => action chuyen den trang url duoc dinh nghia o front end
//trang url duoc xu li o router

//End Form Chane Multi

const buttonDeleteItem = document.querySelectorAll("[button-delete]");
if (buttonDeleteItem.length > 0) {
    const formDeleteItem = document.querySelector("#form-delete-item");
    const path = formDeleteItem.getAttribute("data-path");

    buttonDeleteItem.forEach(button => {
        button.addEventListener("click", () => {
            const confirmDelete = confirm("Bạn có chắc muốn xóa không ?");
            if(confirmDelete){
            const id = button.getAttribute("data-id");

            
            const action = path + `/${id}?_method=DELETE`;

            formDeleteItem.action = action;

            // formChangeStatus.setAttribute("action",action);
            formDeleteItem.submit();
            //khi click vao button => tu dong submit
            }
            
        });
    });
}
//Show alert
const showAlert = document.querySelector("[show-alert]");
if(showAlert){
    const time = parseInt(showAlert.getAttribute("data-time")) || 3000;
    setTimeout(() =>{
        showAlert.classList.add("alert-hidden");

    },time)
    console.log(time);
}
//End Show alert
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage){
    const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
    const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");
    uploadImageInput.addEventListener("change",(event) => {
        if(event.target.files.length){
            const image = URL.createObjectURL(event.target.files[0]);
            //tao 1 duong dan tu anh => luu vao image
            uploadImagePreview.src = image;
            //=> kem src = duong dan anh
        }
    })
}





