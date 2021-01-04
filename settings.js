function toggleMode(){
    var all = document.getElementsByTagName("*");
    if (document.body.style.backgroundColor === "white"){
        for (var i=0, max=all.length; i < max; i++) {
            all[i].style.color = "white";
            all[i].style.backgroundColor = "black";
        }
    }
    else {
        for (var i=0, max=all.length; i < max; i++) {
            all[i].style.color = "black";
            all[i].style.backgroundColor = "white";
        }
    }
}

function changeFontSize(value){
    var all = document.getElementsByTagName("*");
    for (var i=0, max=all.length; i < max; i++) {
        var currSize = window.getComputedStyle(all[i]).fontSize.replace("px", "");
        var newSize = parseInt(currSize) + parseInt(value);
        all[i].style.fontSize = newSize + "px";
    }
}