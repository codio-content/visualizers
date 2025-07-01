class Button {
  constructor(x, y, buttonTxt) {
    this.x = x;
    this.y = y;
    this.txt = buttonTxt;
    this.w = 140;
    this.h = 30;
    this.fillColor = backgroundColor;
    this.strokeColor = defaultColor;
  }

  drawButton() {
    fill(color(this.fillColor));
    stroke(color(defaultColor));
    rect(this.x, this.y, this.w, this.h, 10);

    textAlign(CENTER, CENTER);
    noStroke();
    textSize(20);
    fill(color(this.strokeColor));
    text(this.txt, this.x + this.w / 2, this.y + this.h / 2);
  }

  touchingMouse() {
    let horizontal = mouseX >= this.x && mouseX <= this.x + this.w;
    let vertical = mouseY >= this.y && mouseY <= this.y + this.h;
    let touching = vertical && horizontal;
    // console.log("touching: " + touching)
    if (touching) {
      this.fillColor = defaultColor;
      this.strokeColor = backgroundColor;
      if (this.txt === "Root") {
        description = "The root (blue) is top node in the tree. You can also think of the root as being the first node. Roots do not have a parent node.";
        drawRoot();
      } else if (this.txt === "Nodes") {
        description = "Nodes (blue) are the elements in a tree which contain data and point to another node(s).";
        drawNodes();
      } else if (this.txt === "Edges") {
        description = "Edges (blue) are the that connect one node in a tree to another. Edges are top-down; that is they point from parent to child.";
        drawEdges();
      } else if (this.txt === "Leaf Nodes") {
        description = "Leaf nodes (blue) are the last nodes in a tree. Leaf nodes do not have children.";
        drawLeafNodes();
      } else if (this.txt === "Internal Nodes") {
        description = "Internal nodes (blue) are nodes, excluding the root, that have children.";
        drawInternalNodes();
      } else if (this.txt === "Siblings") {
        description = "Sibling nodes are nodes that share the same parent. Nodes 3 & 8 (blue) are siblings, 1 & 4 (green) are siblings, and 7 & 9 (red) are siblings.";
        drawSiblings();
      } else if (this.txt === "Height") {
        description = "Height is the number of edges between a node and the leaf nodes. Node 5 (blue) has a height of 2, and node 3 (green) has a hight of 1. Leaf nodes have a height of 0.";
        drawHeight();
      } else if (this.txt === "Depth") {
        description = "The depth of a node is the number of edges between it and the root. Node 8 (blue) has a depth of 1, while node 4 (green) has a depth of 2.";
        drawDepth();
      } else if (this.txt === "Level") {
        description = "Node 5 (blue) in on level 0, nodes 3 & 8 (green) are on level 1, and nodes 1, 4, 7, & 9 are on level 2.";
        drawLevel();
      } else if (this.txt === "Degree") {
        description = "Degree represents number of children. The degree of node 5 is 2 (blue). The degree of node 3 is 2 (green). The degree of a leaf node (red) is 0.";
        drawDegree();
      }
      return true;
    } else {
      this.fillColor = backgroundColor;
      this.strokeColor = defaultColor;
      return false;
    }
  }
}