define(function() {
    var common = {
        ref: new Firebase("https://scorching-heat-6803.firebaseio.com")
    };
    window.onload = function() {
	console.log("test");
	function logout() {
	    console.log("loggingout");
	    ref.unauth();
	    Alert("You are logged out!! going back into the login screen");
	    window.location = "index.html";
	}
}
    return common;
});
