$(function () {
    function get() {
        let username = $('#username').val();
        let pwd = $('#password').val();
        $.ajax({
            url: "./user.json",
            type: 'GET',
            dataType: "json",
            success: function (data) {
                if(data.token){
                    window.location.href = "../mainPage/mainPage.html";
                }
            },
            error: function () {
                console.log("bad error")
            }
        })
    }
    (function () {
        let loginBtn = $('#loginBtn');
        loginBtn.on('click', function () {
            get();
        })
    })();
});
