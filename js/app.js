//random integer generator. Used to generate random enemy speeds
//credit: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    //the x & y location of the enemy on the canvas
    this.x = x;
    this.y = y;
    // the speed of the movement of the enemy
    this.speed = speed;

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    //console.log("enemyUpdateMethod");
    //console.log(this);

    //moves the enemy character(s).
    // movement is multiplied by the dt parameter to emsure movement is at the same speed on all computers
    this.x += this.speed * dt;

    // resets the enemy position if it leaves the canvas
    if (this.x > 510) {
    this.x = -80;
  }

    this.checkCollision();
};

//checks for collisions between the enemies & the player
//credit: based on https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
Enemy.prototype.checkCollision = function() {
    var rect1 = {x: this.x, y: this.y, width: 50, height: 50};
    var rect2 = {x: player.x, y: player.y, width: 50, height: 50};

    if (rect1.x < rect2.x + rect2.width &&
       rect1.x + rect1.width > rect2.x &&
       rect1.y < rect2.y + rect2.height &&
       rect1.height + rect1.y > rect2.y) {
        // collision detected!
        //console.log("collision");
        player.x = 200;
        player.y = 400;
}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

//the player character that must avoid the enemies
var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};

Player.prototype.update = function() {

};

//draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//controls the movement of the player based on use of arrow keys
Player.prototype.handleInput = function(move) {
    //left arrow key moves player to the left, provided the player is within the canvas
    if (move === 'left' && this.x > -2) {
      //console.log('left');
      this.x -= 101;
    }

    //right arrow key moves player to the right, provided the player is within the canvas
    if (move === 'right' && this.x < 402) {
      //console.log('right');
      this.x += 101;
    }

    //down arrow key moves player down, provided the player is within the canvas
    if (move === 'down' && this.y < 400) {
      //console.log('down');
      this.y += 90;
    }

    // up arrow key moves the player up, provided the player is within the canvas and hasn't reached the top
    if (move === 'up' && this.y > -49) {
      //console.log('up');
      this.y -= 90;
    }

    //resets the position of the player if the player reaches the top of the canvas
    if (move === 'up' && this.y < 40) {
      this.x = 200;
      this.y = 400;
    }


};

// Now instantiate your objects.


var allEnemies = [];

// Place the player object in a variable called player
var player = new Player(200, 400);

// Place all enemy objects in an array called allEnemies
allEnemies.push(new Enemy(-100, 50, getRandomInt(100, 250)));
allEnemies.push(new Enemy(-40, 140, getRandomInt(100, 250)));
allEnemies.push(new Enemy(-200, 220, getRandomInt(100, 250)));
allEnemies.push(new Enemy(-300, 140, getRandomInt(100, 250)));


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
