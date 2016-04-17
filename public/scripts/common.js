define(function() {
	var ref = new Firebase("https://scorching-heat-6803.firebaseio.com");
		var common = {
			ref: ref,
			logout: (function logout() {
						console.log("loggingout");
						ref.unauth();
						alert("You are logged out!! going back into the login screen");
						window.location = "index.html";
					}),
			updateRecipients: (function updateRecipients(recipients, userId, user) {
						if ($(user).hasClass("active")) {
							$(user).removeClass("active");
							$(user).css("color","#ddd");
							recipients.splice($.inArray(userId, recipients), 1);
							console.log(recipients);
						} else {
							$(user).addClass("active");
							$(user).css("color","#6b2a5f");
							recipients.push(userId);
							console.log(recipients);
						}
					return recipients;
				}),
			sendRequests: (function sendRequests(recipients, reqMessage) {
					var reqsRef = ref.child('requests');
					$.each(recipients, function(i, val) {
						reqsRef
						.push({
						    sender: 'facebook:10156785213465257',
						    receiver: val,
						    message: reqMessage
						});
					});
			})
		}
	return common;
});
