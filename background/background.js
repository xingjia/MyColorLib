var on = false;
$(document).ready(function() {
	console.log('BG first load. On:',on);
	var x = 0
		, y = 0;
	var favColors = [];

  	chrome.runtime.onMessage.addListener(
  		function(request, sender, sendResponse) {
    		if (request.action == "drawContent"){
				imageObj.src = request.image;
				imageObj.onload = function(){
					canvas.width = imageObj.width;
					canvas.height = imageObj.height;
					context.drawImage(imageObj,0,0);
				}
				sendResponse({image:imageObj.src});
			}
			if (request.action == "getCursor"){
				x = request.x;
				y = request.y;
				var pixel = context.getImageData(x, y, 1, 1).data;
				var hex = "#" + ("000000" + rgbToHex(pixel[0], pixel[1], pixel[2])).slice(-6);
				sendResponse({color:hex});
			}
			if(request.action == "storeColor"){
				console.log(request.action);
				var now = new Date();
				var color = {'color':request.color,'date':now};
				console.log(color);
				saveColor(color);
				sendResponse({result:true});
			}
			if(request.action == "switch"){
				on = !on;
				console.log("On switched to:",on);
				sendResponse();
			}
		}
  	); 	
});


function rgbToHex(r, g, b) {
	if (r > 255 || g > 255 || b > 255)
	    throw "Invalid color component";
	return ((r << 16) | (g << 8) | b).toString(16);
}

function loadColorLib(callback){
	chrome.storage.sync.get('favColors',function(response){
		console.log('favColors loaded:', response.favColors);
		if((typeof response.favColors) !== 'undefined'){
			console.log('sent to popup:', response.favColors);
			callback(response.favColors);
		}
		else{
			callback([]);
		}
	});
}

function saveColor(color){
	loadColorLib(function(favColors){
		favColors.unshift(color);
		if(favColors.length > 10)
			favColors.splice(10);
		chrome.storage.sync.set({'favColors': favColors}, function() {});
	});
}

function clearColorLib(callback){
	chrome.storage.sync.set({'favColors':[]},function(){});
	if(callback)
		callback();
}

function removeColor(color, callback){
	chrome.storage.sync.get('favColors',function(response){
		var lib = response.favColors;
		lib.splice(lib.indexOf(color),1);
		chrome.storage.sync.set({'favColors':lib}, function(response){
			console.log('Color ', color, ' removed.');
			callback(lib);
		});
	});
}

function getLastUsedStates(callback){
	callback(on);
}

