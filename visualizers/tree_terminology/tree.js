class Node {
  constructor(x, y, num, x2 = null, y2 = null, x3 = null, y3 = null) {
    this.x = x;
    this.y = y;
    this.num = num;
    this.color = defaultColor;
    this.left = new Edge(calculateLeftX(this.x), calculateLeftY(this.y), x2, y2);
    this.right = new Edge(calculateRightX(this.x), calculateRightY(this.y), x3, y3);
  }
  
  show() {
    this.left.show();
    this.right.show();
    noFill();
    stroke(color(this.color));
    circle(this.x, this.y, 80);
    noStroke();
    fill(color(this.color));
    textSize(30);
    textAlign(CENTER, CENTER);
    text(this.num, this.x, this.y);
  }
}

class Edge {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.color = defaultColor;
  }
  
  show() {
    if (this.x2) {
      stroke(color(this.color));
      line(this.x1, this.y1, this.x2, this.y2);
    }
    
  }
}