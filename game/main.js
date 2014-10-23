/*jslint browser:true */
var WIDTH = 160;
var HEIGHT = WIDTH / 12 * 9;
var SCALE = 5;

var tick = 0;

var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = WIDTH * SCALE;
canvas.height = HEIGHT * SCALE;
document.body.appendChild(canvas);

// var heroImage = new Image();
// heroImage.src = "hero.png";

function sprite(options) {
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

// var hero = {
//     speed: 128, // movement in pixels per second
//     x: TILE_SIZE,
//     y: TILE_SIZE,
//     sprite: sprite({
//         context: ctx,
//         width: 128,
//         height: 32,
//         image: heroImage,
//         numberOfFrames: 4,
//         loop: true,
//         ticksPerFrame: 4
//         })
// };

var score = 0;

var keysDown = {};

addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
}, false);

function update(modifier) {
    // var updated = true;
    // if (38 in keysDown) { // Player holding up
    //     if (canMove(hero.x, hero.y, 0, -hero.speed * modifier)) {
    //         hero.y -= hero.speed * modifier;
    //         updated = false;
    //     }
    // }
    // if (40 in keysDown) { // Player holding down
    //     if (canMove(hero.x, hero.y, 0, hero.speed * modifier)) {
    //         hero.y += hero.speed * modifier;
    //         updated = false;
    //     }
    // }
    // if (37 in keysDown) { // Player holding left
    //     if (canMove(hero.x, hero.y, -hero.speed * modifier, 0)) {
    //         hero.x -= hero.speed * modifier;
    //         updated = false;
    //     }
    // }
    // if (39 in keysDown) { // Player holding right
    //     if (canMove(hero.x, hero.y, hero.speed * modifier, 0)) {
    //         hero.x += hero.speed * modifier;
    //         updated = false;
    //     }
    // }
    // if (!updated)    hero.sprite.update();

}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

function setPixel(imageData, x, y, r, g, b, a) {
    var index = (x + y * imageData.width) * 4;
    imageData.data[index+0] = r;
    imageData.data[index+1] = g;
    imageData.data[index+2] = b;
    imageData.data[index+3] = a;
}

function scaleImageData(imageData, scale) {
  var scaled = ctx.createImageData(imageData.width * scale, imageData.height * scale);

  for(var row = 0; row < imageData.height; row++) {
    for(var col = 0; col < imageData.width; col++) {
      var sourcePixel = [
        imageData.data[(row * imageData.width + col) * 4 + 0],
        imageData.data[(row * imageData.width + col) * 4 + 1],
        imageData.data[(row * imageData.width + col) * 4 + 2],
        imageData.data[(row * imageData.width + col) * 4 + 3]
      ];
      for(var y = 0; y < scale; y++) {
        var destRow = row * scale + y;
        for(var x = 0; x < scale; x++) {
          var destCol = col * scale + x;
          for(var i = 0; i < 4; i++) {
            scaled.data[(destRow * scaled.width + destCol) * 4 + i] =
              sourcePixel[i];
          }
        }
      }
    }
  }

  return scaled;
}

var render = function () {
    clear();
    var i, j, x, y, r, g, b;
    for (i = 0; i < WIDTH; i++) {
        for (j = 0; j < HEIGHT; j++) {
            x = i;
            y = j;
            var color = y * HEIGHT + x + tick;
            r = ((color / 255) / 255);
            g = (color / 255) % 255;
            b = color % 255;
            setPixel(myImageData, x, y, r, g, b, 255); // 255 opaque
        }
    }
    ctx.putImageData(scaleImageData(myImageData, SCALE), 0, 0);
    // ctx.save();
    // ctx.translate(hero.x, hero.y);
    // hero.sprite.render();
    // ctx.restore();

    // ctx.strokeStyle = "rgb(0, 255, 0)";
    // ctx.font = "14px Courier New";
    // ctx.textAlign = "left";
    // ctx.textBaseline = "top";
    // ctx.strokeText("Score: " + score, TILE_SIZE / 2, HEIGHT - TILE_SIZE);
    // ctx.strokeStyle = "rgb(0, 0, 0)";
};

function main() {
    var now = Date.now();
    var delta = now - then;
    tick++;
    update(delta / 1000);
    render();
    then = now;
    if (running) {
        requestAnimationFrame(main);
    }
}

//var w = window;
//var requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

var then = Date.now();
var running = true;
var myImageData = ctx.createImageData(WIDTH, HEIGHT);
main();
