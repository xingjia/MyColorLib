$(document).ready(function() {   
    $("#color-lib-btn").click(function(){
    	chrome.tabs.create({'url':chrome.extension.getURL('myLib/myLib.html')},function(tab){});
    });
    var bg = chrome.extension.getBackgroundPage();
    bg.getLastUsedStates(function(response){  
        $('#my-checkbox').bootstrapSwitch('state',!response);
        $("#my-checkbox").click();
        $('#my-checkbox').on('switchChange', function (e, data) {
        	cbValue = data.value;
        	if(cbValue == true){
        		//send MSG to content script
        		chrome.tabs.query({active:true,currentWindow:true}, function(tabs){
    				chrome.tabs.sendMessage(tabs[0].id,{action:'getContent'}, function(response){
    					chrome.tabs.executeScript(null, {file: "Lib/jquery.js"}, function() {
        					chrome.tabs.executeScript(null, {file: "content/float.js"},function(){
                                console.log('float script injected');
                            });
    					});
    				});
    			});

                chrome.runtime.sendMessage({action:'switch'},function(){});
        	}
            else{
                chrome.tabs.query({active:true,currentWindow:true}, function(tabs){
                        chrome.tabs.executeScript(null, {file: "Lib/jquery.js"}, function() {
                            chrome.tabs.executeScript(null, {file: "content/removefloat.js"},function(){
                                console.log('float script removed');
                            });
                        });
                });
                chrome.runtime.sendMessage({action:'switch'},function(){});
            }
    	});
    });
});