"use strict";$(function(){var t=document.querySelector("table"),n=document.getElementById("sum"),c=JSON.parse(localStorage.getItem("shoppingCart"));console.log(c);function d(){var e='\n        <thead>\n            <tr>\n                <th><input class="allCheck" type="checkbox" '+(c.every(function(t){return t.isChecked})?"checked":"")+'>全选</th>\n                <th scope="col">商品ID</th>\n                <th scope="col">商品名称</th>\n                <th scope="col">商品价格</th>\n                <th scope="col">数量</th>\n                <th scope="col">操作</th>\n                <th scope="col">删除</th>\n            </tr>\n        </thead>\n        <tbody>\n        \n        ';c.forEach(function(t){e+='\n            <tr>\n                <th scope="row"><input data-id="'+t.deal_pid+'" type="checkbox" class="singleCheck" '+(t.isChecked?"checked":"")+'/></th>\n                <th scope="row">'+t.deal_pid+'</th>\n                <td title="'+t.deal_tit+'"><span style="display:inline-block;width:250px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis; ">'+t.deal_tit+"</span></td>\n                <td>"+t.comments_number+"</td>\n                <td>"+t.count+'</td>\n                <td>\n                    <button type="button" class="btn increase" data-id="'+t.deal_pid+'">+</button>\n                    <button type="button" class="btn decrease" data-id="'+t.deal_pid+'">-</button>\n                </td>\n                <td class="d-flex justify-content-md-center">\n                    <button type="button" class="close" aria-label="关闭">\n                        <span class="del" data-id="'+t.goods_id+'" aria-hidden="true">&times;</span>\n                    </button>\n                </td>\n            </tr>\n            \n            '}),e+="</tbody>",c.length||(e="<h1><a href='../html/index.html'>您的购物车空空如也，请去挑选一些商品吧！</a></h1>"),t.innerHTML=e}function i(){localStorage.setItem("shoppingCart",JSON.stringify(c))}function o(){var e=0;c.forEach(function(t){t.isChecked&&(e+=t.count*t.comments_number)}),n.innerHTML="￥"+e,c.length||(n.parentNode.style.display="none")}d(),o(),t.onclick=function(e){if("allCheck"===e.target.className)return c.forEach(function(t){t.isChecked=e.target.checked}),d(),o(),void i();if("singleCheck"===e.target.className){var n=e.target.getAttribute("data-id"),t=c.find(function(t){return t.deal_pid===n});return console.log(t),t.isChecked=e.target.checked,d(),o(),void i()}if(e.target.className.includes("increase")){n=e.target.getAttribute("data-id");return(t=c.find(function(t){return t.deal_pid===n})).count++,d(),o(),void i()}if(e.target.className.includes("decrease")){n=e.target.getAttribute("data-id");return(t=c.find(function(t){return t.deal_pid===n})).count--,t.count<=0&&(t.count=0),d(),o(),void i()}if("del"===e.target.className){n=e.target.getAttribute("data-id");var a=c.findIndex(function(t){return a===n});return c.splice(a,1),d(),o(),void i()}}});