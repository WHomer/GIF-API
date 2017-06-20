
//array of new buttons to be loaded on init
var gifButtons = [
	'cats',
	'dogs',
	'birds',
	'fish',
	'trees',
	'flowers'
]



//connect to giphy api
function gifCall(searchTerm) {
	$.ajax({
		url: 'http://api.giphy.com/v1/gifs/search?q='+searchTerm+'&api_key=dc6zaTOxFJmzC&limit=10'
	}).done(function(giphy){
		//loop through giphy array, from response of ajax call.
		for (var i=0; i < giphy.data.length; i++){
			//store giphy url of that single gif
			var giphyURL = giphy.data[i].images.fixed_height.url;
			var giphyStill = giphy.data[i].images.fixed_height_still.url;
			var giphyRating = giphy.data[i].rating;
			//create an img element and add in url
			var giphyImage = $('<img class="gif" src="' + giphyStill + '">');
			giphyImage.attr('data-url', giphyURL);
			giphyImage.attr('data-still', giphyStill);
			giphyImage.attr('data-status', 'still');
			//append img to container
			$('.js-giphy-container').prepend(giphyImage);
			console.log(giphy);
		}
		//add click event
		gifClick();
	});
}

//runs on page load
function init() {
	for(var i=0; i < gifButtons.length; i++){
		createButton(gifButtons[i]);
	}
	clickSearch();
}

//function for creating the buttons on the page
function createButton(string) {
	//creates the new button
	var newButton = $('<input class="search-button" type="button" value="'+string+'">');
	//append the new button to the screen
	$('.js-button-container').prepend(newButton);
}

//runs the on click setting each time a new button is added
function clickSearch() {
	$('.search-button').on('click', function(){
		//clear js-giphy-container
		$('.js-giphy-container').empty();
		//store button name
		var buttonName = $(this).val().trim();
		//call giphy api with name
		gifCall(buttonName.trim());
	})
}

//on gif click toggle between still and gif
function gifClick() {
	$('.gif').on('click', function(){
		var gif = $(this);
		var gifStatus = gif[0].dataset.status;
		//change the static image to url when clicked
		if (gifStatus==='still'){
			gif.attr('data-status', 'url');
			gif.attr('src', gif[0].dataset.url);
			
		}else if (gifStatus==='url'){
			gif.attr('src', gif[0].dataset.still);
			gif.attr('data-status', 'still');
		}
		
	})
}

//on submit do something
$(".js-submit").on('click', function(){
	//prevents the default click event on the submit button
	event.preventDefault();
	//stores user input
	var userInput = $(".js-user-input").val().trim();
	//calls createButton function and passes userInput
	createButton(userInput);
	//sets the on click value listener
	clickSearch();
	//clear the user input after submit
	$('.js-user-input').val('');
});

//run init value
init();
