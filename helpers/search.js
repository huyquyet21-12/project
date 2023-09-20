module.exports = (query) => {
    let objectSearch ={
        keyword : "",
        regex : ""
    }
    if(query.keyword){
        objectSearch.keyword = query.keyword;
        //gan keyword = keyword gui tren frontend

        const regex = new RegExp( objectSearch.keyword, "i");
        //ham tim kiem gan giong

        objectSearch.regex = regex;
        //title la 1 key trong database gui ve

        
    };
    return objectSearch;
}