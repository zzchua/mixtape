define(function(require) {
	var common = require("./common");
	var mix = require("./mix");
	var $ = require("./jquery")
	var ref = common.ref;
	var reqsRef = ref.child('requests');
    var recipients = [];
	$(".fa-check-square").click(function() {
    	var userId = $(this).parent().parent().attr('id');
    	recipients = common.updateRecipients(recipients, userId, $(this));
    });
    

    document.getElementById("sendMixButton").onclick = function() {
		for(var i = 0; i < recipients.length; i++){
			console.log(recipients[i]);
			mix.sendMix(recipients[i]);
		}
		window.location = "feed.html";
	};


});


