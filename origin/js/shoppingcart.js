$(function(){
    var table = document.querySelector("table");
    var sum = document.getElementById("sum");
    //再从本地存储中把数据拿出来
    var shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));
    console.log(shoppingCart);
    var str ='';
    function render () {

        var isAllCheck = shoppingCart.every(value => {
            return value.isChecked;
        })


        var str =`
        <thead>
            <tr>
                <th><input class="allCheck" type="checkbox" ${isAllCheck?"checked":""}>全选</th>
                <th scope="col">商品ID</th>
                <th scope="col">商品名称</th>
                <th scope="col">商品价格</th>
                <th scope="col">数量</th>
                <th scope="col">操作</th>
                <th scope="col">删除</th>
            </tr>
        </thead>
        <tbody>
        
        `;
        shoppingCart.forEach((value) => {
            str += `
            <tr>
                <th scope="row"><input data-id="${value.deal_pid}" type="checkbox" class="singleCheck" ${value.isChecked?"checked":""}/></th>
                <th scope="row">${value.deal_pid}</th>
                <td title="${value.deal_tit}"><span style="display:inline-block;width:250px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis; ">${value.deal_tit}</span></td>
                <td>${value.comments_number}</td>
                <td>${value.count}</td>
                <td>
                    <button type="button" class="btn increase" data-id="${value.deal_pid}">+</button>
                    <button type="button" class="btn decrease" data-id="${value.deal_pid}">-</button>
                </td>
                <td class="d-flex justify-content-md-center">
                    <button type="button" class="close" aria-label="关闭">
                        <span class="del" data-id="${value.goods_id}" aria-hidden="true">&times;</span>
                    </button>
                </td>
            </tr>
            
            `
        })
        str += `</tbody>`;

        if(!shoppingCart.length){
            str = "<h1><a href='../html/index.html'>您的购物车空空如也，请去挑选一些商品吧！</a></h1>"
        }

        table.innerHTML = str ;
    }

    //将本地存储的数据更新
    function update(){
        localStorage.setItem("shoppingCart",JSON.stringify(shoppingCart));
    }

    render();
    checkin();

    //计算总价的函数
    function checkin () {
        var sumPrice = 0;
        shoppingCart.forEach(value => {
            if(value.isChecked){
                sumPrice += value.count * value.comments_number;
            }
        });
        sum.innerHTML = "￥" + sumPrice;
        if(!shoppingCart.length){
            sum.parentNode.style.display = "none";
        }
    }

    //使用委托添加事件
    table.onclick = function (e) {
    //判断是否是全选
        if(e.target.className === "allCheck"){
            // 全选
            shoppingCart.forEach((value)=>{
                value.isChecked = e.target.checked;
            })
            render();
            checkin();
            update();
            return;
        }
        //判定是否是单选
        if(e.target.className === "singleCheck"){
            //确定是哪一件商品
            //从input身上获取商品id
            var id = e.target.getAttribute("data-id");
            // console.log(id);
            // 根据id从数组中找到对应的商品
            var goodsInfo = shoppingCart.find(value => {
                return value.deal_pid === id;
            });
            console.log(goodsInfo);
            //将当前的input状态与goodsInfo的isChecked同步
            goodsInfo.isChecked = e.target.checked;
            render();
            checkin();
            update();
            return;
        }

        if(e.target.className.includes("increase")){
            //确定点的是哪个加号
            //从加号按钮上获取商品的id
            var id = e.target.getAttribute("data-id");
            //根据id从数组中找到对应的商品
            var goodsInfo = shoppingCart.find(value => {
                return value.deal_pid === id;
            })
            //增加count
            goodsInfo.count++;
            render();
            checkin();
            update();
            return;
        }

        if(e.target.className.includes("decrease")){
            //确定点的是哪个加号
            //从加号按钮上获取商品的id
            var id = e.target.getAttribute("data-id");
            //根据id从数组中找到对应的商品
            var goodsInfo = shoppingCart.find(value => {
                return value.deal_pid === id;
            })
            //增加count
            goodsInfo.count--;
            if(goodsInfo.count <= 0 ){
                goodsInfo.count = 0;
            }
            render();
            checkin();
            update();
            return;
        }

        if(e.target.className === "del"){
            //确定点的是哪个删除按钮
            //从删除按钮上获取商品id
            var id = e.target.getAttribute("data-id");
            //根据id从数组中找到对应索引的数据
            var goodsInfoIdx = shoppingCart.findIndex(value => {
                return goodsInfoIdx === id;
            })

            shoppingCart.splice(goodsInfoIdx,1);
            render();
            checkin();
            update();
            return;
        }

    }
})