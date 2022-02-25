var scrambleRepeater;

function scramble(){
    var title = new String(document.getElementById('title').innerText);
    var temp = new String(title);
    for (var i=0;i<temp.length;i++){
        var coinFlip = Math.random() >= 0.5;
        if (coinFlip == false){
            temp = temp.substr(0,i) + temp.charAt(i).toUpperCase() + temp.slice(i+1);
        }
        else{
            temp = temp.substr(0,i) + temp.charAt(i).toLowerCase() + temp.slice(i+1);
        }
    }
    document.getElementById('title').innerHTML = temp;
    scrambleRepeater = setTimeout(scramble, 100);
}
function unscramble(){
    clearTimeout(scrambleRepeater);

    var title = new String(document.getElementById('title').innerText);
    var temp = new String(title);
    for (var i=0;i<14;i++){
        temp = temp.substr(0,i) + temp.charAt(i).toUpperCase() + temp.slice(i+1);
    }
    for (var i=14;i<title.length;i++){
        temp = temp.substr(0,i) + temp.charAt(i).toLowerCase() + temp.slice(i+1);
    }
    document.getElementById('title').innerHTML = temp;
}