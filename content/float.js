drawFloatBox('Image Loaded', '#ff0000','side', -1, -1);

$('canvas').addClass('picker');

var hex;

var getColor = function(e){
    console.log('move!');
    var x=e.pageX;
    var y=e.pageY;
    var context = document.getElementsByTagName('canvas')[0].getContext('2d');
    var pixel = context.getImageData(x, y, 1, 1).data;
    hex = "#" + ("000000" + rgbToHex(pixel[0], pixel[1], pixel[2])).slice(-6);
    removeFloatBox();
    drawFloatBox(hex, hex,'cursor', x+5, y+5);
};  

var addColor = function(e){
    console.log('click!');
    var x=e.pageX;
    var y=e.pageY;
    chrome.runtime.sendMessage({action:'storeColor',color:hex},function(response){
        if(response.result === true)
            drawFloatBox(hex + ' is added to Color Lib',hex,'side',-1,-1);
        else
            drawFloatBox('Hmmm for some reason it failed to add this color to Lib..','#ff0000','side',-1,-1);
    });
    drawFloatBox(hex + ' is added to Color Lib',hex,'side',-1,-1);
};

$('canvas.picker').on('mousemove',getColor);

$('canvas').click(addColor);

var sideInterval = window.setInterval(function(){
    $('div.side:first').fadeOut('slow',function(){
        $(this).remove();
    });
}, 2000);

function drawFloatBox(msg,color,type,x,y){
    var newDiv = document.createElement("div");
    var msg = document.createTextNode(msg);
    newDiv.style.padding="10px 5px 5px 10px";
    newDiv.style.borderLeft = "thick solid " + color;
    newDiv.style.maxWidth = "150px";
    newDiv.appendChild(msg);
    newDiv.style.backgroundColor = "black";
    newDiv.style.color = "white";
    newDiv.className = type;
    if(type === "side"){
        newDiv.style.opacity = "0.7";
        newDiv.style.position = "fixed";
    }else
        newDiv.style.position = "absolute";
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
};

function removeFloatBox(){
    $('div.cursor:last').hide(10, function(){
        $(this).remove();
    });
};

function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}



