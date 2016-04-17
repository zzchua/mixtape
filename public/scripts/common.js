define(function() {
    var ref = new Firebase("https://scorching-heat-6803.firebaseio.com");
    // if no cookies set and logged in, set cookie
    if (!document.cookie) {
        var authData = ref.getAuth();
        if (authData) {
            document.cookie = "uid="+authData.uid;
        }
    }

    function checkHandle() {
        ref.child("users").child(getCookies().uid).child("handle").transaction(function(userdata) {
             return userdata;
        }, function(error, committed) {
            if (error) {
                window.location = "index.html";
            } else {
                if (committed) {
                    window.location = "feed.html";
                } else {
                    window.location = "username.html";
                }
            }
        });
    }

    function getCookies() {
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
    }

    var common = {
        ref: ref,
        logout: (function logout() {
                    console.log("loggingout");
                    ref.unauth();
                    alert("You are logged out!! going back into the login screen");
                    window.location = "index.html";
                }),
        updateRecipients: (function updateRecipients(recipients, userId, user) {
                    if ($(user).hasClass("active")) {
                        $(user).removeClass("active");
                        $(user).css("color","#ddd");
                        recipients.splice($.inArray(userId, recipients), 1);
                        console.log(recipients);
                    } else {
                        $(user).addClass("active");
                        $(user).css("color","#6b2a5f");
                        recipients.push(userId);
                        console.log(recipients);
                    }
                return recipients;
            }),
        sendRequests: (function sendRequests(recipients, reqMessage) {
                var reqsRef = ref.child('requests');
                $.each(recipients, function(i, val) {
                    reqsRef
                    .push({
                        sender: 'facebook:10156785213465257',
                        receiver: val,
                        message: reqMessage
                    });
                });
            }),
        getCookies: getCookies,
        checkHandle: checkHandle
    }
    return common;
});
