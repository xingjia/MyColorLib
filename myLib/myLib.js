$(document).ready(function(){
	var background = chrome.extension.getBackgroundPage();
	var favColors = background.loadColorLib(function(response){
		console.log(response);
		for(var i = 0; i < response.length; i++){
			var listColorDiv = $('<div></div>');
			listColorDiv.css({"background-color": response[i],
      						 "width": "50px",
      						 "height":"50px",
      						 "float":"left",
      						 "margin-right":"20px"});
			var listItem = $('<b>'+response[i]+'</b><br>').hide();
			listItem.css({"color":response[i],
						  "height":"50px",
						  "margin":"5px"});
			$('.favList').append(listItem);
			listItem.prepend(listColorDiv);
			listItem.show('slow');				
		}
	});
}); 