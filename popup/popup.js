$(document).ready(function() { 
    //background.clearColorLib(function(){console.log('Cleared!');});
    $('body').contextmenu(function(){return false;}); 

    chrome.tabs.query({active:true,currentWindow:true},function(tabs){
        chrome.tabs.sendMessage(tabs[0].id,{action:'getState'},function(response){
            if(typeof response !== 'undefined'){
                console.log('state:',response.state);
                $('#my-checkbox').bootstrapSwitch('state', !response.state);
            }
            else{
                console.log('content script returned state undefined');
                $('#my-checkbox').bootstrapSwitch();
            }

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
                        chrome.tabs.executeScript(null, {file: "content/removefloat.js"},function(){
                            console.log('float script removed');
                        });
                    });
                    chrome.runtime.sendMessage({action:'switch'},function(){});
                }
            });
        });

    });
    
    chrome.runtime.getBackgroundPage(function(background){
        background.loadColorLib(function(response){
            console.log('myLib favColors:', response.length);
            if(response.length > 0){
                var desc = $('<hr><h4>My palette</h4><p><img src="left.png">Copy the color code <img src="right.png">Delete.</p>');
                $('.palette').append(desc);
                console.log('1111');
            }
            var upper = response.length > 15 ? 15: response.length;
            for(var i = 0; i < upper; i++){
                var listColorDiv = $('<div>');
                listColorDiv.addClass('colorDiv');
                listColorDiv.css('background-color',response[i].color);
    /*            listColorDiv.click(function(){
                    listColorDiv.css('background-color','black');
                    console.log(listColorDiv.css('background-color'));
                });*/
                $('.favList').append(listColorDiv);
            }
            $('.colorDiv').each(function(){
                /*RGB to hex*/
                var color = $(this).css('background-color');
                    color = color.substring(4, color.length-1).split(',');
                    color = '#' + background.rgbToHex(color[0],color[1],color[2]);
                $(this).mousedown(function(e){
                    if(e.button === 0){
                        console.log(color);
                        copyToClipboard(color);
                        var icon = $('<span class="glyphicon glyphicon-check"</span>');
                        $('span',this).remove();
                        $(this).append(icon);
                    }
                    if(e.button === 2){
                        console.log(color);
                        background.removeColor(color,console.log('Removed.'));
                        $(this).remove();
                        if($('.colorDiv','.favList').length === 0){
                            $('.favList').append($('<div>No color left...</div>'));
                        }
                        //if($('.colorDiv','.favList') === undefined)
                    }
                });
                $(this).mouseenter(function(){
                    $(this).addClass('open');
                });
                $(this).mouseout(function(){
                    $(this).removeClass('open');
                    $('span', this).remove();
                });
            });
        });
    });

    /*$('.colorDiv').on('click',function(){
        $('.colorDiv').css('background-color','black');
        window.alert('!!');
    });*/

});

function copyToClipboard(text){
    var copyDiv = document.createElement('div');
    copyDiv.contentEditable = true;
    document.body.appendChild(copyDiv);
    copyDiv.innerHTML = text;
    copyDiv.unselectable = "off";
    copyDiv.focus();
    document.execCommand('SelectAll');
    document.execCommand("Copy", false, null);
    document.body.removeChild(copyDiv);
}