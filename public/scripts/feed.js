define(function(require) {
	var common = require("./common");
	var mix = require("./mix");
    document.getElementById("special").onclick = common.logout;
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
	for (var i in mixes) {
		var mix = mixes[i];
		mixTitleDiv.after(mix.getView());
	}
});


