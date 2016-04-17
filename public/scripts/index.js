(function() {
    window.onload = function() {
        var ref = new Firebase("https://scorching-heat-6803.firebaseio.com");
        var authData = ref.getAuth();
        if (authData) {
            // user is logged in:
            window.location = "feed.html";
        } else {
            // user not logged in, popup facebook login:
            ref.authWithOAuthPopup("facebook", function(error, authData) {
                if (error) {
                    alert("Login Failed!");
                } else {
                    console.log("Authenticated successfully with payload:", authData);
                    var uid = authData.uid;
                    // if (ref.child("users").child("uid").on
                    // redirect to feed after login:
                    window.location = "feed.html";
                }
            });
        }
    };
})();

