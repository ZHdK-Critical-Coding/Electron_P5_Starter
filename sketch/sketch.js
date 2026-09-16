function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  line(0, 0, width, height);
  line(0, height, width, 0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
