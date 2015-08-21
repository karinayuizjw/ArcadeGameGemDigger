// Global variables
var border = {
    left: 0,
    right: 707,
    top: 0,
    bottom: 551,
    waterline: 53
};

var element = {
    width: 101,
    height: 171,
    dy: 83
};


// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Initialize enemy speed, random int between 100 and 500
    this.speed = Math.floor(Math.random() * 301) + 100;
    //this.speed = 100; // for testing

    // Initialize enemy position, randomly appeared at the left
    // side of one stone row
    var currRow = Math.floor(Math.random() * 5 )+ 1;
    this.x = border.left - element.width;
    this.y = currRow * element.dy - 20;

}

// Reset enemy
Enemy.prototype.reset = function(){
    // enemy speed
    this.speed = Math.floor(Math.random() * 301) + 100;
    //this.speed = 100; // for testing

    // enemy position
    var currRow = Math.floor(Math.random() * 5 )+ 1;
    this.x = border.left - element.width;
    this.y = currRow * element.dy - 20;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Border check
    if (this.x > border.right){

        // Initialize enemy
        var currRow = Math.floor(Math.random() * 5 )+ 1;
        this.x = border.left - element.width;
        this.y = currRow * element.dy - 20;

        this.speed = Math.floor(Math.random() * 301) + 100; // origin
        //this.speed = 100; // for testing

    }else{
        this.x += this.speed * dt;
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    this.start = false;
    this.selector = 2;
    this.sprite = 'images/Selector.png';

    // Initialize player's position
    this.x = element.width * 2;
    this.y = element.dy * 7 -30;
}

// Reset the player's position to the initial place
Player.prototype.reset = function(){
    this.x = element.width * 2;
    this.y = element.dy * 7 - 30; // border.bottom
}

// Change the player's sprite
Player.prototype.change = function(){
    switch (this.selector){
        case 0:
            this.sprite = 'images/char-cat-girl.png';
            break;
        case 1:
            this.sprite = 'images/char-horn-girl.png';
            break;
        case 2:
            this.sprite = 'images/char-boy.png';
            break;
        case 3:
            this.sprite = 'images/char-pink-girl.png';
            break;
        case 4:
            this.sprite = 'images/char-princess-girl.png';
            break;
        default:
            break;
    }
}

// Update the player's position, required method for game
Player.prototype.update = function(key){

    if (this.start == false){
        switch (key){
            case 'space':
                this.start = true;
                this.change();
                this.reset();
                break;
            case 'left':
                this.x -= element.width;
                this.selector--;
                if (this.x < element.width){
                    this.x = element.width;
                }
                break;
            case 'right':
                this.x += element.width;
                this.selector++;
                if (this.x > 5 * element.width){
                    this.x = 5 * element.width;
                }
                break;
            default:
                break;
        }
    }else{
        var step = 5;
        switch (key){
            case 'left':
                // move player to left
                this.x = this.x - step;
                if (this.x < border.left) {
                    this.x = border.left;
                }
                break;
            case 'right':
                // move player to right
                this.x = this.x + step;
                if (this.x > border.right - element.width){
                    this.x = border.right - element.width;
                }
                break;
            case 'up':
                // move player up
                this.y = this.y - step;
                break;
            case 'down':
                // move player down
                this.y = this.y + step;
                break;
            default:
                break;
        }
    }

    // selector validness check
    if (this.selector < 0){
        this.selector = 0;
    }

    if (this.selector > 4){
        this.selector = 4;
    }

    // player off screen check, y direction
    if (this.y < border.waterline){
        this.reset();
    }
    if (this.y > border.bottom){
        this.y = border.bottom;
    }

}

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Determine the key user pressed
Player.prototype.handleInput = function(key){
    this.update(key);
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var enemyNum = 4;   // Total number of enemies
var i = 0;
while(i < enemyNum){
    var enemy = new Enemy();
    allEnemies.push(enemy);
    i++;
}

var player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        32: 'space',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    if (e.keyCode == 38 || e.keyCode == 40){
        e.preventDefault();
    }

    player.handleInput(allowedKeys[e.keyCode]);
});
