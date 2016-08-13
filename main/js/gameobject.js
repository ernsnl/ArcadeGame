/* Initial GameObject class each of the object that are used in the game are inhereted from this class
  Contains position info (x and y coordinates), type info (Which type of image will be rendered)
*/

// Type
// 0 - stone block
// 1 - water block
// 2 - grass block
// 3 - player-boy
// 4 - player-cat-girl
// 5 - player-horn-girl
// 6 - player-pink-girl
// 7 - princess
// 8 - enemy-bug-R
// 9 - block
// 10 - heart
// 11 - Gem Blue
// 12 - Gem Green
// 13 - Gem Orange
// 14 - Selector
// 15 - star
// 16 - key
// 17 - enemy-bug-L
// 18 - enemy-bug-U
// 19 - enemy-bug-D
var image_arr = [
    'images/stone-block.png',
    'images/water-block.png',
    'images/grass-block.png',
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png',
    'images/enemy-bug-R.png',
    'images/Rock.png',
    'images/Heart.png',
    'images/Gem Blue.png',
    'images/Gem Green.png',
    'images/Gem Orange.png',
    'images/Selector.png',
    'images/Star.png',
    'images/Key.png',
    'images/enemy-bug-L.png',
    'images/enemy-bug-U.png',
    'images/enemy-bug-D.png',
];


var GameObject = function(type) {
    this.type = type;
    this.position_x = 99;
    this.position_y = 99;
};

// When the object is on the ground
GameObject.prototype.baseDraw = function(col, row) {
    if (this.type > -1) {
        this.position_x = col;
        this.position_y = row;
        return ctx.drawImage(Resources.get(image_arr[this.type]), col * 101, row * 83);
    }
};
// When the object is on top of something
GameObject.prototype.onTopDraw = function(col, row) {
    if (this.type > -1) {
        this.position_x = col;
        this.position_y = row;
        return ctx.drawImage(Resources.get(image_arr[this.type]), col * 101, row * 83 - 30);
    }
};
// When object needs to be updated
GameObject.prototype.update = function() {

};
