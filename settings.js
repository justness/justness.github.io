function showSettings() {
    var settings = document.getElementById("settings-options");
    if (settings.style.display === "initial"){
        settings.style.display = "none";
    }
    else settings.style.display = "initial";
}

var lightmode = false;

function toggleMode(){
    var images = document.getElementsByTagName("IMG");
    if (lightmode){ 
        document.documentElement.style.setProperty('--basic',"white");
        document.documentElement.style.setProperty('--basic-alt', "rgb(230,230,230)");
        document.documentElement.style.setProperty('--bkg',"black");
        document.documentElement.style.setProperty('--accent',"rgb(232,197,76)");
        document.documentElement.style.setProperty('--accent-highlighted',"rgb(255,232,151)");
        for (var i = 0; i < images.length; i++){ images[i].style.filter = "invert(0)"; }
    }
    else {
        document.documentElement.style.setProperty('--basic',"black");
        document.documentElement.style.setProperty('--basic-alt', "rgb(90,90,90)");
        document.documentElement.style.setProperty('--bkg',"white");
        document.documentElement.style.setProperty('--accent',"rgb(92,128,188)");
        document.documentElement.style.setProperty('--accent-highlighted',"rgb(86,205,234)");
        for (var i = 0; i < images.length; i++){ images[i].style.filter = "invert(1)"; }
    }
    lightmode = !lightmode;
}