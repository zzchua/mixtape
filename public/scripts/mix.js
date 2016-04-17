define(function(require) {
    var common = require('./common');
    var ref = common.ref;
    document.getElementById("sendMixButton").onclick = sendMix;

    function sendMix(){
    	var reciever = "facebook:10156785213465257";
    	var sender = "facebook:10156785213465257";
    	var songAlbum = document.getElementById("songAlbumInput").value;
    	var artist = document.getElementById("artistInput").value;
    	alert("sending mix " + artist + " " + songAlbum);
    	var mixesRef = ref.child("mixes");
    	var mix = {"recievers":{"reciever":reciever},"sender":sender, 
    		"songAlbum":songAlbum, "artist":artist, "comments":{"comment":""}};
    	mixesRef.push(mix);
    	window.location = "feed.html";
    }
});

