// Player class
var Player = function() {
    GameObject.call(this, 3);
    this.old_position_x = 99;
    this.old_position_y = 99;
};

Player.prototype = Object.create(GameObject.prototype);
Player.prototype.constructor = Player;

// Handling the input from the user
Player.prototype.handleInput = function(keycode) {
    this.old_position_x = this.position_x;
    this.old_position_y = this.position_y;
    if (keycode == 'left'){ // Left
        this.position_x--;
    } else if (keycode == 'up'){  // Up
        this.position_y--;
    } else if (keycode == 'right'){ // Right
        this.position_x++;
    } else if (keycode == 'down'){ // Down
        this.position_y++;
    }

};
