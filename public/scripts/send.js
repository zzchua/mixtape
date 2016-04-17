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
    $(".fa-check-square").click(function() {
        var userId = $(this).parent().parent().attr('id');
        recipients = common.updateRecipients(recipients, userId, $(this));
    });

    var keyVal = window.location.search.replace("?", "");
    var arr = keyVal.split("=");
    var recipientId = arr[1];
    var box = $("#"+recipientId).find("i");
    recipients = common.updateRecipients(recipients, recipientId, box);


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
                $("#songInput").val(trackName);

            });
        });
    }

    $("#fucking-song-drop").hide();
    $("#songInput").keyup(function() {
        $("#fucking-song-drop").show();
        var query = $("#songInput").val();
        searchTracks(query);
    });

    document.getElementById("sendMixButton").onclick = function() {
        if(recipients.length > 0){
            for(var i = 0; i < recipients.length; i++){
                console.log(recipients[i], coverArt);
                mix.sendMix(recipients[i], coverArt);
            }
            window.location = "feed.html";
        }else{
            //do something here

        }

    };



});


