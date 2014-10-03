var WIDTH = 512;
var HEIGHT = 480;

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
    x: 32,
    y: 32,
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
    speed: 64,
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

function update(modifier) {
    var updated = true;
    if (38 in keysDown) { // Player holding up
        hero.y -= hero.speed * modifier;
        updated = false;
    }
    if (40 in keysDown) { // Player holding down
        hero.y += hero.speed * modifier;
        updated = false;
    }
    if (37 in keysDown) { // Player holding left
        hero.x -= hero.speed * modifier;
        updated = false;
    }
    if (39 in keysDown) { // Player holding right
        hero.x += hero.speed * modifier;
        updated = false;
    }
    if (!updated)    hero.sprite.update();
    
    var r = Math.floor(Math.random() * 4);
    switch(r) {
        case 0:
            monster.y -= monster.speed * modifier;
            break;
        case 1:
            monster.y += monster.speed * modifier;
            break;
        case 2:
            monster.x -= monster.speed * modifier;
            break;
        case 3:
            monster.x += monster.speed * modifier;
            break;
        default:
            r = 0;
    }
    monster.sprite.update();
    // Are they touching?
    if (hero.x <= (monster.x + 32) && 
        monster.x <= (hero.x + 32) &&
        hero.y <= (monster.y + 32) &&
        monster.y <= (hero.y + 32)
    ) {
        ++score;
        spawnMob();
    }
}

function spawnMob() {
    monster.x = 32 + (Math.random() * (WIDTH - 64));
    monster.y = 32 + (Math.random() * (HEIGHT - 64));
}

function clear() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.strokeRect(0, 0, WIDTH, HEIGHT);
}

var render = function () {
    clear();
//     if (bgReady) {
//         ctx.drawImage(bgImage, 0, 0);
//     }

//     if (heroReady) {
//         ctx.drawImage(heroImage, hero.x, hero.y);
//     }

//     if (monsterReady) {
//         ctx.drawImage(monsterImage, monster.x, monster.y);
//     }

    // Score
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
    ctx.strokeText("Score: " + score, 16, HEIGHT - 32);
    ctx.strokeStyle = "rgb(0, 0, 0)";
};

var main = function () {
    var now = Date.now();
    var delta = now - then;

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