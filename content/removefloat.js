drawFloatBox('Eyedropper Mode Off', '#ff0000','side', -1, -1);

var imageObj = new Image();
imageObj.src = image;
$('body').append(imageObj);
$('canvas.picker').unbind();
$('canvas.picker').remove();
$('div.cursor').remove();