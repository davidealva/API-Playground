

$(document).ready(function() {
	// set URL for JSON call to API
'use strict';

	var flickerAPI = 'https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?';

	// form submit search term
	$('form').submit(function (e){
		var $submitButton = $('#submit');
		var $searchField = $('#search');
		e.preventDefault();
		$searchField.prop('disabled', true);
		$submitButton.attr('disabled', true).val('Searching.....');
		var term = $searchField.val();
		$('#photos').html('');
			// getJSON call
			$.getJSON( flickerAPI, {
					tags: term,
					format: 'json'
				}, 
			function(data) {
				// need to take data and create HTML to layout each image here. 
				var imageHTML = '';
				var count = 0;
				if (data.items.length > 0) {
					$.each(data.items, function(i, photo) {
						count++;
						if (count === 1) {
		          imageHTML += '<div class="row">';
		        }		
						imageHTML += '<div class="col-md-4 portfolio-item">';
						imageHTML += '<a href="' + photo.link + '">';
		      	imageHTML += '<img class="img-responsive" src="' + photo.media.m + '"></a></div>';
		    
		      	if (count >= 3) {
		      		imageHTML +=	'</div>';
		      		count = 0;
		      	}
					}); // end each
				} else {
					imageHTML = '<p class="bg-warning">No photo matches that search term!...';
				} // end if else
				$('#photos').html(imageHTML);
				$searchField.prop('disabled', false);
      	$submitButton.attr('disabled', false).val('Search');
			}); // end getJSON

	}); //end click	

}); // end ready