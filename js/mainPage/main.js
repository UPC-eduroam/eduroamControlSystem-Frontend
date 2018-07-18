$(function () {
    function handleClick() {
        let btn = document.getElementsByClassName('btn-danger');
        let id = [];
        for(let i=0;i<btn.length;i++){
            btn[i].onclick = function () {
                $(".blackDetail").removeClass("dis");
            }
        }
    }
    function handleTable() {
        let table = $('.blackTable');
        let child = $('#Tanmay')[0];
        let reChild = child.parentNode.parentNode;
        reChild.remove();
        $(".blackDetail").addClass("dis");
    }
    $('.btnArgree').on("click",handleTable);
    handleClick();
});