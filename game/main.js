var WIDTH = 512;
var HEIGHT = 480;
var TILE_SIZE = 32;

var tick = 0;

var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = WIDTH;
canvas.height = HEIGHT;
document.body.appendChild(canvas);

var heroImage = new Image();
heroImage.src = "hero.png";

var monsterImage = new Image();
monsterImage.src = "monster.png";

function sprite (options) {
    var that = {},
    frameIndex = 0,
    tickCount = 0,
    ticksPerFrame = options.ticksPerFrame || 0,
    numberOfFrames = options.numberOfFrames || 1;
    
    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;
    that.loop = options.loop;

    that.render = function () {
        that.context.drawImage(
           that.image,
           frameIndex * that.width / numberOfFrames,
           0,
           that.width / numberOfFrames,
           that.height,
           0,
           0,
           that.width / numberOfFrames,
           that.height);
    };
    that.update = function () {
        tickCount += 1;
        if (tickCount > ticksPerFrame) {
            tickCount = 0;
            // If the current frame index is in range
            if (frameIndex < numberOfFrames - 1) {  
                // Go to the next frame
                frameIndex += 1;
            } else if (that.loop) {
                frameIndex = 0;
            }
        }
    }; 
    return that;
}

var hero = {
    speed: 128, // movement in pixels per second
    x: TILE_SIZE,
    y: TILE_SIZE,
    sprite: sprite({
        context: ctx,
        width: 128,
        height: 32,
        image: heroImage,
        numberOfFrames: 4,
        loop: true,
        ticksPerFrame: 4
        })
};

var monster = {
    speed: 256,
    direction: 0,
    x: 0,
    y: 0,
    sprite: sprite({
        context: ctx,
        width: 128,
        height: 32,
        image: monsterImage,
        numberOfFrames: 4,
        loop: true,
        ticksPerFrame: 4
    })
};

var score = 0;

var keysDown = {};

addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
}, false);

function init() {
    hero.x = WIDTH / 2;
    hero.y = HEIGHT / 2;
    spawnMob();
}

function canMove(tmpX, tmpY, modX, modY) {
    var res = true;
    if (tmpX + modX > WIDTH - TILE_SIZE || tmpX + modX < 0) res = false;
    if (tmpY + modY > HEIGHT - TILE_SIZE || tmpY + modY < 0) res = false;
    return res;
}

function update(modifier) {
    var updated = true;
    if (38 in keysDown) { // Player holding up
        if (canMove(hero.x, hero.y, 0, -hero.speed * modifier)) {
            hero.y -= hero.speed * modifier;
            updated = false;
        }
    }
    if (40 in keysDown) { // Player holding down
        if (canMove(hero.x, hero.y, 0, hero.speed * modifier)) {
            hero.y += hero.speed * modifier;
            updated = false;
        }
    }
    if (37 in keysDown) { // Player holding left
        if (canMove(hero.x, hero.y, -hero.speed * modifier, 0)) {
            hero.x -= hero.speed * modifier;
            updated = false;
        }
    }
    if (39 in keysDown) { // Player holding right
        if (canMove(hero.x, hero.y, hero.speed * modifier, 0)) {
            hero.x += hero.speed * modifier;
            updated = false;
        }
    }
    if (!updated)    hero.sprite.update();
    if (tick % 20 == 0) {
        monster.direction = Math.floor(Math.random() * 8);
    }
    switch(monster.direction) {
        case 0:
            if (canMove(monster.x, monster.y, 0, -monster.speed * modifier)) {
                monster.y -= monster.speed * modifier;
            } else {
                monster.direction = Math.floor(Math.random() * 8);
            }
            break;
        case 1:
            if (canMove(monster.x, monster.y, monster.speed * modifier, -monster.speed * modifier)) {
                monster.x += monster.speed * modifier;
                monster.y -= monster.speed * modifier;
            } else {
                monster.direction = Math.floor(Math.random() * 8);
            }
            break;
        case 2:
            if (canMove(monster.x, monster.y, monster.speed * modifier, 0)) {
                monster.x += monster.speed * modifier;
            } else {
                monster.direction = Math.floor(Math.random() * 8);
            }
            break;
        case 3:
            if (canMove(monster.x, monster.y, monster.speed * modifier, monster.speed * modifier)) {
                monster.x += monster.speed * modifier;
                monster.y += monster.speed * modifier;
            } else {
                monster.direction = Math.floor(Math.random() * 8);
            }
            break;
        case 4:
            if (canMove(monster.x, monster.y, 0, monster.speed * modifier)) {
                monster.y += monster.speed * modifier;
            } else {
                monster.direction = Math.floor(Math.random() * 8);
            }
            break;
        case 5:
            if (canMove(monster.x, monster.y, -monster.speed * modifier, monster.speed * modifier)) {
                monster.x -= monster.speed * modifier;
                monster.y += monster.speed * modifier;
            } else {
                monster.direction = Math.floor(Math.random() * 8);
            }
            break;
        case 6:
            if (canMove(monster.x, monster.y, -monster.speed * modifier, 0)) {
                monster.x -= monster.speed * modifier;
            } else {
                monster.direction = Math.floor(Math.random() * 8);
            }
            break;
        case 7:
            if (canMove(monster.x, monster.y, -monster.speed * modifier, -monster.speed * modifier)) {
                monster.x -= monster.speed * modifier;
                monster.y -= monster.speed * modifier;
            } else {
                monster.direction = Math.floor(Math.random() * 8);
            }
            break;
        default:
            r = 0;
    }
    monster.sprite.update();
    // Are they touching?
    if (hero.x <= (monster.x + TILE_SIZE) && 
        monster.x <= (hero.x + TILE_SIZE) &&
        hero.y <= (monster.y + TILE_SIZE) &&
        monster.y <= (hero.y + TILE_SIZE)
    ) {
        ++score;
        spawnMob();
    }
}

function spawnMob() {
    monster.x = TILE_SIZE + (Math.random() * (WIDTH - TILE_SIZE * 2));
    monster.y = TILE_SIZE + (Math.random() * (HEIGHT - TILE_SIZE * 2));
}

function clear() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.strokeRect(0, 0, WIDTH, HEIGHT);
}

var render = function () {
    clear();

    ctx.save();
    ctx.translate(hero.x, hero.y);
    hero.sprite.render();
    ctx.restore();

    ctx.save();
    ctx.translate(monster.x, monster.y);
    monster.sprite.render();
    ctx.restore();

    ctx.strokeStyle = "rgb(0, 255, 0)";
    ctx.font = "14px Courier New";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.strokeText("Score: " + score, TILE_SIZE / 2, HEIGHT - TILE_SIZE);
    ctx.strokeStyle = "rgb(0, 0, 0)";
};

var main = function () {
    var now = Date.now();
    var delta = now - then;
    if (tick > 1000000000) r = 0;
    tick++;
    update(delta / 1000);
    render();
    then = now;
    if (running) requestAnimationFrame(main);
};

var w = window;
var requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

var then = Date.now();
var running = true;
init();
main();