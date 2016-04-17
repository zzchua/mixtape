define(function(require) {
    var common = require('./common');
    var ref = common.ref;
    var $=require("./jquery");
    require(['domReady!'], function(document) {
        $("#send-username").click(function() {
            var handle = $("#handle-input").val();
            var regex = /^[a-zA-Z0-9-_]{5,12}$/;
            alert("YOOLLOLLOL");
            if (handle.search(regex) == -1) {
                alert("handle needs to be between 5 and 11 characters");
            } else {
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
            }
        });
    });
});
