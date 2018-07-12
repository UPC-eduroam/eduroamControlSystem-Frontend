$(function () {
    !function HandleNavClick() {
        let wrapperOne = $(".wrapperOne");
        let wrapperTwo = $(".wrapperTwo");
        let wrapperThree = $(".wrapperThree");
        let navOne = $("#navOne");
        let navTwo = $("#navTwo");
        let navThree = $("#navThree");
        navOne.on("click", function () {
            wrapperOne.fadeIn(1000);
            wrapperOne.siblings().css("display", "none");
        });
        navTwo.on("click", function () {
            wrapperTwo.fadeIn(1000);
            wrapperTwo.siblings().css("display", "none");
        });
        navThree.on("click", function () {
            wrapperThree.fadeIn(1000);
            wrapperThree.siblings().css("display", "none");
        })
    }()
});