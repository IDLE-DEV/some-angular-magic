/*jslint browser:true*/
var canvas = document.getElementById('screen');
var context = canvas.getContext('2d');

var center = { x: 300, y: 300 };
var radius = 200;
var rotateAngle = 0;
var tick = 60;
var invert = -1;

function draw() {
  //There are smarter ways to increment time, but this is for demonstration purposes
//  tick ++;


  context.clearRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = 'black';
  //Actually draw on the canvas
  context.beginPath();

  context.arc(center.x, center.y, radius, 0, 2 * Math.PI, false);

  context.stroke();
  context.closePath();

  context.strokeStyle = 'red';
  //Actually draw on the canvas
  context.beginPath();

  context.arc(center.x + radius * Math.cos(2 * Math.PI / 5 * 0), center.y + radius * Math.sin(2 * Math.PI / 5 * 0), radius, 2 * Math.PI / 5 * 2.5 + rotateAngle, 2 * Math.PI / 5 * (3 + 1/3) + rotateAngle, false);

  context.stroke();
  context.closePath();

  context.strokeStyle = 'blue';
  //Actually draw on the canvas
  context.beginPath();

  context.arc(center.x + radius * Math.cos(2 * Math.PI / 5 * 1), center.y + radius * Math.sin(2 * Math.PI / 5 * 1), radius, 2 * Math.PI / 5 * 3.5 + rotateAngle, 2 * Math.PI / 5 * (4 + 1/3) + rotateAngle, false);

  context.stroke();
  context.closePath();

  context.strokeStyle = 'green';
  //Actually draw on the canvas
  context.beginPath();

  context.arc(center.x + radius * Math.cos(2 * Math.PI / 5 * 2), center.y + radius * Math.sin(2 * Math.PI / 5 * 2), radius, 2 * Math.PI / 5 * 4.5 + rotateAngle, 2 * Math.PI / 5 * (0 + 1/3) + rotateAngle, false);

  context.stroke();
  context.closePath();

  context.strokeStyle = 'yellow';
  //Actually draw on the canvas
  context.beginPath();

  context.arc(center.x + radius * Math.cos(2 * Math.PI / 5 * 3), center.y + radius * Math.sin(2 * Math.PI / 5 * 3), radius, 2 * Math.PI / 5 * 0.5 + rotateAngle, 2 * Math.PI / 5 * (1 + 1/3) + rotateAngle, false);

  context.stroke();
  context.closePath();

  context.strokeStyle = 'orange';
  //Actually draw on the canvas
  context.beginPath();

  context.arc(center.x + radius * Math.cos(2 * Math.PI / 5 * 4), center.y + radius * Math.sin(2 * Math.PI / 5 * 4), radius, 2 * Math.PI / 5 * 1.5 + rotateAngle, 2 * Math.PI / 5 * (2 + 1/3) + rotateAngle, false);

  context.stroke();
  context.closePath();

  context.strokeRect(10,10,10,10);
//  context.beginPath();
//  context.moveTo(20, 20);               // Create a starting point
//  context.lineTo(100, 20);              // Create a horizontal line
//  context.arcTo(150, 20, 150, 70, 50);  // Create an arc
//  context.lineTo(150, 120);             // Continue with vertical line
//  context.stroke();                     // Draw it
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
  //rotateAngle = 2 * Math.PI / 5;
}, false);

tick = 0;
draw();
