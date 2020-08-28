$(function(){

    var $username = $("#username");
    var $password = $("#password");
    var $submitBtn = $("#submitBtn");
    var $namebox = $(".namebox");
    var $passwordbox = $(".passwordbox");

    var $appP1 = $("<p>输入用户名有误</p>")
    var $appP2 = $("<p>输入密码有误</p>")
    var user_lock = false;
    var pass_lock = false;

    $username.blur(function(){
        var val = $username.val();
        var reg = /^[^\d]\w{6,10}$/;
        if(!reg.test(val)){
            $namebox.append($appP1);
            $appP1.css({"color":"red"})
            user_lock = false;
            return;
        }
        user_lock = true;
    })
    $username.focus(function(){
        $appP1.remove();
    })

    $password.blur(function(){
        var val = $password.val();
        var reg = /^[^\d]\w{6,10}$/;
        if(!reg.test(val)){
            $passwordbox.append($appP2);
            $appP2.css({"color":"red"});
            pass_lock = false;
            return;
        }
        pass_lock = true;
    })
    $password.focus(function(){
        $appP2.remove();
    })

    $submitBtn.click(function(){
        if(!(user_lock && pass_lock)){
            return;
        }
        $.ajax({
            url:"/server/php/login.php",
            type:"post",
            data:{
                username:$username.val(),
                password:$password.val(),
            },
            dataType:"json",
            success(data){
                console.log(data)
                if(!data.error){
                    alert(data.msg);
                    location.href = "../html/index.html";
                } else {
                    throw new Error(data.msg);
                }
            }
        })
    })
})