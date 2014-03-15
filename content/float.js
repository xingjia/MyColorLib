drawFloatBox('Image Loaded', '#ff0000','side', -1, -1);

$('img').addClass('picker');

$('img.picker').bind('mousemove',getColor);

$('img.picker').click(addColor);

var sideInterval = window.setInterval(function(){
    $('div.side:first').fadeOut('slow',function(){
        $(this).remove();
    });
}, 2000);

var getColor = function(e){
    var x=e.pageX;
    var y=e.pageY;
    chrome.runtime.sendMessage({action:'getCursor', x:x,y:y}, function(response){
        colorCode = response.color;
        removeFloatBox();
        drawFloatBox(colorCode,response.color,'cursor',x,y);
    }); 
};  

var addColor = function(e){
    var x=e.pageX;
    var y=e.pageY;
    chrome.runtime.sendMessage({action:'getCursor', x:x,y:y}, function(response){
        colorCode = response.color;
        chrome.runtime.sendMessage({action:'storeColor',color:colorCode},function(response){
            if(response.result === true)
                drawFloatBox(colorCode+' is added to Color Lib',response.color,'side',-1,-1);
            else
                drawFloatBox('Hmmm for some reason it failed to add this color to Lib..','#ff0000','side',-1,-1);
        });
        drawFloatBox(colorCode+' is added to Color Lib',response.color,'side',-1,-1);
    });
};

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
};

function removeFloatBox(){
    $('div.cursor:last').hide(10, function(){
        $(this).remove();
    });
};



