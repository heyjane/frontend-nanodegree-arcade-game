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
    var accelerator = Math.pow(1.3, level);
 /*
    var randomNum = Math.random() * (300 - 100) + 100;
    this.vx = randomNum*dt*accelerator;
    this.x += this.vx;
    */

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
            lives--;
            if (lives===0) {
                state = "lost";
            }
            GameReset();
        }
}

// Draw the enemy on the screen, required method for game

Enemy.prototype.render = function() {
    if (level < 4 && lives > 0) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
    this.sprite1 = 'images/char-boy.png';
    this.sprite2 = 'images/char-pink-girl.png';
    this.sprite3 = 'images/char-princess-girl.png';
    this.lifeSprite = 'images/life-heart.png';
    this.x = x;
    this.y = y;
}

Player.prototype.update = function() {
    this.top = this.y + 20;
    this.bottom = this.y + 70;
    this.left = this.x + 30;
    this.right = this.x + 70;

    if (level < 2) {
        this.sprite = this.sprite1;
    }

    if (level === 2) {
        this.sprite = this.sprite2;
    }

    if (level === 3) {
        this.sprite = this.sprite3;
    }

    if (this.y === -5) {
        level ++;
        lives ++;
        if (level === 4) {
            state = "won";
        }
        GameReset();
    }
}

Player.prototype.render = function() {
    if (level < 4) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    this.menuDisplays();
}

Player.prototype.menuDisplays = function() {
    if (state === "welcome") {
        ctx.drawImage(Resources.get('images/welcome-menu.png'), 2, 95);
    }
    if (lives === 0) {
        level = 0;
        ctx.fillText("You LOST!", 160, 200);
        ctx.fillText("Press the spacebar", 70, 300);
        ctx.fillText("to play again", 150, 340);
    }
    this.text = "Level " + level;
    ctx.font = "48px bold";
    if (level < 4 && level > 0) {
        ctx.fillText(this.text, 340, 100);
        for (i=0; i<lives; i++) {
            ctx.drawImage(Resources.get(this.lifeSprite), (37*i), 500);
        }
    }

    if (level > 1) {
        ctx.drawImage(Resources.get(this.sprite1), 0, -5);
    }
    if (level > 2) {
        ctx.drawImage(Resources.get(this.sprite2), 100, -5);
    }
    if (level > 3) {
        ctx.drawImage(Resources.get(this.sprite3), 200, 0);

    }
    if (level == 4) {
        ctx.fillText("You WON!", 160, 200);
        ctx.fillText("Press the spacebar", 70, 300);
        ctx.fillText("to play again", 150, 340);
    }

}

Player.prototype.handleInput = function(key) {
//add code to handle key inputs to move player
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

    if (key === "space") {
        level = 1;
        lives = 3;
        state = "play";
        GameReset();
    }
}
var GameReset = function() {
    player.x = 200;
    player.y = 425;
}

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


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
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

