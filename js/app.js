// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;

}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.y === 60) {
        this.x += 150*dt;
    }
    if (this.y === 145) {
        this.x += 300*dt;
    }
    if (this.y === 230) {
        this.x += 200*dt;
    }
    if (this.y === 310) {
        this.x += 170*dt;
    }

    if (this.x > 500) {
        this.x = -10;
    }

    this.top = this.y + 30;
    this.left = this.x + 20;
    this.bottom = this.y + 70;
    this.right = this.x + 80;

    this.collisionDetector(this, player);

}

Enemy.prototype.collisionDetector = function(enemy, player) {
    if ((player.top > enemy.top && player.top < enemy.bottom) &&
        (player.left < enemy.right && player.left > enemy.left)) {
            player.x = 200;
            player.y = 425
        }
}

// Draw the enemy on the screen, required method for game

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
}

Player.prototype.update = function() {
    this.top = this.y + 20;
    this.bottom = this.y + 70;
    this.left = this.x + 30;
    this.right = this.x + 70;
}


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(key) {
//add code to handle key inputs to move player
    if (key === "left" && this.x > 80) {
        this.x -= 100;
    }

    if (key === "right" && this.x < 325) {
        this.x += 100;
    }

    if (key === "up" && this.y > 50 ) {
        this.y -= 86;
    }

    if (key === "down" && this.y < 400) {
        this.y += 86;
    }
}

var player = new Player(200,425);
var allEnemies = [
    new Enemy(0,60),
    new Enemy(0,145),
    new Enemy(0,230),
    new Enemy(300,60),
    new Enemy(0, 310)
    ];



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



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

