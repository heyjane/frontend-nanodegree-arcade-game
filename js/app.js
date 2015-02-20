// Enemies our player must avoid.
Parameters: x,y, initial canvas locations for enemy sprite.
var Enemy = function(x,y) {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks to ensure
// consistent display movements.
// Parameter: accelerator, a multiplier to increase speed
// as levels of play increment.  The idea is that faster
// bugs make the game harder as you progress.
Enemy.prototype.update = function(dt) {
    var accelerator = Math.pow(1.3, level);
// Define the movement for each enemy bug.
    if (this.y === 60) {
        this.x += 120*dt*accelerator;
    }
    if (this.y === 145) {
        this.x += 200*dt*accelerator;
    }
    if (this.y === 230) {
        this.x += 250*dt*accelerator;
    }
    if (this.y === 310) {
        this.x += 170*dt*accelerator;
    }
// Reset enemies to the left screen to restart if they reach
// the right screen boundary.
    if (this.x > 500) {
        this.x = -10;
    }
// Define the enemy boundaries for collision detection.
    this.top = this.y + 30;
    this.left = this.x + 20;
    this.bottom = this.y + 70;
    this.right = this.x + 80;

    this.collisionDetector(this, player);
}

// Check for collisions.  If collision is detected, decrease
// player's lives by one and reset the player to the starting point.
// Parameters:  enemy, player (enemy boundaries and player
// boundaries for collision detection).
Enemy.prototype.collisionDetector = function(enemy, player) {
    if ((player.top > enemy.top && player.top < enemy.bottom) &&
        (player.left < enemy.right && player.left > enemy.left)) {
            lives--;
            if (lives===0) {
                state = "lost";
            }
            GameReset();
        }
}

// Draw the enemy on the screen, unless game is won (level 4) or
// lost (level 0).
Enemy.prototype.render = function() {
    if (level < 4 && lives > 0) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// A different game player is used for each level to
// fit the storyline.  Player lives are shown by hearts.  A player
// starts with three lives.  A player loses one life for each
// enemy collision.  A player gains one life for each level up.
// Parameters: x,y, coordinates of player location.
var Player = function(x,y) {
    this.sprite1 = 'images/char-boy.png';
    this.sprite2 = 'images/char-pink-girl.png';
    this.sprite3 = 'images/char-princess-girl.png';
    this.lifeSprite = 'images/life-heart.png';
    this.x = x;
    this.y = y;
}

// Update the player's position, required method for game.
// Define the player boundaries for collision detection.
Player.prototype.update = function() {
    this.top = this.y + 20;
    this.bottom = this.y + 70;
    this.left = this.x + 30;
    this.right = this.x + 70;
// Check levels to determine which character sprite to display.
    if (level < 2) {
        this.sprite = this.sprite1;
    }

    if (level === 2) {
        this.sprite = this.sprite2;
    }

    if (level === 3) {
        this.sprite = this.sprite3;
    }
//Check if player has won the level.  If level is won,
//increment the level counter by one and change the state
//to won.
    if (this.y === -5) {
        level ++;
        lives ++;
        if (level === 4) {
            state = "won";
        }
        GameReset();
    }
}

// Draw the player on the game unless the game has been won.
Player.prototype.render = function() {
    if (level < 4) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    this.menuDisplays();
}

// Display the welcome menu with game instructions the first time
// the game is played.

Player.prototype.menuDisplays = function() {
    if (state === "welcome") {
        ctx.drawImage(Resources.get('images/welcome-menu.png'), 2, 95);
    }
// Display a game over screen when all lives are lost.
    if (lives === 0) {
        level = 0;
        ctx.fillText("You LOST!", 160, 200);
        ctx.fillText("Press the spacebar", 70, 300);
        ctx.fillText("to play again", 150, 340);
    }
// Display the current level at the top right of the screen
// during game play.  Display the current number of lives
// with heart icons in the bottom left of the screen.
    this.text = "Level " + level;
    ctx.font = "48px bold";
    if (level < 4 && level > 0) {
        ctx.fillText(this.text, 340, 100);
        for (i=0; i<lives; i++) {
            ctx.drawImage(Resources.get(this.lifeSprite), (37*i), 500);
        }
    }
// Display the characters that have safely made it across the road
// to the magic water at the top of the screen.
    if (level > 1) {
        ctx.drawImage(Resources.get(this.sprite1), 0, -5);
    }
    if (level > 2) {
        ctx.drawImage(Resources.get(this.sprite2), 100, -5);
    }
    if (level > 3) {
        ctx.drawImage(Resources.get(this.sprite3), 200, 0);

    }
//Display a winner screen if player wins all three levels.
    if (level == 4) {
        ctx.fillText("You WON!", 160, 200);
        ctx.fillText("Press the spacebar", 70, 300);
        ctx.fillText("to play again", 150, 340);
    }
}

// Handle key inputs to move the player or restart the game.
// State variable checks if game is in play mode and
// disables player movement key inputs if game is over.  The
// space key remains functional so game can be reset at any time.
// Parameter:  key, variable which identifies player input keys.
Player.prototype.handleInput = function(key) {
    if (state === "play") {
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
// Handle space bar input to reset game.  Level returns
// to 1 and lives are reset to 3.
    if (key === "space") {
        level = 1;
        lives = 3;
        state = "play";
        GameReset();
    }
}

// Reset player to original position.
var GameReset = function() {
    player.x = 200;
    player.y = 425;
}

// Set initial variables for state, lives, and level.  Instantiate
// player and enemy objects.
var state = "welcome"
var lives = 3;
var level = 0;
var player = new Player(200,425);
var allEnemies = [
    new Enemy(0,60),
    new Enemy(-50,145),
    new Enemy(0,230),
    new Enemy(-250,60),
    new Enemy(0, 310),
    ];


// Listen for key presses and send the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        32: 'space',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

