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
describe("Light-blue rectangle. There is a binary search tree with a root of 5. It's left child is 3, and it's right child is 8. The left child of 3 is 1, and the right child of 3 is 4. The left child of 8 is 7, and the right child of 8 is 9. On the right side of the canvas are 10 rounded rectangles. The rectangles have the following labels: root, nodes, edges, leaf nodes, internal nodes, siblings, height, depth, level, and degree. When you mouse over each rectangle, the corresponding part of the tree changes color, and text appears below the tree. When you mousover 'Root', node 5 becomes blue. You see the following text: 'The root (blue) is top node in the tree. You can also think of the root as being the first node. Roots do not have a parent node.' When you mouseover 'Nodes', all the nodes become blue. You see the following text: 'Nodes (blue) are the elements in a tree which contain data and point to another node(s).' When you mouseover 'Edges', all the lines connecting nodes turn blue. You see the following text: 'Edges (blue) are the that connect one node in a tree to another. Edges are top-down; that is they point from parent to child.' When you mouseover 'Leaf Nodes', the nodes 1, 4, 7, and 9 become blue. You see the following text: 'Leaf nodes (blue) are the last nodes in a tree. Leaf nodes do not have children.' When you mouseover 'Internal Nodes', the nodes 3 and 8 become blue. You see the following text: 'Internal nodes (blue) are nodes, excluding the root, that have children.' When you mouseover 'Siblings', nodes 3 and 8 become blue. Nodes 1 and 4 become green, and nodes 7 and 9 become red. 'Sibling nodes are nodes that share the same parent. Nodes 3 & 8 (blue) are siblings, 1 & 4 (green) are siblings, and 7 & 9 (red) are siblings.' When you mouseover 'Height', node 5 becomes blue The edge between 5 and 8 and the edge between 8 and 9 are also blue. The node 3 becomes green, and the edge between 3 and 1 is also green. You see the following text: 'Height is the number of edges between a node and the leaf nodes. Node 5 (blue) has a height of 2, and node 3 (green) has a hight of 1. Leaf nodes have a height of 0.' When you mouseover 'Depth`, the node 4 is green. The edge between 4 and 3 and the edge between 3 and 5 are also green. The node 8 is blue, and the edge between 8 and 5 is also blue. You see the following text: 'The depth of a node is the number of edges between it and the root. Node 8 (blue) has a depth of 1, while node 4 (green) has a depth of 2.' When you mouseover 'Level', node 5 becomes blue, nodes 3 and 8 become green, and nodes 1, 4, 7, and 9 become red. You see the following text: 'Node 5 (blue) in on level 0, nodes 3 & 8 (green) are on level 1, and nodes 1, 4, 7, & 9 are on level 2.' When you mouseover 'Degree', nodes 3 and 8 are blue, nodes 1 and 4 are green, and node 9 is red. You see the following text: 'Degree represents number of children. The degree of node 5 is 2 (blue). The degree of node 3 is 2 (green). The degree of a leaf node (red) is 0.'")
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
