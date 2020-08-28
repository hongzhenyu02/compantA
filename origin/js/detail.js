//
$(function(){
    
    var getParam = function (key) {
        var querystring = location.search.slice(1);
        var arr = querystring.split("&");
        for(var i = 0; i < arr.length; i++){
            var subArr = arr[i].split("=");
            if(key === subArr[0]){
                return subArr[1];
            }
        }
    }
    var id = getParam("id");
    console.log(id);

    var goodsArr = [];
    var $box = $("#box")
    var html = '';
    
    $.ajax({
        url: "/server/data/1.json",
        data: {
            id
        },
        type: "get",
        dataType: "json",
        // 下面这条设置 表示不设置请求头中的content-type字段
        // contentType: false, 
        // 下面这条设置 表示不要自动序列化数据
        // processData: false,
        // 正常情况下 上面这两条不需要设置  只有当特殊需求(比如 传递文件) 才需要使用
        success(data) {
            console.log(data);
            goodsArr = data.list;
            console.log(goodsArr);
            var val = data.list.find(function(ele,index){
                console.log(ele);
                return id === ele.deal_hid;
            })
            html = `
            <div class="col-5">
                <div class="card">
                    <img src="${val.deal_img}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <p class="card-text">${val.deal_tit}</p>
                    </div>
                </div>
            </div>
            <div class="col-5 d-flex flex-column justify-content-end">
                <h3>￥${val.comments_number}</h3>
                <h3>库存:${val.deal_num}</h3>
                <button data-id="${val.deal_hid}" type="button" class="btn btn-primary">加入购物车</button>
            </div>
            `
            $box.html(html);

            $box.on("click",".btn",function(){
                var goodsID = $(this).attr("data-id");
                console.log("我是按钮" + $(this).attr("data-id"));
                
                var goodsInfo = goodsArr.find((value) => {
                    return value.deal_hid === goodsID;
                })
                console.log(goodsInfo);

                // 1 先把本地存储中的数组取出来
                var shoppingCartString = localStorage.getItem("shoppingCart") || "[]";
                // 2 转为数组
                var shoppingCartArr = JSON.parse(shoppingCartString);
                // 先判断数组里是否已经有这个对象
                var isExists = shoppingCartArr.find((value) =>{
                    return value.deal_hid === goodsID;
                })
                // var isExists  = shoppingCartArr.find(value => value.goods_id === goodsID);
                // 根据判断结果执行不同的业务逻辑
                if(isExists){
                    isExists.count++;
                } else {
                    // 3 往数组里加入选中的这个对象
                    goodsInfo.count = 1;
                    shoppingCartArr.push(goodsInfo);
                }

                // 4 回转成字符串并存到本地存储里
                localStorage.setItem("shoppingCart",JSON.stringify(shoppingCartArr));

                location.href = "../html/shoppingcart.html";
            })
        }
        
        
        
    })



    $.ajax({
        url:"/server/data/1.json",
        type:"get",

    })

    



    



})


{/* <a href="../html/shoppingcart.html"><button type="button" class="btn btn-primary">加入购物车</button></a> */}