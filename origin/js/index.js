

//在页面结构加载完毕的时候执行代码
$(function(){
    //获取元素
    var $carousel = $("#carousel");
    var $banner = $("#banner");
    var $rightBtn = $("#rightBtn");
    var $leftBtn = $("#leftBtn");
    var $lis = $("#carousel li");
    var $cirsLis = $("#cirs li");
    var $count = $cirsLis.length;
    var lock = true;
    var idx = 0;
    var $newdeal_ul = $("#newdeal_ul");

    //点击右按钮
    $rightBtn.click(function(){
        if(!lock){
            return;
        }
        lock = false;
        $lis.eq(idx).fadeOut(1000);
        idx++
        if (idx > $count - 1) {
            idx = 0;
        }
        $lis.eq(idx).fadeIn(1200,function(){
            lock = true;
            change();
        });
    });

    //点击左按钮
    $leftBtn.click(function(){
        if(!lock){
            return;
        }
        lock = false;
        $lis.eq(idx).fadeOut(1000);
        idx--;
        if(idx < 0){
            idx = $count - 1;
        }
        $lis.eq(idx).fadeIn(1200,function(){
            lock = true;
            change();
        })
    })

    //点击小圆点
    $cirsLis.click(function(){
        if(!lock){
            return;
        }
        lock = false;
        $lis.eq(idx).stop(true).fadeOut(1000);
        idx = $(this).index()
        $lis.eq(idx).stop(true).fadeIn(1200,function(){
            lock = true;
        });
        change();
    })

    //改变小圆点样式
    function change () {
        $cirsLis.each(function(index,value){
            if(index === idx){
                $(value).addClass("active");

            }else{
                $(value).removeClass("active");
            }
        })
    }

    //自动播放
    var timer = setInterval(function(){
        $rightBtn.trigger("click");
    },2000)
    
    //滑入时停止
    $banner.mouseenter(function(){
        clearInterval(timer);
    })

    //滑出时自动播放
    $banner.mouseleave(function(){
        timer = setInterval(function(){
            $rightBtn.trigger("click");
        },2000)
    })

    
    var html = '';
    
    $.ajax({
        url: "/server/data/1.json",
        type: "get",
        dataType: "json",
        // 下面这条设置 表示不设置请求头中的content-type字段
        // contentType: false, 
        // 下面这条设置 表示不要自动序列化数据
        // processData: false,
        // 正常情况下 上面这两条不需要设置  只有当特殊需求(比如 传递文件) 才需要使用
        success(data) {
            console.log(data);
            data.list.forEach(function(value){
                // console.log(value.deal_global.price_ref);
                html += `
                <li class="newdeal_box" data-id="${value.deal_hid}">
                    <div id="img_box" class="img_box">
                        <a class="img_box_href" href="">
                            <img src="${value.deal_img}" alt="">
                        </a>
                    </div>
                    <div class="title_box">
                        <p class="title"><a href="../html/detail.html?id=${value.deal_hid}">${value.deal_tit}</a></p>
                        <div class="pricr_box">
                            <em>¥</em>
                            <span class="pnum">${value.comments_number}</span>
                        </div>
                    </div>
                </li>
                
                `
                // console.log(html)
            })
            $newdeal_ul.html(html);


            
            
        }
        
        
    })

    

    


})
    


