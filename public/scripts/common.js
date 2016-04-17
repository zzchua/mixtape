define(function() {
	var ref = new Firebase("https://scorching-heat-6803.firebaseio.com");

	// if no cookies set and logged in, set cookie
	if (!document.cookie) {
		var authData = ref.getAuth();
		if (authData) {
			document.cookie = "uid="+authData.uid;
		}
	}
	var common = {
			ref: ref,
		logout: (function logout() {
					console.log("loggingout");
					ref.unauth();
					alert("You are logged out!! going back into the login screen");
					// delete cookies on logout:
					document.cookie = "uid=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
					window.location = "index.html";
			}),
		getCookies: (function () {
					var cookieObject = {};
					var cookieArray = document.cookie.split(";");
					for (var i = 0; i < cookieArray.length; i++) {
						var keyVal = cookieArray[i].split("=");
						if (keyVal) {
							cookieObject[keyVal[0]] = keyVal[1];
						}
					}
					return cookieObject;
					/*
					{
						uid: "123",
						other_cookie: cookie_val
					}
					*/
		})
	}
	return common;
});
