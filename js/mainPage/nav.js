$(function () {
    $("#submit").on("click", function () {
        let sub = $("#submit");
        let info = $(".info");
        let black = $(".blackList");
        sub.addClass("active").siblings().removeClass("active");
        info.removeClass("dis");
        black.addClass("dis");
    });
    $("#blackName").on("click", function () {
        let sub = $("#blackName");
        let info = $(".info");
        let black = $(".blackList");
        sub.addClass("active").siblings().removeClass("active");
        info.addClass("dis");
        black.removeClass("dis");
    })
});