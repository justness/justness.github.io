function toggleDropdown(content){
    var dropdown = document.getElementById(content);
    if (dropdown.style.opacity == 1){
        dropdown.style.opacity = 0;
        dropdown.style.height = 0;
    }
    else {
        dropdown.style.opacity = 1;
        dropdown.style.height = "auto";
    }
}

function toggleResumeHolder(){
    var holder = document.getElementById("resume-holder");
    if (holder.style.width === "80vh"){
        holder.style.width = "0";
    }
    else holder.style.width = "80vh";
}

var lightmode = false;

function toggleMode(){
    var images = document.getElementsByTagName("IMG");
    if (lightmode) {
        document.getElementById("display-option").innerHTML = "☀️";
        document.documentElement.style.setProperty('--basic',"white");
        document.documentElement.style.setProperty('--basic-alt', "rgb(230,230,230)");
        document.documentElement.style.setProperty('--bkg',"black");
        document.documentElement.style.setProperty('--accent',"rgb(232,197,76)");
        document.documentElement.style.setProperty('--accent-highlighted',"rgb(255,232,151)");
        for (var i = 0; i < images.length; i++){ images[i].style.filter = "invert(0)"; }
    }
    else {
        document.getElementById("display-option").innerHTML = "🌙";
        document.documentElement.style.setProperty('--basic',"black");
        document.documentElement.style.setProperty('--basic-alt', "rgb(90,90,90)");
        document.documentElement.style.setProperty('--bkg',"white");
        document.documentElement.style.setProperty('--accent',"rgb(92,128,188)");
        document.documentElement.style.setProperty('--accent-highlighted',"rgb(86,205,234)");
        for (var i = 0; i < images.length; i++){ images[i].style.filter = "invert(1)"; }
    }
    lightmode = !lightmode;
}

var audioPlaying = false;

function toggleAudio(){
    var audio = document.getElementById("bkg-audio");
    var button = document.getElementById("audio-option");
    if (audioPlaying) {
        audio.pause();
        button.innerHTML = "▶️";
    }
    else {
        audio.play();
        button.innerHTML = "⏸";
    }
    audioPlaying = !audioPlaying;
}