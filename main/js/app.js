'use strict';

// Ground Matrix
var matrix = [
    [2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2],
    [1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1],
    [2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2]
];
// Above Matrix
var matrix_obs = [
    [9, -1, 9, -1, 9, -1, 9, -1, 9, -1, 9],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [9, -1, 9, -1, 9, -1, 9, -1, 9, -1, 9],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [9, -1, 9, -1, 9, -1, 9, -1, 9, -1, 9],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [9, -1, 9, -1, 9, -1, 9, -1, 9, -1, 9]

];
// Player
var player = new Player();
player.position_x = 5;
player.position_y = 3;

// Text Object Define
var score = new textObject();
var highScore = new textObject();
var currentHighScore = 0;
var currentScore = 0;
score.update = function() {
    var s = document.getElementById("Score");
    currentScore++;
    s.innerText = currentScore;
};

highScore.update = function() {
    var hs = document.getElementById("Highscore");
    if (currentScore >= currentHighScore) {
        currentHighScore = currentScore;
        hs.innerText = currentHighScore;
    }
};
// End

// Enemies
var allEnemies = [];
setTimeout(CreateEnemies, 2000);

function CreateEnemies() {
    var randomNumberDirection = Math.floor(Math.random() * 100 + 1);
    var new_enemy;
    if (randomNumberDirection % 4 == 0) {
        new_enemy = new Enemy(8); // Right
        new_enemy.position_x = 0;
        var randomPosition = Math.floor(Math.random() * 3);
        if (randomPosition % 3 == 0) {
            new_enemy.position_y = 1;
        } else if (randomPosition % 3 == 1) {
            new_enemy.position_y = 3;
        } else {
            new_enemy.position_y = 5;
        }
    } else if (randomNumberDirection % 4 == 1) {
        new_enemy = new Enemy(17); // Left
        new_enemy.position_x = 10;
        var randomPosition = Math.floor(Math.random() * 3);
        if (randomPosition % 3 == 0) {
            new_enemy.position_y = 1;
        } else if (randomPosition % 3 == 1) {
            new_enemy.position_y = 3;
        } else {
            new_enemy.position_y = 5;
        }
    } else if (randomNumberDirection % 4 == 2) {
        new_enemy = new Enemy(18); // Up;
        new_enemy.position_y = 6;
        var randomPosition = Math.floor(Math.random() * 5);
        if (randomPosition % 5 == 0) {
            new_enemy.position_x = 1;
        } else if (randomPosition % 5 == 1) {
            new_enemy.position_x = 3;
        } else if (randomPosition % 5 == 2) {
            new_enemy.position_x = 5;
        } else if (randomPosition % 5 == 3) {
            new_enemy.position_x = 7;
        } else {
            new_enemy.position_x = 9;
        }
    } else if (randomNumberDirection % 4 == 3) {
        new_enemy = new Enemy(19); // Down
        new_enemy.position_y = 0;
        var randomPosition = Math.floor(Math.random() * 5);
        if (randomPosition % 5 == 0) {
            new_enemy.position_x = 1;
        } else if (randomPosition % 5 == 1) {
            new_enemy.position_x = 3;
        } else if (randomPosition % 5 == 2) {
            new_enemy.position_x = 5;
        } else if (randomPosition % 5 == 3) {
            new_enemy.position_x = 7;
        } else {
            new_enemy.position_x = 9;
        }
    }
    allEnemies.push(new_enemy);
    setTimeout(CreateEnemies, 2000);
};
// End

// PickUp
var allPickUps = [];
setTimeout(CreatePickups, 2500);

function CreatePickups() {
    var randomPickup = Math.floor(Math.random() * 100) + 1;
    var pick;
    if (randomPickup % 100 == 0)
        pick = new PickUp(13);
    else if (randomPickup % 100 < 15)
        pick = new PickUp(12);
    else if (randomPickup % 100 < 50)
        pick = new PickUp(11)
    else
        pick = new PickUp(10);

    var random_pickUp_position = Math.floor(Math.random() * 77) + 1;
    pick.position_x = (random_pickUp_position % 11) % 2 == 0 ? random_pickUp_position % 11 + 1 : random_pickUp_position % 11;
    pick.position_y = (random_pickUp_position % 7) % 2 == 0 ? random_pickUp_position % 7 + 1 : random_pickUp_position % 7;

    if (pick.position_x >= 0 && pick.position_y >= 0 &&
        pick.position_y <= 6 && pick.position_x <= 10)
        allPickUps.push(pick);
    setTimeout(CreatePickups, 2500);
}
// PickUp

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
