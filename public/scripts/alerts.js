define(function(require) {
    function alertView(alert, alertId, sender, senderId) {
        var view = $("<div>", { class: "pending-mix" });
        var planeButton = $("<i>", {id:alertId, class:"fa fa-paper-plane fa-2x", "aria-hidden":"true" });
        planeButton.click(function() {
            window.location = "send.html?recipientId="+senderId;
        })
        var nameHeader = $("<div>", { class: "name-header" }).append(
            $("<div>", { class: "user" }).append(
                $("<div>", { class: "user-circle" }).append(
                    $("<img>", { src: sender.profileImage }))),
            $("<div>", { class: "user-name" }).append($("<h1>").text(
                sender.displayName)));
        var message = $("<div>", { class: "message" }).append(
            $("<div>", { class: "message-text" }).text(alert.data.message),
            $("<div>", { class: "send" }).append(
                $("<input>", { type: "submit", class: "send-btn", value: "" }),
                planeButton));
        view.append(nameHeader, message);
        return view;
    }
    require(['domReady!'], function(document) {
        var $ = require('./jquery');
        var common = require('./common');
        var ref = common.ref;
        var usersRef = ref.child("users");
        // common.loginRedirect();
        var uid = common.getCookies().uid;
        usersRef.child(uid).child("alerts").once("value", function(snapshot) {
            var alerts = snapshot.val();
            for (var key in alerts) {
                var senderUID = alerts[key].alert.data.uid;
                usersRef.child(senderUID).once("value", function(snap) {
                    console.log(senderUID);
                    $("#pendingMixes").after(alertView(alerts[key].alert, key, snap.val(), senderUID));
                });
            }
        });
    });
});

