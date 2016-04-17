define(function(require) {
	var common = require("./common");
	var ref = common.ref;
	// check if logged in:
	common.loginRedirect();
	var mix = require("./mix");
    	document.getElementById("special").onclick = common.logout;
	//function getFeed(){
	var mixTitleDiv = $("#mixTitle");
	var mixes = [];
	var mixRef = ref.child("mixes");
	var artist = "";

	mixRef.orderByChild("recievers").equalTo(common.getCookies().uid).on("value", function(snapshot) {
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
				"track":fields.songAlbum,
				"cover":fields.cover
		 		});
		 		mixes.push(mixtape);

			 });
			for (var i in mixes) {
				var m = mixes[i];
				mixTitleDiv.after(m.getView());
			}
	});

});
	// var key = 'Pqq7htFKTNqvmONAbRq42OtxENNzi8jPhb4AEMnH';
	// var uid = common.getCookies().uid;
	// $.ajax({
	// 		//var key = 'Pqq7htFKTNqvmONAbRq42OtxENNzi8jPhb4AEMnH';
	// 		url: 'https://scorching-heat-6803.firebaseio.com/mixes.json?orderBy=%22$key%22&print=pretty&auth='+key,
	// 		//url: 'https://scorching-heat-6803.firebaseio.com/mixes.json?orderBy=%22artist%22&print=pretty&auth='+key,
	// 	}).then(function(response) {
	// 		console.log(response);
	// 		var items=[];
 //            $.each(response, function(i, val) {
                //items.push("<div class='mix'><div class='name-header'><div class='user'><div class='user-circle'><img src='https://scontent-sjc2-1.xx.fbcdn.net/hphotos-xfp1/v/t1.0-9/12715794_1150327101644297_1371427251795969270_n.jpg?oh=f49c9852eb090c3aa04516d089c7ccb7&oe=57BE0CC5'/></div></div><div class='user-name'><h1>Gibby Pena</h1></div></div><div class='mix-detail'><div class='cover'><img src='" + response[i].cover + "' /></div><div class='detail-text'><h1>" + response[i].artist + "</h1><h2>" + response[i].songAlbum + "</h2></div><div class='redirect'><div class='redirect-icon'></div></div></div><div class='comment'><input type='text' class='inputs' placeholder='Comment here...' /><div class='send'><input type='submit' class='send-btn' value='Send'></div></div><div class='accent'></div>");
 //            });
 //            $.each(items, function(i, val) {
 //            	$("#mixTitle").after(items[i]);
 //            });
 //            console.log(items);
	// 	});
	// });


