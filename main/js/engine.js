/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine is available globally via the Engine variable and it also makes
 * the canvas' context (ctx) object globally available to make writing app.js
 * a little simpler to work with.
 */

var Engine = (function(global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    var gameWorld = [];
    var obs = [];

    canvas.width = 1111;
    canvas.height = 650;
    doc.body.appendChild(canvas);

    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    function main() {
        /* Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        /* Call our update/render functions, pass along the time delta to
         * our update function since it may be used for smooth animation.
         */
        update(dt);
        render();

        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;

        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */
        win.requestAnimationFrame(main);
    }

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function init() {
        reset();
        lastTime = Date.now();
        main();
    }

    /* Updating Entities and collison detection is done here
     */
    function update(dt) {
        updateEntities(dt);
        checkCollisions();
    }

    /*
    Each moving objects and some stationary objects are updating
    */
    function updateEntities(dt) {
        // Player Update
        player.update();

        // Score Updates
        score.update();
        highScore.update();

        // All enemies
        allEnemies.forEach(function(enemy) {
            enemy.update();
        });

        allPickUps.forEach(function(pickUp) {
            pickUp.update(dt);
        });
    }

    /* Render function renders the static objects like the ground, pickUps and the stationary objects
    After the render of the object mention above is complete moving entities will be rendered.
     */
    function render() {
        // Number of Columns and Rows that will be in the game.
        var numRows = 7,
            numCols = 11,
            row, col;

        gameWorld = [];
        for (row = 0; row < numRows; row++) {
            gameWorld.push([]);
            for (col = 0; col < numCols; col++) {
                var gameObject = new GameObject(matrix[row][col]);
                gameObject.baseDraw(col, row);
                gameWorld[row].push(gameObject);
            }

        }
        obs = [];
        for (row = 0; row < numRows; row++) {
            obs.push([]);
            for (col = 0; col < numCols; col++) {
                var gameObject = new GameObject(matrix_obs[row][col]);
                gameObject.onTopDraw(col, row);
                obs[row].push(gameObject);
            }

        }
        renderEntities();
        ctx.clearRect(0, 0, canvas.width, 50);
    }

    /*
    Render the moving objects and some stationary objects
    */
    function renderEntities() {
        //Rendering the enemies
        allEnemies.forEach(function(enemy) {
            if (enemy.position_x > 0 && enemy.position_y > 0 &&
                enemy.position_y < 10.1 && enemy.position_x < 10.1)
                enemy.onTopDraw();
        });
        //Rendering the pickups
        allPickUps.forEach(function(pickUp) {
            if (pickUp.type != -1)
                pickUp.onTopDraw();
        });
        //Rendering the player
        player.onTopDraw(player.position_x, player.position_y);
    }

    /* Resets the game to initial point, but saving the highscore
     */
    function reset() {
        //Clear all canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        //Place player on the middle
        player.onTopDraw(5, 3);
        // Clear all enemies
        allEnemies = [];
        // Score
        currentScore = 0;
        // Reset Pickups
        allPickUps = [];

    }

    // Collisions are checked depending on the type, certain things happen for more information please refer to ReadMe.md
    function checkCollisions() {

        // Checking the player is on the edge of the canvas
        if (player.position_y == 0 || player.position_x == 0 || player.position_x == 10 || player.position_y == 6) {
            reset();
        }
        // Player cannot climb to the rocks
        if (player.position_x % 2 == 0 && player.position_y % 2 == 0) {
            player.position_x = player.old_position_x;
            player.position_y = player.old_position_y;
        }

        allEnemies.forEach(function(enemy) {
            if (enemy.position_x > 0 && enemy.position_y > 0 &&
                enemy.position_y < 10.1 && enemy.position_x < 10.1)
                if (Math.abs(player.position_x.toFixed(1) - enemy.position_x.toFixed(1)) < 0.7 &&
                    Math.abs(player.position_y.toFixed(1) - enemy.position_y.toFixed(1)) < 0.7) {
                    reset();
                    return;
                }
        });

        allPickUps.forEach(function(pickUp) {
            if (pickUp.type > -1)
                if (player.position_y == pickUp.position_y &&
                    player.position_x == pickUp.position_x) {
                    if (pickUp.type == 13) {
                        currentScore += 100000;
                    } else if (pickUp.type == 12) {
                        currentScore += 10000;
                    } else if (pickUp.type == 11) {
                        currentScore += 1000;
                    } else {
                        currentScore += 100;
                    }
                    pickUp.type = -1;
                }
        });

    };

    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png',
        'images/enemy-bug-R.png',
        'images/enemy-bug-U.png',
        'images/enemy-bug-D.png',
        'images/enemy-bug-L.png',
        'images/Rock.png',
        'images/Heart.png',
        'images/Gem Blue.png',
        'images/Gem Green.png',
        'images/Gem Orange.png',
        'images/Selector.png',
        'images/Star.png',
        'images/Key.png'
    ]);
    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developers can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;
})(this);
