define(function(require) {
    var common = require('./common');
    var ref = common.ref;
    var authData = ref.getAuth();
    if (authData) {
        // user is logged in:
        window.location = "feed.html";
    } else {
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
                // redirect to feed after login:
    
            }
        });
    }
});

