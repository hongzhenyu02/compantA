$(function(){

    var $username = $("#username");
    var $namebox = $(".namebox");
    var $password = $("#password");
    var $passwordbox = $(".passwordbox");
    var $submitBtn = $("#submitBtn");

    var $appP1 = $("<p>请按照规则输入</p>")
    var $appP2 = $("<p>恭喜您可以使用</p>")

    var user_lock = false;
    var pass_lock = false;
    

    $username.blur(function(){
        //获取输入文本框的内容
        var val = $username.val();
        console.log(val);
        //定义正则
        var reg = /^[^\d]\w{6,10}$/;
        if(!reg.test(val)){
            $namebox.append($appP1);
            $appP1.css({"color":"red"})
            user_lock = false;
            return
        } 

        $.ajax({
            url: "/server/php/checkusername.php",
            type: "get",
            data:{
                username:val
            },
            dataType:"json",
            success(data) {

                console.log(data);
                if(!data.error){
                    // alert(data.msg);
                    $namebox.append($appP2);
                    $appP2.css({"color":"green"});
                    user_lock = true;
                } else{
                    throw new Error(data.msg);
                }
                
                
         
            }
        })
    })

    
    $username.focus(function(){
        $appP1.remove();
        $appP2.remove();
    })

    $password.blur(function(){
        var val = $password.val();
        var reg = /^[^\d]\w{6,10}$/;
        if(!reg.test(val)){
            $passwordbox.append($appP1);
            $appP1.css({"color":"red"})
            pass_lock = false;
            return;
        } 
        pass_lock = true;
    })
    $password.focus(function(){
        $appP1.remove();
        // $appP2.remove();
    })


    $submitBtn.click(function(){
        if(!(user_lock && pass_lock)){
            return;
        }
        $.ajax({
            url:"/server/php/register.php",
            type:"post",
            data:{
                username:$username.val(), 
                password:$password.val()
            },
            dataType:"json",
            success(data){
                console.log(data)
                if (!data.error) {
                    alert(data.msg);
                    // 成功之后 我们要跳转到登录页面 
                    location.href = "../html/login.html";
                } else {
                    throw new Error(data.msg);
                }
            }
        })
    })




})