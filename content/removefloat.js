drawFloatBox('Eyedropper Mode Off', '#ff0000','side', -1, -1);

$('img').unbind('mousemove');

$('img').unbind('click');

function drawFloatBox(msg,color,type,x,y){
    var newDiv = document.createElement("div");
    var msg = document.createTextNode(msg);
    newDiv.style.padding="10px 5px 5px 10px";
    newDiv.style.borderLeft = "thick solid " + color;
    newDiv.style.maxWidth = "150px";
    newDiv.appendChild(msg);
    newDiv.style.backgroundColor = "black";
    newDiv.style.color = "white";
    newDiv.style.opacity = "0.7";
    newDiv.style.position = "fixed";
    newDiv.className = type;
    if(x<0 || y<0){
        newDiv.style.right = "20px";
        newDiv.style.bottom = "20px";
    } else{
        newDiv.style.left = x+5;
        newDiv.style.top = y+5;
    }
    var new_Div = $(newDiv).hide();
    $('body').append(new_Div);
    new_Div.show();

    window.setTimeout(function(){
        new_Div.hide();
    },2000);
};