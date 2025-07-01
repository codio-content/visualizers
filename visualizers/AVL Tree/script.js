document.addEventListener("DOMContentLoaded", () => {
  const debugLines = [];
  let debugEnabled = false;

  /**
   * Logs a debug message if debug output is enabled.
   * @param {string} message The message to log.
   */
  function logDebug(message) {
    if (debugEnabled) {
      debugLines.push(message);
    }
  }

  /**
   * Represents a node in either the BST or AVL Tree.
   */
  class AVLNode {
    /**
     * @param {*} value The value of the node.
     * @param {AVLNode|null} parent Reference to the parent node.
     * @param {AVLNode|null} left Reference to the left child.
     * @param {AVLNode|null} right Reference to the right child.
     */
    constructor(value, parent = null, left = null, right = null) {
      this.value = value;
      this.parent = parent;
      this.left = left;
      this.right = right;
      this.height = 1; // New property for AVL nodes
    }
  }

  /**
   * Implements a standard Binary Search Tree (BST).
   * This BST primarily serves to show the structure based on insertion order.
   */
  class BSTree {
    /**
     * @param {boolean} showNulls Whether to display NIL leaves in the visualization.
     */
    constructor(showNulls) {
      this.root = null;
      this.showNulls = showNulls;
    }

    /**
     * Inserts a new node into the BST.
     * @param {*} value The value to insert.
     */
    insert(value) {
      const newNode = new AVLNode(value); // Use AVLNode as base

      if (!this.root) {
        this.root = newNode;
        return;
      }

      let current = this.root;
      let parent = null;

      // Traverse the tree to find the correct insertion point
      while (current) {
        parent = current;
        if (value < current.value) {
          current = current.left;
        } else {
          current = current.right;
        }
      }

      // Link the new node to its parent
      newNode.parent = parent;
      if (value < parent.value) {
        parent.left = newNode;
      } else {
        parent.right = newNode;
      }
    }

    /**
     * Converts the BST into a format suitable for Vis.js graph visualization.
     * @returns {{nodes: Array, edges: Array}} An object containing arrays of nodes and edges.
     */
    toVisGraph() {
      let nodes = [],
        edges = [],
        counter = 1;

      /**
       * Recursively traverses the tree to collect node and edge data.
       * @param {AVLNode|null} node The current node being traversed.
       * @param {string|null} parentId The ID of the parent node for creating edges.
       */
      const traverse = (node, parentId = null) => {
        // Handle NIL nodes for visualization if enabled
        if (!node) {
          if (this.showNulls && parentId !== null) {
            const nullId = `bst-nil-${counter++}`; // Ensure unique IDs for BST NILs
            nodes.push({
              id: nullId,
              label: "NIL",
              color: {
                background: "#555",
                border: "#333",
                highlight: {
                  background: "#777",
                  border: "#555"
                }
              },
              shape: 'box', // Use 'box' shape for NIL nodes for distinction
              font: {
                color: '#FFFFFF',
                size: 10
              },
              value: null // Value is null for NIL
            });
            edges.push({
              from: parentId,
              to: nullId,
              arrows: 'to',
              dashes: true, // Dashed line for NIL connections
              color: '#888'
            });
          }
          return;
        }

        // Generate a unique ID for the node.
        const nodeId = `bst-node-${node.value}-${counter++}`;
        nodes.push({
          id: nodeId,
          label: `${node.value}`,
          color: {
            background: '#3498db', // Example: a standard blue for BST nodes
            border: '#2980b9',
            highlight: {
              background: '#5dade2',
              border: '#3498db'
            }
          },
          shape: 'circle',
          font: {
            color: '#FFFFFF'
          },
          value: node.value, // Store actual value for reference
        });

        if (parentId !== null) {
          edges.push({
            from: parentId,
            to: nodeId,
            arrows: 'to',
            color: '#777',
            length: 150 // Adjust edge length for visual spacing
          });
        }
        traverse(node.left, nodeId);
        traverse(node.right, nodeId);
      };
      traverse(this.root);
      return {
        nodes,
        edges
      };
    }
  }

  /**
   * Implements an AVL Tree.
   */
  class AVLTree {
    /**
     * @param {boolean} showNulls Whether to display NIL leaves in the visualization.
     */
    constructor(showNulls) {
      this.root = null;
      this.showNulls = showNulls;
    }

    /**
     * Helper to get the height of a node.
     * @param {AVLNode|null} node The node to get the height of.
     * @returns {number} The height of the node, or 0 if null.
     */
    getHeight(node) {
      return node ? node.height : 0; //
    }

    /**
     * Helper to update a node's height based on its children's heights.
     * @param {AVLNode} node The node to update the height of.
     */
    updateHeight(node) {
      if (node) {
        node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right)); //
      }
    }

    /**
     * Helper to get the balance factor of a node.
     * @param {AVLNode} node The node to get the balance factor of.
     * @returns {number} The balance factor (height of left subtree - height of right subtree).
     */
    getBalanceFactor(node) {
      if (!node) {
        return 0; //
      }
      return this.getHeight(node.left) - this.getHeight(node.right); //
    }

    /**
     * Performs a right rotation on the subtree rooted at 'y'.
     * @param {AVLNode} y The node to rotate around.
     * @returns {AVLNode} The new root of the subtree after rotation.
     */
    rightRotate(y) {
      logDebug(`   Performing Right Rotate at node ${y.value}`);
      let x = y.left; //
      let T2 = x.right; //

      // Perform rotation
      x.right = y; //
      y.left = T2; //

      // Update parents
      x.parent = y.parent; //
      if (y.parent) {
        if (y === y.parent.left) {
          y.parent.left = x;
        } else {
          y.parent.right = x;
        }
      } else {
        this.root = x;
      }
      y.parent = x; //
      if (T2) T2.parent = y; //

      // Update heights
      this.updateHeight(y); //
      this.updateHeight(x); //

      return x; // New root of the subtree
    }

    /**
     * Performs a left rotation on the subtree rooted at 'x'.
     * @param {AVLNode} x The node to rotate around.
     * @returns {AVLNode} The new root of the subtree after rotation.
     */
    leftRotate(x) {
      logDebug(`   Performing Left Rotate at node ${x.value}`);
      let y = x.right; //
      let T2 = y.left; //

      // Perform rotation
      y.left = x; //
      x.right = T2; //

      // Update parents
      y.parent = x.parent; //
      if (x.parent) {
        if (x === x.parent.left) {
          x.parent.left = y;
        } else {
          x.parent.right = y;
        }
      } else {
        this.root = y;
      }
      x.parent = y; //
      if (T2) T2.parent = x; //

      // Update heights
      this.updateHeight(x); //
      this.updateHeight(y); //

      return y; // New root of the subtree
    }

    /**
     * Balances the tree after insertion/deletion, starting from the given node.
     * @param {AVLNode} node The node to start balancing from.
     * @returns {AVLNode} The (potentially new) root of the balanced subtree.
     */
    balance(node) {
      this.updateHeight(node); // Always update height first

      const balanceFactor = this.getBalanceFactor(node); //

      // Left Heavy
      if (balanceFactor > 1) { //
        // Left-Right Case
        if (this.getBalanceFactor(node.left) < 0) { //
          logDebug(`   Balancing LR Case at node ${node.value}`);
          node.left = this.leftRotate(node.left); //
        }
        // Left-Left Case
        logDebug(`   Balancing LL Case at node ${node.value}`);
        return this.rightRotate(node); //
      }

      // Right Heavy
      if (balanceFactor < -1) { //
        // Right-Left Case
        if (this.getBalanceFactor(node.right) > 0) { //
          logDebug(`   Balancing RL Case at node ${node.value}`);
          node.right = this.rightRotate(node.right); //
        }
        // Right-Right Case
        logDebug(`   Balancing RR Case at node ${node.value}`);
        return this.leftRotate(node); //
      }
      return node; // No rotation needed
    }

    /**
     * Inserts a new value into the AVL Tree.
     * @param {*} value The value to insert.
     */
    insert(value) {
      logDebug(`\n--- BEGIN INSERTION OF ${value} ---`);
      this.root = this._insert(this.root, value, null); //
      logDebug(`--- END INSERTION OF ${value} ---`);
      logDebug(`Current AVL State: ${this.toDebugString()}`);
    }

    /**
     * Recursive helper function for insertion.
     * @param {AVLNode|null} node The current node in the recursion.
     * @param {*} value The value to insert.
     * @param {AVLNode|null} parent The parent of the current node.
     * @returns {AVLNode} The (potentially new) root of the subtree after insertion and balancing.
     */
    _insert(node, value, parent) {
      // Standard BST insertion
      if (!node) {
        let newNode = new AVLNode(value); //
        newNode.parent = parent; //
        logDebug(`-> Inserted ${value}`);
        return newNode;
      }

      if (value < node.value) {
        node.left = this._insert(node.left, value, node); //
      } else if (value > node.value) {
        node.right = this._insert(node.right, value, node); //
      } else {
        // Duplicate values are typically not allowed or handled differently in BSTs
        logDebug(`-> Duplicate value ${value} ignored.`);
        return node;
      }

      // Balance the tree on the way up the recursion
      return this.balance(node); //
    }

    /**
     * Converts the tree into a compact string for debugging, showing value, height, and balance factor.
     * Performs an in-order traversal.
     * @returns {string} A string representation of the tree's current state.
     */
    toDebugString() {
      const nodesInfo = [];
      const collectNodeInfo = (node) => {
        if (!node) {
          return;
        }
        collectNodeInfo(node.left);
        nodesInfo.push(`${node.value}(H:${node.height}, BF:${this.getBalanceFactor(node)})`);
        collectNodeInfo(node.right);
      };
      collectNodeInfo(this.root);
      return `[${nodesInfo.join(', ')}]`;
    }

    /**
     * Converts the AVL Tree into a format suitable for Vis.js graph visualization.
     * @returns {{nodes: Array, edges: Array}} An object containing arrays of nodes and edges.
     */
    toVisGraph() {
      let nodes = [],
        edges = [],
        counter = 1;

      /**
       * Recursively traverses the tree to collect node and edge data.
       * @param {AVLNode} node The current node being traversed.
       * @param {string|null} parentId The ID of the parent node for creating edges.
       */
      const traverse = (node, parentId = null) => {
        // If it's a null node, and we are showing nulls, visualize it.
        // Otherwise, stop recursion for this path.
        if (!node) {
          if (this.showNulls && parentId !== null) {
            const nullId = `avl-nil-${counter++}`; // Ensure unique IDs for AVL NILs
            nodes.push({
              id: nullId,
              label: "NIL",
              color: {
                background: "#555",
                border: "#333",
                highlight: {
                  background: "#777",
                  border: "#555"
                }
              },
              shape: 'box',
              font: {
                color: '#FFFFFF',
                size: 10
              },
              value: null // Value is null for NIL
            });
            edges.push({
              from: parentId,
              to: nullId,
              arrows: 'to',
              dashes: true,
              color: '#888'
            });
          }
          return;
        }

        // Generate a unique ID for the node.
        const nodeId = `avl-node-${node.value}-${counter++}`;
        nodes.push({
          id: nodeId,
          label: `${node.value} (H:${node.height})`, // Display height
          color: {
            background: '#2ecc71', // Example: a standard green for AVL nodes
            border: '#27ae60',
            highlight: {
              background: '#58d68d',
              border: '#2ecc71'
            }
          },
          shape: 'circle',
          font: {
            color: '#FFFFFF'
          },
          value: node.value // Store actual value for reference
        });

        if (parentId !== null) {
          edges.push({
            from: parentId,
            to: nodeId,
            arrows: 'to',
            color: '#777',
            length: 150
          });
        }
        traverse(node.left, nodeId);
        traverse(node.right, nodeId);
      };
      traverse(this.root);
      return {
        nodes,
        edges
      };
    }
  }

  // --- Visualization Functions ---

  /**
   * Draws the tree using Vis.js in the specified container.
   * @param {string} containerId The ID of the HTML element to draw the graph in.
   * @param {Array} nodes An array of node data for Vis.js.
   * @param {Array} edges An array of edge data for Vis.js.
   */
  function drawVis(containerId, nodes, edges) {
    const container = document.getElementById(containerId);
    const data = {
      nodes: new vis.DataSet(nodes),
      edges: new vis.DataSet(edges)
    };
    const options = {
      layout: {
        hierarchical: {
          direction: 'UD', // Up-Down layout
          sortMethod: 'directed', // Sort nodes based on tree structure
          levelSeparation: 100, // Vertical distance between levels
          nodeSpacing: 100 // Horizontal distance between nodes on the same level
        }
      },
      physics: {
        enabled: false // Disable physics for a static, hierarchical layout
      },
      nodes: {
        size: 20,
        font: {
          size: 14,
          color: '#FFFFFF'
        },
        borderWidth: 2,
        shadow: true
      },
      edges: {
        width: 1,
        shadow: true,
        smooth: {
          type: 'cubicBezier', // Smooth curves for edges
          forceDirection: 'vertical',
          roundness: 0.8
        }
      },
      interaction: {
        zoomView: true, // Allow zooming
        dragView: true // Allow dragging the view
      }
    };
    new vis.Network(container, data, options);
  }

  // --- Utility Functions ---

  /**
   * Parses the input string into an array of objects containing value.
   * @param {string} input The input string (e.g., "62 33 57").
   * @returns {Array<{value: number}>} An array of parsed node data.
   */
  function parseInput(input) {
    // Regex to capture only numbers
    const regex = /(\d+)/g; //
    let match, result = [];
    while ((match = regex.exec(input)) !== null) {
      result.push({
        value: parseInt(match[1]),
      });
    }
    return result;
  }

  /**
   * Visualizes both the BST and AVL Tree based on the current input and settings.
   */
  function visualizeTrees() {
    debugLines.length = 0; // Clear previous debug logs
    debugEnabled = document.getElementById("showDebug").checked; // Update debug status based on checkbox

    const input = document.getElementById('treeInput').value;
    const showNulls = document.getElementById('showNulls').checked;
    const showDebug = document.getElementById('showDebug').checked;
    const parsed = parseInput(input);

    // Create new tree instances for each visualization run
    const bst = new BSTree(showNulls);
    const avl = new AVLTree(showNulls); // NEW: AVLTree instance

    // Insert all parsed values into both trees
    parsed.forEach(({
      value
    }) => {
      bst.insert(value);
      avl.insert(value); // NEW: Insert into AVL tree
    });

    // Get graph data from both trees
    const {
      nodes: bstNodes,
      edges: bstEdges
    } = bst.toVisGraph();
    const {
      nodes: avlNodes,
      edges: avlEdges
    } = avl.toVisGraph(); // NEW: Get AVL graph data

    // Draw the graphs
    drawVis("bstContainer", bstNodes, bstEdges);
    drawVis("rbtContainer", avlNodes, avlEdges); // Draw AVL in the right container

    // Update debug log panel
    const logPanel = document.getElementById("debugLog");
    if (showDebug) {
      logPanel.classList.remove("debug-log-hidden"); // Show the debug log
      logPanel.textContent = debugLines.join("\n"); // Populate with collected messages
    } else {
      logPanel.classList.add("debug-log-hidden"); // Hide the debug log
      logPanel.textContent = ''; // Clear content when hidden
    }
  }

  // --- Event Listeners ---
  document.getElementById('visualizeBtn').addEventListener('click', visualizeTrees);
  document.getElementById('showNulls').addEventListener('change', visualizeTrees);
  document.getElementById('showDebug').addEventListener('change', visualizeTrees);

  // Perform an initial visualization when the page loads
  visualizeTrees();
});