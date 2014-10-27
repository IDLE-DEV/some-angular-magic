/*jslint browser:true*/
var canvas = document.getElementById('screen');
var context = canvas.getContext('2d');

var center = { x: 300, y: 300 };
var radius = 200;
var rotateAngle = 0;
var tick = 0;
var invert = -1;

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  context.strokeStyle = 'black';
  context.beginPath();
  context.arc(center.x, center.y, radius, 0, 2 * Math.PI, false);
  context.stroke();
  context.closePath();

  context.strokeStyle = 'red';
  context.beginPath();
  context.arc(center.x + radius * Math.cos(2 * Math.PI / 5 * 0), center.y + radius * Math.sin(2 * Math.PI / 5 * 0), radius, 2 * Math.PI / 5 * 2.5 + rotateAngle, 2 * Math.PI / 5 * (3 + 1/3) + rotateAngle, false);
  context.closePath();
  context.stroke();

  context.strokeStyle = 'blue';
  context.beginPath();
  context.arc(center.x + radius * Math.cos(2 * Math.PI / 5 * 1), center.y + radius * Math.sin(2 * Math.PI / 5 * 1), radius, 2 * Math.PI / 5 * 3.5 + rotateAngle, 2 * Math.PI / 5 * (4 + 1/3) + rotateAngle, false);
  context.closePath();
  context.stroke();

  context.strokeStyle = 'green';
  context.beginPath();
  context.arc(center.x + radius * Math.cos(2 * Math.PI / 5 * 2), center.y + radius * Math.sin(2 * Math.PI / 5 * 2), radius, 2 * Math.PI / 5 * 4.5 + rotateAngle, 2 * Math.PI / 5 * (0 + 1/3) + rotateAngle, false);
  context.closePath();
  context.stroke();

  context.strokeStyle = 'yellow';
  context.beginPath();
  context.arc(center.x + radius * Math.cos(2 * Math.PI / 5 * 3), center.y + radius * Math.sin(2 * Math.PI / 5 * 3), radius, 2 * Math.PI / 5 * 0.5 + rotateAngle, 2 * Math.PI / 5 * (1 + 1/3) + rotateAngle, false);
  context.closePath();
  context.stroke();

  context.strokeStyle = 'orange';
  context.beginPath();
  context.arc(center.x + radius * Math.cos(2 * Math.PI / 5 * 4), center.y + radius * Math.sin(2 * Math.PI / 5 * 4), radius, 2 * Math.PI / 5 * 1.5 + rotateAngle, 2 * Math.PI / 5 * (2 + 1/3) + rotateAngle, false);
  context.closePath();
  context.stroke();

  context.strokeRect(10,10,10,10);

  rotateAngle = (rotateAngle + invert * (2 * Math.PI) / 360) % (2 * Math.PI / 5);
  if (tick > 0) {
    tick --;
    requestAnimationFrame( draw );
  }
}
canvas.addEventListener('click', function(){
  tick = 60;
  invert = invert * -1;
  rotateAngle = invert == 1?0:(2 * Math.PI / 6);
  draw();
}, false);

draw();
