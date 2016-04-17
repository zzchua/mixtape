define(function(require) {
    var common = require('./common');
    var ref = common.ref;
    var $=require("./jquery");
    $("#send-username").click(function() {
        var handle = $("#handle-input").val();
        var regex = /^[a-zA-Z0-9-_]{5,12}$/;
        if (handle.search(regex) == -1) {
            alert("handle needs to be between 5 and 11 characters");
            window.location = "username.html";
        } else {
            ref.child("users").on("value", function(snapshot) {
                snapshot.forEach(function(data) {
                    if (handle.toLowerCase() === data.handle.toLowerCase()) {
                        alert("username has been taken");
                        window.location = "username.html";
                    }
                });
            });
        }
        var uid = common.getCookies().uid;
        ref.child("users").child(uid).update(
            {
                "handle": handle
            },
            function(error) {
                if (!error) {
                    document.cookie = "handle="+handle
                    window.location = "feed.html";
                } else {
                    alert(error);
                    window.location = "index.html";
                }
            }
        );

    });
});
