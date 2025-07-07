let bars = [];
let speed = 7;
let i = 0;
let barWidth = 8;
let start = false;

function setup() {
  createCanvas(640, 480);
  describe('Gray rectangle. Click on the canvas to see random bars of various sizes and colors. The selection sort algorithm will sort the bars in ascending order.')
  for (let i = 0; i < width/barWidth; i++) {
    bars[i] = random(0, height);
  }
}

function draw() {
  colorMode(RGB);
  background(55);
  if (start == true) {
    showBars(bars);
    selectionSort();
  }
}

function selectionSort() {
  if (frameCount % speed == 0) {
    if(i < bars.length){
      let min = i;
      for (let j = i + 1; j < bars.length; j++) {
        if (bars[min] > bars[j]) {
          min = j;
        }
      }
      [bars[ i ],bars[min]] = [bars[min],bars[ i ]];
      i++;
    } else {
      start = false;
      noLoop();
    }
  }
}

const showBars = (bars) => {
  for(let i = 0; i < bars.length; i++) {
    colorMode(RGB);
    stroke(55);
    colorMode(HSB);
    fill(map(bars[i], 0, height, 0, 255), 255, 255);
    rect(i * barWidth, height - bars[i], barWidth, bars[i]);
  }
}

function mousePressed() {
  start = true;
  reset();
}

function reset() {
  i = 0;
  for(let i = 0; i < bars.length; i++) {
    bars[i] = random(height);
  }
  loop();
}