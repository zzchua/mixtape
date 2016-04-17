define(function(require) {
	var common = require("./common");
	var mix = require("./mix");
	var $ = require("./jquery")
	var ref = common.ref;
	document.getElementById("special").onclick = common.logout;
	var reqsRef = ref.child('requests');
    var recipients = [];
    var artistName = "";
	var trackName = "";
	var coverArt = "";
	var spotifyLink = "";
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
			$("#the-artist-drop").empty();
			result = response.artists.items;
			$("#the-artist-drop").show();
            $.each(result, function(i, val) {
                $("#the-artist-drop").append("<div class='drop-option'>" + result[i]["name"] + "</div>");
                $(".drop-option:last").data("url", result[i]["images"][0]);
            });
			$(".drop-option").click(function() {
		    	artistName = $(this).text();
		    	coverArt = ($(this).data("url").url);
		    	$("#the-artist-drop").empty();
		    	$("#artistInput").val(artistName);
		    });
		});
	}

	$("#the-artist-drop").hide();
	$("#artistInput").keyup(function() {
		$("#the-artist-drop").show();
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
			$("#the-song-drop").empty();
			result = response.tracks.items;
			$("#the-song-drop").show();
            $.each(result, function(i, val) {
                $("#the-song-drop").append("<div class='drop-option'>" + result[i]["name"] + "</div>");
                $(".drop-option:last").data("spotify", result[i]["external_urls"]["spotify"]);
            });
			$(".drop-option").click(function() {
		    	trackName = $(this).text();
		    	spotifyLink = $(this).data("spotify");
		    	$("#the-song-drop").empty();
		    	$("#songInput").val(trackName);

		    });
		});
	}

	$("#the-song-drop").hide();
	$("#songInput").keyup(function() {
		$("#the-song-drop").show();
		var query = $("#songInput").val();
		searchTracks(query);
	});

    document.getElementById("sendMixButton").onclick = function() {
		if(recipients.length > 0){
			for(var i = 0; i < recipients.length; i++){
				console.log(recipients[i], coverArt, spotifyLink);
				mix.sendMix(recipients[i], coverArt, spotifyLink);
			}
			window.location = "feed.html";
		}else{
			//do something here

		}

	};



});


