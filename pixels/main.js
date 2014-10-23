/*jslint browser:true*/
var canvas = document.getElementById('screen');
var context = canvas.getContext('2d');

var counter = 0;
var rectWidth = 40;
var rectHeight = 40;
var xMovement;
//Place rectangle in the middle of the screen
var y = ( canvas.height / 2 ) - ( rectHeight / 2 );
context.fillStyle = '#91C0FF';
function draw() {
  //There are smarter ways to increment time, but this is for demonstration purposes
  counter++;

  //Cool math below. More explanation in the text following the code.
  xMovement = Math.sin(counter / 25) * canvas.width * 0.4 + canvas.width / 2 - rectWidth / 2;

  //Clear the previous drawing results
  context.clearRect(0, 0, canvas.width, canvas.height);

  //Actually draw on the canvas
  context.fillRect(
    xMovement,
    y,
    rectWidth,
    rectHeight
  );

  //Request once a new animation frame is available to call this function again
  requestAnimationFrame( draw );
}
draw();
