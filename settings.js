function toggleMode(){
    var all = document.getElementsByTagName("*");
    var allImages = document.getElementsByTagName("img");
    if (document.body.style.backgroundColor === "white"){
        for (var i=0, max=all.length; i < max; i++) {
            if (all[i].id.toLowerCase() === "settings-button" || all[i].id.toLowerCase() === "settings-option" || all[i].id.toLowerCase() === "settings") continue;
            all[i].style.color = "white";
            all[i].style.backgroundColor = "black";
        }
        for (var i=0, max=allImages.length; i < max; i++) {
            allImages[i].transition = "0s";
            allImages[i].src = allImages[i].src.replace("_dark.png", "") + "_light.png";
            allImages[i].transition = "0.5s";
        }
    }
    else {
        for (var i=0, max=all.length; i < max; i++) {
            if (all[i].id.toLowerCase() === "settings-button" || all[i].id.toLowerCase() === "settings-option" || all[i].id.toLowerCase() === "settings") continue;
            all[i].style.color = "black";
            all[i].style.backgroundColor = "white";
        }
        for (var i=0, max=allImages.length; i < max; i++) {
            allImages[i].transition = "0s";
            allImages[i].src = allImages[i].src.replace("_light.png", "") + "_dark.png";
            allImages[i].transition = "0.5s";
        }
    }
}

function changeFontSize(value){
    var all = document.getElementsByTagName("*");
    for (var i=0, max=all.length; i < max; i++) {
        var currSize = window.getComputedStyle(all[i]).fontSize.replace("px", "");
        var newSize = parseFloat(currSize) + parseFloat(value);
        all[i].style.fontSize = newSize + "px";
    }
}