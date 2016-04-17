define(function(require) {
	var common = require("./common");
	var mix = require("./mix");
	var $ = require("./jquery")
	var ref = common.ref;
	var reqsRef = ref.child('requests');
    var recipients = [];
    var artistName = "";
	var trackName = "";
	var coverArt = "";
	$(".fa-check-square").click(function() {
    	var userId = $(this).parent().parent().attr('id');
    	recipients = common.updateRecipients(recipients, userId, $(this));
    });

	function searchArtists(query) {
		var jsonresult = "";
		$.ajax({
			url: 'https://api.spotify.com/v1/search',
			data: {
				q: query,
				type: 'artist',
				limit:10
			}
		}).then(function(response) {
			$("#fucking-artist-drop").empty();
			result = response.artists.items;
			$("#fucking-artist-drop").show();
            $.each(result, function(i, val) {
                $("#fucking-artist-drop").append("<div class='drop-option'>" + result[i]["name"] + "</div>");
                $(".drop-option:last").data("url", result[i]["images"][0]);
            });
			$(".drop-option").click(function() {
		    	artistName = $(this).text();
		    	coverArt = ($(this).data("url").url);
		    	$("#fucking-artist-drop").empty();
		    	$("#artistInput").val(artistName);
		    });
		});
	}

	$("#fucking-artist-drop").hide();
	$("#artistInput").keyup(function() {
		$("#fucking-artist-drop").show();
		var query = $("#artistInput").val();
		searchArtists(query);
	});

	function searchTracks(query) {
		var jsonresult = "";
		$.ajax({
			url: 'https://api.spotify.com/v1/search',
			data: {
				q: query + "+" + artistName,
				type: 'track',
				limit:10
			}
		}).then(function(response) {
			$("#fucking-song-drop").empty();
			result = response.tracks.items;
			$("#fucking-song-drop").show();
			console.log(result);
            $.each(result, function(i, val) {
                $("#fucking-song-drop").append("<div class='drop-option'>" + result[i]["name"] + "</div>");
            });
			$(".drop-option").click(function() {
		    	trackName = $(this).text();
		    	$("#fucking-song-drop").empty();
		    	$("#songAlbumInput").val(trackName);

		    });
		});
	}

	$("#fucking-song-drop").hide();
	$("#songAlbumInput").keyup(function() {
		$("#fucking-song-drop").show();
		var query = $("#songAlbumInput").val();
		searchTracks(query);
	});

    document.getElementById("sendMixButton").onclick = function() {
		if(recipients.length > 0){
			for(var i = 0; i < recipients.length; i++){
				console.log(recipients[i]);
				mix.sendMix(recipients[i]);
			}
			window.location = "feed.html";
		}else{
			//do something here
			
		}
		
	};



});


