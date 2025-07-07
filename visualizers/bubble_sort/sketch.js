let bars = [];
let speed = 1;
let i = 0;
let j = 0;
let barWidth = 8;
let start = false;

function setup() {
  createCanvas(640, 480);
  describe('Gray rectangle. Click on the canvas to see random bars of various sizes and colors. The bubble sort algorithm will sort the bars in ascending order.')
  for (let i = 0; i < width/barWidth; i++) {
    bars[i] = random(0, height);
  }
}

function draw() {
  colorMode(RGB);
  background(55);
  if (start == true) {
    showBars(bars);
    bubbleSort();
  }
}

function bubbleSort() {
  if (frameCount % speed == 0){
    if(i<bars.length){
      if(bars[j] > bars[j+1]){
        let temp = bars[j];
        bars[j] = bars[j+1];
        bars[j+1] = temp;
      }
      j++;
      
      if(j>=bars.length-i-1){
        j = 0;
        i++;
      }
    }
    else{
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
  j = 0;
  for(let i = 0; i < bars.length; i++) {
    bars[i] = random(height);
  }
  loop();
}