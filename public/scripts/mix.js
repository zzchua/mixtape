define(function(require) {
    var common = require('./common');
    var ref = common.ref;
    document.getElementById("sendMixButton").onclick = sendMix;

    function sendMix(receiverId){
    	var receiver = receiverId;
    	var sender = common.getCookies().uid;
    	var songAlbum = document.getElementById("songAlbumInput").value;
    	var artist = document.getElementById("artistInput").value;
    	alert("sending mix " + artist + " " + songAlbum);
    	var mixesRef = ref.child("mixes");
    	var mix = {"recievers":{"receiver":receiver},"sender":sender, 
    		"songAlbum":songAlbum, "artist":artist, "comments":{"comment":""}};
    	mixesRef.push(mix);
    	window.location = "feed.html";
    }
});

