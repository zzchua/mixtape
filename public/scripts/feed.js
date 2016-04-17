define(function(require) {
	var common = require("./common");
	var ref = common.ref;
	// check if logged in:
	common.loginRedirect();

	var mix = require("./mix");
    	document.getElementById("special").onclick = common.logout;
	//function getFeed(){
	var tempMix = new mix.Mix({
	"album":"Sgt. Pepper's Lonely Hearts Club Band",
	"artist":"The Beatles",
	"comments":"",
	"message":"EEEEEEK",
	"reciever":1,
	"sender":2,
	"track":"With a Little Help From My Friends"});
	var mixTitleDiv = $("#mixTitle");
	var mixes = [tempMix];
	var mixRef = ref.child("mixes");
	var artist = "";
	console.log(common.getCookies().uid);
	mixRef.orderByChild("recievers").equalTo(common.getCookies().uid).on("value", function(snapshot) {
			console.log(snapshot.key());
			//TODO
			/*
			Doesn't show track
			*/
			snapshot.forEach(function(data) {
			 	fields = data.val();
			 	artist = fields.artist;
		 		console.log(fields.artist);
	 	 		var mixtape = new mix.Mix({
		 		"album":"",
				"artist":fields.artist,
				"comments":"",
				"message":fields.message,
				"reciever":fields.recievers,
				"sender":fields.sender,
				"track":fields.songAlbum
		 		});
		 		mixes.push(mixtape);

			 });
			for (var i in mixes) {
				var m = mixes[i];
				console.log(m);
				mixTitleDiv.after(m.getView());
			}
	});

	//}
});


