//create moongame name space to hold all game variables
//use revealing module pattern with IIFE
var MoonGame = (function() {
 
 // constants
var NUM_BIRDS = 20;
var MAX_TOP = 60;
var MAX_LEFT = 90;

//bird constructor
var Bird = function(){
}
Bird.prototype.create = function(){
	this.el = $('<i class="icon-twitter-bird bird">');
	this.el.css({
		top: Math.random() * MAX_TOP + '%',
		left: Math.random() * MAX_LEFT + '%',
	})
	return this.el
}
//Bird.prototype.addClickHandler = function(){

//}


// penguin constructor
var Penguin = function(){
}
	Penguin.prototype.create = function(){
		this.el = $('<i class="icon-plancast penguin">');
		return this.el;
	}

// flock constructor

var Flock = function(penguin){
	this.penguin = penguin;
	this.birds = [];
}

Flock.prototype.create = function(){
	var newEl = $('<div class="flock">');
	newEl.append(this.penguin.create());
	newEl.css('bottom', this.birds.length * 5)
      //append all birds to flock
	 for (var i = 0; i < this.birds.length; i++) {
			newEl.append(this.birds[i].el);
	 	};
   
      //replace old birds with new birds
    if (this.el){
    	this.el.replaceWith(newEl)
    }
    this.el = newEl;

	return newEl;
}
Flock.prototype.addBirdClickHandler = function(bird){
 var self = this;
	bird.el.on('click', function(){
		self.birds.push(bird)
		self.create()
	})
};

	//declare array of free flying birds
var birds = [];
var flock = null;


	var init = function(){
	  	 //create the flock
	  	 var penguin = new Penguin();
	  		flock = new Flock(penguin);	  
	  		$('.sky').append(flock.create());

		//create birds in sky
	  	for (var i = 0; i <NUM_BIRDS; i++) {
			var bird = new Bird();
			var birdEl = bird.create();
			$('.sky').append(birdEl);
			birds.push(bird);
			flock.addBirdClickHandler(bird);
	  	}	
	}

	  //return object literal with the properties and methods
	  //we wish to 'reaveal' to the rest of the program. 
	  //everything else remains provate
   		return{
   			init: init
 		}
 	
})();


$(document).on('ready', function() {
  MoonGame.init();
});