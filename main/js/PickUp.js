// Pick Up class
// Class is used for generating pickUps and defining their properties
var PickUp = function(pickup_type) {
    GameObject.call(this, pickup_type);
    this.remove_time = (pickup_type - 9) * 1000;
};

PickUp.prototype = Object.create(GameObject.prototype);
PickUp.prototype.constructor = PickUp;

// Update function of pickUp will act as a remove function from canvas
PickUp.prototype.update = function(dt) {
    this.remove_time = this.remove_time - dt * 500;
    if (this.remove_time <= 0)
        this.type = -1;
}


PickUp.prototype.onTopDraw = function() {
    if (this.type > -1)
        return ctx.drawImage(Resources.get(image_arr[this.type]),
            this.position_x * 101, this.position_y * 83 - 30);
}
