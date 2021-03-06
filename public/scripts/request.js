define(function(require) {
	require(['domReady!'], function(document) {
		var common = require('./common');
		var ref = common.ref;
		// common.loginRedirect();
		var reqsRef = ref.child('requests');
		var recipients = [];
		$(".fa-check-square").click(function() {
			var userId = $(this).parent().parent().attr('id');
			recipients = common.updateRecipients(recipients, userId, $(this));
		});

		$("#request-form").submit(function() {
			var reqMessage = $("#req-message").val()
			var uid = common.getCookies().uid;
			common.sendRequests(uid, recipients, reqMessage);
			recipients = [];
		});
	});
});

