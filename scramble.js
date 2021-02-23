var scrambleRepeater;

function scramble(){
    var title = new String(document.getElementById('title').innerText);
    var temp = new String(title);
    for (var i=0;i<temp.length-1;i++){
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
    for (var i=0;i<title.length-1;i++){
        temp = temp.substr(0,i) + temp.charAt(i).toLowerCase() + temp.slice(i+1);
    }
    document.getElementById('title').innerHTML = temp;
}