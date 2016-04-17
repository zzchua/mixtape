const ref = new Firebase("https://scorching-heat-6803.firebaseio.com");

function createMixObject(){
	var mix  = {sender: 2, reciever: 1, album:"Sgt. Pepper's Lonely Hearts Club Band", 
		artist:"The Beatles", track:"With a Little Help From My Friends", message:"EEEEEEK", 
		comments:""};
	ref.push(mix);
}