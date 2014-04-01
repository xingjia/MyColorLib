var image;
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.action == "getContent"){
            var content = document.getElementsByTagName("img")[0];
            var imageObj = new Image();
            imageObj.src = content.src;
            image = content.src;
            var canvas = document.createElement("canvas");
            canvas.classList.add('picker');
            document.body.appendChild(canvas);
            var context = canvas.getContext('2d');
            imageObj.onload = function(){
                canvas.width = imageObj.width;
                canvas.height = imageObj.height;
                context.drawImage(imageObj,0,0);
                console.log('draw!');
            };
            document.body.removeChild(content);
            sendResponse({image:content.src});
        }
        if(request.action === "getState"){
            if($('canvas.picker').length > 0){
                console.log('state in content is true!');
                sendResponse({state:true});
            }
            console.log('state in content is false!');
            sendResponse({state:false});
        }
    }
);

