// file:///Users/SamJam/Projects/frogger/index.html

var blockWidth = 101;
var blockHeight = 83;
var cheight = 500;
var radius = 55
var interval = '';

newGame = function(){
    level = 1;
    rows = 3;
    allEnemies =  [];
    count = 30;

    // instantiate game objects
    player = new Player()                   // instantiate player object.
    player.reset()      
}


var Enemy = function() {                        // Enemy constructor
    this.sprite = 'images/enemy-bug.png';
    this.x = -60;
    this.y = (Math.floor(Math.random()*rows) + 0.75 ) * blockHeight ;
    this.speed = 50 + (Math.random()*(200 + (level * 25)) );
};


Enemy.prototype.update = function(dt) {         // Update the enemy's position
    this.x = this.x + this.speed * dt

    // collision handler for meeting player
    // if this.sprite pos + radius == play.location + radius
};


Enemy.prototype.render = function() {           // Draw the enemy on the screen
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


addEnemy = () => {                              // add new enemy function
    if (allEnemies.length > 30) allEnemies.shift();
    allEnemies.push(new Enemy());  
}

    

var Player = function() {                       // Player Constructor
    this.sprite = 'images/char-cat-girl.png';
    this.x = blockWidth * 2;
    this.y = blockHeight * 6 *0.75
    this.lives = 3
};


Player.prototype.update = function(dt) {        // Update the player's position
    this.x = this.x 
    this.y = this.y
    this.checkCollision()                       // call collision detection
    this.thereYet()
};

Player.prototype.checkCollision = function() {  // perform collision detection  
	var self = this;                            // assign this value to access inner scope
    allEnemies.forEach(function(enemy) {
		if ((enemy.y - radius < self.y && self.y < enemy.y + radius) &&
            (enemy.x - radius < self.x && self.x < enemy.x + radius)) {
                self.collision();
                console.log('collision')
		};
	});
}

Player.prototype.thereYet = function(){
    if(this.y < blockHeight / 2){
        level++
        count = 30 - level
        console.log('level = ' + level);
        this.reset()
    }
}


Player.prototype.reset = function() {
    this.x = blockWidth * 2;
    this.y = blockHeight * 6 *.75
    clearInterval(interval)
    interval = window.setInterval(addEnemy, (1500 - (level * 100) ))
    
}

Player.prototype.collision = function() {       // reset player and change lives
        this.reset()        // call reset player
        this.lives --
        console.log('lives = ' + this.lives)
        if (this.lives == 0) newGame();
}


Player.prototype.render = function() {           // Draw the player on the screen
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Player.prototype.handleInput = function(key){      
    switch(key){
        case 'left':
            if(this.x > blockWidth * .5)   this.x = this.x - blockWidth
            break;
        case 'right':
            if(this.x < blockWidth * 4)    this.x = this.x + blockWidth
            break;
        case 'up':
            if(this.y > blockHeight * .2)  this.y = this.y - blockHeight
            break;
        case 'down':
            if(this.y < blockHeight * 4)   this.y = this.y + blockHeight
            break;
    }
}

countDown = () => {         // countDown function to keep track of gameplay time
    count--;
    console.log(count);
    if(count == 0)   newGame(); //  move to somewhere that will break the game
}



document.addEventListener('keyup', function(e) {    // detect user input
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);     // run handle input function with allowed key
});

newGame()
window.setInterval(countDown, 1000)     // run countdown every second    
