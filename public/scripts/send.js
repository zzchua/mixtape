define(function(require) {
	var common = require("./common");
	var mix = require("./mix");
    document.getElementById("sendMixButton").onclick = function() {
		mix.sendMix();
	};
});


