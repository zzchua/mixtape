define(function() {
	var ref = new Firebase("https://scorching-heat-6803.firebaseio.com");
		var common = {
				ref: ref,
			logout: (function logout() {
						console.log("loggingout");
						ref.unauth();
						alert("You are logged out!! going back into the login screen");
						window.location = "index.html";
				})
	}
	return common;
});
