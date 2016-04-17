define(function(require) {
    var common = require('./common');
    var $ = require('./jquery');
    var ref = common.ref;
    function check(x) {
        // if (x === undefined) {
        //  throw "x is undefined";
        // }
        return x;
    }

    function sendMix(receiverId, coverArt, spotify){
        var sender = common.getCookies().displayName;
        var songAlbum = document.getElementById("songInput").value;
        var artist = document.getElementById("artistInput").value;
        //alert("sending mix " + artist + " " + songAlbum);
        var mixesRef = ref.child("mixes");
        var message = document.getElementById("messageInput").value;
        var mix = {"recievers":receiverId,"sender":sender,
            "songAlbum":songAlbum, "artist":artist, "comments":{"comment":""}, "message":message, "cover":coverArt, "spotify":spotify};
        mixesRef.push(mix);
    }


    function Mix(obj) {
        this.album = check(obj.album);
        this.artist = check(obj.artist);
        this.comments = check(obj.comments);
        this.message = check(obj.message);
        this.reciever = check(obj.reciever);
        this.sender = check(obj.sender);
        this.track = check(obj.track);
        this.cover = check(obj.cover);
        this.spotify = check(obj.spotify);
    }

   
    Mix.prototype = {
        toString: function() {
            return JSON.stringify(this);
        },

        getView: function() {
            var pic = this.album;
            var userCircleDiv = $('<div class="user-circle"><img src='+pic+'></div>');
            var nameHeader = ($("<div>", {class: "name-header"})).append(
                $("<div>", {class: "user"}).append(userCircleDiv),
                ($("<div>", {class: "user-name"}).append($("<h1>").text(this.sender))));
            var mixDetail = ($("<div>", {class: "mix-detail"})).append(
                ($("<div>", {class: "cover"})).append(
                    '<img src='+this.cover+' />'),
                ($("<div>", {class: "detail-text"})).append(
                        ($("<h1>").text(this.artist)),
                        $("<h2>").text(this.track),$("<h3>").text(this.message)),
                ($("<div>", {class: "redirect"})).append(
                    ($("<div>", {class: "redirect-icon"}))));
            var commentTail = ($("<div>",{class : "comment"})).append(
                    $("<input>",{class:"inputs", type:"text", placeholder:"Comment here..."}),
                    $("<div>",{class:"send"}).append(
                        $("<input>",{type:"submt", class:"send-btn", value:"Send"})
                    )
                );
            var view = $("<a target='_blank' class='no-line' href='" + this.spotify + "'/>").append(
            $("<div>", {class: "mix"}).append(
                nameHeader,
                mixDetail,
                commentTail
                )
            );


            return view;
        }

    }
    return {
        sendMix: sendMix,
        Mix: Mix
    };
});
