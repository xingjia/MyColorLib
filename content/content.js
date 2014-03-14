chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        var content = document.getElementsByTagName("img")[0];  
        if (request.action == "getContent"){
            console.log("canvas src:", content.src);
            chrome.runtime.sendMessage({action:"drawContent", image:content.src}, function(response){
                console.log('BG drawContent Done:',response.image);
            });
            sendResponse({image:content.src});
        }
    }
);

