define(function(require) {
    var common = require('./common');
	var $ = require('./jquery');
    var ref = common.ref;

    function check(x) {
		if (x === undefined) {
			throw x.toString() + " is undefined";
		}
		return x;
	}

    function sendMix(receiverId, coverArt){
    	var sender = common.getCookies().uid;
    	var songAlbum = document.getElementById("songAlbumInput").value;
    	var artist = document.getElementById("artistInput").value;
    	//alert("sending mix " + artist + " " + songAlbum);
    	var mixesRef = ref.child("mixes");
    	var message = document.getElementById("messageInput").value;	
    	var mix = {"recievers":receiverId,"sender":sender, 
    		"songAlbum":songAlbum, "artist":artist, "comments":{"comment":""}, "message":message, "cover":coverArt};
    	mixesRef.push(mix);
	}

    function createMix(){
		var mix = {"album":"Sgt. Pepper's Lonely Hearts Club Band","artist":"The Beatles","comments":"","message":"EEEEEEK","reciever":1,"sender":2,"track":"With a Little Help From My Friends"} ;
	}

    function Mix(obj) {
		this.album = check(obj.album);
		this.artist = check(obj.artist);
		this.comments = check(obj.comments);
		this.message = check(obj.message);
		this.reciever = check(obj.reciever);
		this.sender = check(obj.sender);
		this.track = check(obj.track);
    }

	var userCircleDiv =
		$('<div class="user-circle"><img src="https://scontent-sjc2-1.xx.fbcdn.net/hphotos-xfp1/v/t1.0-9/12715794_1150327101644297_1371427251795969270_n.jpg?oh=f49c9852eb090c3aa04516d089c7ccb7&oe=57BE0CC5"/></div>');
	Mix.prototype = {
		toString: function() {
			return JSON.stringify(this);
		},

		getView: function() {
			var nameHeader = ($("<div>", {class: "name-header"})).append(
				$("<div>", {class: "user"}).append(userCircleDiv),
				($("<div>", {class: "user-name"}).append($("<h1>").text(this.sender))));
			var mixDetail = ($("<div>", {class: "mix-detail"})).append(
				($("<div>", {class: "cover"})).append(
					'<img src="http://s3.amazonaws.com/uploads.prod.gobigwin.com/app/public/spree/products/1724/original/tokyopc_champ_cd.png?1368737706" />'),
				($("<div>", {class: "detail-text"})).append(
						($("<h1>").text(this.artist)),
						$("<h2>").text(this.album)),
				($("<div>", {class: "redirect"})).append(
					($("<div>", {class: "redirect-icon"}))));
					
			var view = $("<div>", {class: "mix"}).append(
				nameHeader,
				mixDetail);

			return view;
		}
	}
	return {
		sendMix: sendMix,
		createMix: createMix,
		Mix: Mix
	};
});
