let backgroundColor = "#F4F6FA";
let defaultColor = "#0F1340";
let h1Color = "#3574E3";
let h2Color = "#00A83B";
let h3Color = "#e74c3c";
let buttonColor = "#3F484C";
let buttons = [];
let tree = [];
let touch = [];
let description = "";

function setup() {
  createCanvas(550, 480);
  strokeWeight(4);

  createButtons();
  createNodes();
}

function draw() {
  background(color(backgroundColor));
  for (let i = 0; i < buttons.length; i++) {
    touch[i] = buttons[i].touchingMouse();
    buttons[i].drawButton();
  }
  // console.log(touch);

  if (allAreFalse(touch)) {
    resetTree();
    description = "";
  }

  for (let i = 0; i < tree.length; i++) {
    tree[i].show();
  }
  
  textAlign(LEFT, CENTER);
  textSize(20);
  fill(color(defaultColor));
  noStroke();
  text(description, 20, 440, width - 30);
}
