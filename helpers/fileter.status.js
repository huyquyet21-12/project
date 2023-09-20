module.exports = (query) => {
    //vi ben file nay ko co req vs res
    //=> thay req = query
    //=>query.status => dc hieu la req.query.status
    let filterStatus = [
        {
            name : "Tất cả",
            status : "",
            class: ""
        },
        {
            name : "Hoạt động",
            status : "active",
            class: ""
        },
        {
            name : "Dừng hoạt động",
            status : "inactive",
            class: ""
        }
    ];
    if(query.status){
        //neu truyen len status
        const index = filterStatus.findIndex((item) => {
            return item.status == query.status;
            //tra ve phan tu co status = status gui len
            //=> tra ve index cua phan tu do
        });
        filterStatus[index].class = "active";
        
    //tu array filterStatus co index vua tim dc
    //=>them class = "active" cho index do
    } 
    else {
        //neu ben front end khong gui len =>
        const index = filterStatus.findIndex((item) => {
            return item.status == "";
            //tra ve phan tu co status = status gui len
            //=> tra ve index cua phan tu do
        });
        filterStatus[index].class = "active";
    }
    return filterStatus;
}
//viet bo loc => kieu nhu xu li  cac nut nhu tat ca hoat dong
//de do mat thoi gian code lai khi o nhieu noi can den
//dong code
