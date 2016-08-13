// Enemy class

var Enemy = function(direction) {
    GameObject.call(this, direction);
};

Enemy.prototype = Object.create(GameObject.prototype);
Enemy.prototype.constructor = Enemy;


// Depending of the type, bug enemy is drawn differently. Because of the image problems.
Enemy.prototype.onTopDraw = function() {
    if (this.type == 8) // Right
        return ctx.drawImage(Resources.get(image_arr[this.type]),
        this.position_x * 101, this.position_y * 83 - 30);
    if (this.type == 17) // Left
        return ctx.drawImage(Resources.get(image_arr[this.type]),
        this.position_x * 101 , this.position_y * 83 + 30);
    if (this.type == 18) // Up
        return ctx.drawImage(Resources.get(image_arr[this.type]),
        this.position_x * 101 - 70, this.position_y * 83 + 30);
    if (this.type == 19) // Down
        return ctx.drawImage(Resources.get(image_arr[this.type]),
        this.position_x * 101, this.position_y * 83 + 30);
};

// Depending of the type, bug enemy is moving in a straight line.
Enemy.prototype.update = function() {
  if (this.type == 8) // Right
      this.position_x = this.position_x + 0.01;
  if (this.type == 17) // Left
      this.position_x = this.position_x - 0.01;
  if (this.type == 18) // Up
      this.position_y = this.position_y - 0.01;
  if (this.type == 19) // Down
      this.position_y = this.position_y + 0.01;
};
