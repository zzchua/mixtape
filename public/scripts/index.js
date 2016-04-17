define(function(require) {
    var common = require('./common');
    var ref = common.ref;
    // TODO: 2 calls to getAuth, one in common
    var authData = ref.getAuth();
    document.getElementById("login").onclick = callLogin;
    if (authData) {
        // user is logged in, redirect to feed.
        window.location = "feed.html";
    }

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
                        alert("user exists in db");
                    }
                });
                // Things to do after auth:
                // set cookie:
                document.cookie = "uid=" + authData.uid;
                // redirect to feed after login:
                window.location = "feed.html";
            }
        });
    }

});

