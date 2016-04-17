define(function(require) {
    var common = require('./common');
    var ref = common.ref;
    var $=require("./jquery");
    $("#send-username").click(function() {
        var handle = $("#handle-input").val();
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
