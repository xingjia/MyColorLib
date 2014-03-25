var bgInterval;

$(document).ready(function(){
	var background = chrome.extension.getBackgroundPage();
	var favColors = background.loadColorLib(function(response){
		for(var i = 0; i < response.length; i++){
			var listColorDiv = $('<div></div>');
			listColorDiv.css({"background-color": response[i].color,
      						 "width": "10px",
      						 "height":"70px",
      						 "float":"left",
      						 "margin-right":"20px"});
			listColorDiv.addClass('colorDiv');
			//console.log(response[i].date.toUTCString());
			var listItem = $('<b>').hide();
			var textNode = $('<span>'+response[i].color+'</span>');
			textNode.css({
				'color':response[i].color
			});
			listItem.css({
						  "height":"70px",
						  "width":"150px",
						  "margin":"10px",
						  "opacity":"0.8",
						  "padding-left":"0",
						  "padding-right":"10px",
						  "background-color":'white'});
			listItem.addClass('dropshadow');
			listItem.addClass('colorItem');
			listItem.hover(function(){
				listColorDiv.animate
			})
			listItem.append(textNode);
			$('.favList').append(listItem);
			listItem.prepend(listColorDiv);
			listItem.slideDown('slow');	
			
		}

		$('.colorItem').bind('click',changeBGColor());

		//set background color
		var counter = response.length - 1;	
		$('body').css({"background-color": response[counter].color});
		bgInterval = window.setInterval(function(){
			counter --;
    		if(counter < 0) counter = response.length -1;
			$('body').animate({
          		"background-color": response[counter].color,	
        	}, 3000);
		}, 4000);

	});

	

	$('button.clear').click(function(){
		background.clearColorLib(function(response){
			console.log('Library cleared!');
			$('.favList').remove();
		});
	});
}); 

function changeBGColor(color){
	$('body').css({'background-color':color});
	window.clearInterval(bgInterval);
	console.log(color);
}