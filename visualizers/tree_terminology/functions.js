function createButtons() {
  for (let i = 0; i < 10; i++) {
    let buttonTxt;
    if (i == 0) {
      buttonTxt = "Root";
    } else if (i == 1) {
      buttonTxt = "Nodes";
    } else if (i == 2) {
      buttonTxt = "Edges";
    } else if (i == 3) {
      buttonTxt = "Leaf Nodes";
    } else if (i == 4) {
      buttonTxt = "Internal Nodes";
    } else if (i == 5) {
      buttonTxt = "Siblings";
    } else if (i == 6) {
      buttonTxt = "Height";
    } else if (i == 7) {
      buttonTxt = "Depth";
    } else if (i == 8) {
      buttonTxt = "Level";
    } else if (i == 9) {
      buttonTxt = "Degree";
    }
    buttons.push(new Button(400, 35 + 37 * i, buttonTxt, description));
  }
}

function createNodes() {
  tree.push(new Node(200, 80, "5", 100, 170, 300, 170));
  tree.push(new Node(100, 210, "3", 56, 300, 152, 300));
  tree.push(new Node(300, 210, "8", 248, 300, 344, 300));
  tree.push(new Node(56, 340, "1"));
  tree.push(new Node(152, 340, "4"));
  tree.push(new Node(248, 340, "7"));
  tree.push(new Node(344, 340, "9"));
}

function calculateLeftX(x) {
  let newX = x + 40 * cos(HALF_PI + 0.3);
  return newX;
}

function calculateLeftY(y) {
  let newY = y + 40 * sin(HALF_PI + 0.3);
  return newY;
}

function calculateRightX(x) {
  let newX = x + 40 * cos(HALF_PI - 0.3);
  return newX;
}

function calculateRightY(y) {
  let newY = y + 40 * sin(HALF_PI - 0.3);
  return newY;
}

function allAreFalse(arr) {
  return arr.every(element => element === false);
}

function resetTree() {
  defaultNodeColors([0, 1, 2, 3, 4, 5, 6]);
  defaultEdgeColors([0, 1, 2, 3, 4, 5, 6]);
}

function defaultNodeColors(t) {
  for (let i = 0; i < t.length; i++) {
    tree[t[i]].color = defaultColor;
  }
}

function defaultEdgeColors(t) {
  for (let i = 0; i < t.length; i++) {
    tree[t[i]].left.color = defaultColor;
    tree[t[i]].right.color = defaultColor;
  }
}

function drawRoot() {
  tree[0].color = h1Color;
}

function drawNodes() {
  for (let i = 0; i < tree.length; i++) {
    tree[i].color = h1Color;
  }
}

function drawEdges() {
  tree[0].left.color = h1Color;
  tree[0].right.color = h1Color;
  tree[1].left.color = h1Color;
  tree[1].right.color = h1Color;
  tree[2].left.color = h1Color;
  tree[2].right.color = h1Color;
}

function drawLeafNodes() {
  tree[3].color = h1Color;
  tree[4].color = h1Color;
  tree[5].color = h1Color;
  tree[6].color = h1Color;
}

function drawInternalNodes() {
  tree[1].color = h1Color;
  tree[2].color = h1Color;
}

function drawSiblings() {
  tree[1].color = h1Color;
  tree[2].color = h1Color;
  tree[3].color = h2Color;
  tree[4].color = h2Color;
  tree[5].color = h3Color;
  tree[6].color = h3Color;
}

function drawHeight() {
  tree[0].color = h1Color;
  tree[0].right.color = h1Color;
  tree[2].right.color = h1Color;
  tree[1].color = h2Color;
  tree[1].left.color = h2Color;
}

function drawDepth() {
  tree[0].right.color = h1Color;
  tree[2].color = h1Color;
  
  tree[4].color = h2Color;
  tree[3].right.color = h2Color;
  tree[0].left.color = h2Color;
  tree[1].right.color = h2Color;
}

function drawLevel() {
  tree[0].color = h1Color;
  tree[1].color = h2Color;
  tree[2].color = h2Color;
  tree[3].color = h3Color;
  tree[4].color = h3Color;
  tree[5].color = h3Color;
  tree[6].color = h3Color;
}

function drawDegree() {
  // tree[0].color = h1Color;
  tree[1].color = h1Color;
  tree[2].color = h1Color;
  tree[3].color = h2Color;
  tree[4].color = h2Color;
  tree[6].color = h3Color;
}