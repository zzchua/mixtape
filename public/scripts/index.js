define(function(require) {
    var common = require('./common');
    var ref = common.ref;
	require(['domReady!'], function(document) {
		// TODO: 2 calls to getAuth, one in common
		var authData = ref.getAuth();
		console.log("Auth Data: " + authData);
		if (authData) {
			// user is logged in, redirect to feed.
			window.location = "feed.html";
		} else {
			document.getElementById("login").onclick = callLogin;
		}
	});

	function callLogin() {
		ref.authWithOAuthPopup("facebook", function(error, authData) {
            if (error) {
                alert("Login Failed!");
            } else {
                var userRef = ref.child("users");
                var uid = authData.uid;
                var name = authData.facebook.displayName;
                var profileImage = authData.facebook.profileImageURL;
                userRef.child(uid).transaction(function(userData) {
                    if (!userData) {
                        return {
                                    displayName: name,
                                    profileImage: profileImage
                                    };
                    } else {
                        alert("Successfully authenticated");
						return userData;
                    }
                });				// 
                // Things to do after auth:
                // set cookie:
                document.cookie = "uid=" + uid;
				userRef.child(uid).once('value', function(snapshot) {
					var missing = (snapshot.val().handle == null);
					if (missing) {
						window.location = "username.html";
					} else {
						window.location = "index.html";
					}
				}, function(error) { console.log(error); });
                // ref.child("users").child(common.getCookies().uid).child("handle").transaction(function(userdata) {
                //      if (userdata) {
                //         return userdata;
                //      } else {
                //         // null or undefined
                //         return "user_handle";
                //      }
                // }, function(error, committed, snapshot) {
                //     if (error) {
                //         window.location = "index.html";
                //     } else {
                //         if (snapshot.val() === "user_handle") {
                //             window.location = "username.html";
                //         } else {
                //             document.cookie = "handle="+snapshot.val();
                //         }
                //     }
                // });
                // redirect to username if not created, else go to feed.
                common.checkHandle();
            }
        });
    }
});

