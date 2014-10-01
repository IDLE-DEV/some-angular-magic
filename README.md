Some notes
==================

2D coords system:
minX maxX
minY maxY
n - points count

percentX = i/(n-1);
mathX = percentX * (maxX - minX) + minX;

mathY = func(mathX);

percentY = (mathY - minY) / (maxY - minY);
percentY = 1 - percentY;

x = percentX * width;
y = percentY * height;


location.hash.substr(1)

location.hash = val

window.addEventListener('hashchange',function(){});