document.addEventListener("DOMContentLoaded", () => {
  const debugLines = [];
  let debugEnabled = false; // Controls whether debug messages are collected

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
   * Represents a node in either the BST or Red-Black Tree.
   */
  class RBNode {
    /**
     * @param {*} value The value of the node.
     * @param {string} color The color of the node ('red' or 'black').
     * @param {RBNode|null} parent Reference to the parent node.
     * @param {RBNode|null} left Reference to the left child.
     * @param {RBNode|null} right Reference to the right child.
     */
    constructor(value, color = 'red', parent = null, left = null, right = null) {
      this.value = value;
      this.color = color;
      this.parent = parent;
      this.left = left;
      this.right = right;
    }
  }

  /**
   * Implements a standard Binary Search Tree (BST) with the ability to assign colors.
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
     * @param {string} color The color to assign to the inserted node.
     */
    insert(value, color) {
      const newNode = new RBNode(value, color);

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
      newNode.parent = parent; // Set the parent for the new node
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
       * @param {RBNode|null} node The current node being traversed.
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
        // Using a combination of prefix, value, and counter ensures uniqueness even with duplicate values.
        const nodeId = `bst-node-${node.value}-${counter++}`;
        nodes.push({
          id: nodeId,
          label: `${node.value}`,
          color: {
            background: node.color === 'red' ? '#FF0000' : '#000000',
            border: node.color === 'red' ? '#CC0000' : '#333333',
            highlight: {
              background: node.color === 'red' ? '#FF3333' : '#333333',
              border: node.color === 'red' ? '#FF0000' : '#000000'
            }
          },
          shape: 'circle',
          font: {
            color: '#FFFFFF'
          },
          value: node.value, // Store actual value for reference
          colorType: node.color // Store color type for direct reference
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
   * Implements a Red-Black Tree.
   * Based on Cormen et al., "Introduction to Algorithms".
   */
  class RedBlackTree {
    /**
     * @param {boolean} showNulls Whether to display NIL leaves in the visualization.
     */
    constructor(showNulls) {
      // TNULL is a sentinel node representing NIL (null) leaves. It's always black.
      this.TNULL = new RBNode(null, 'black');
      this.root = this.TNULL;
      this.showNulls = showNulls;
    }

    /**
     * Converts the tree into a compact string for debugging.
     * Performs an in-order traversal to list all non-NIL nodes with their colors.
     * @returns {string} A string representation of the tree's current state.
     */
    toDebugString() {
      const nodesInfo = [];
      const collectNodeInfo = (node) => {
        if (node === this.TNULL) {
          return;
        }
        collectNodeInfo(node.left);
        nodesInfo.push(`${node.value}(${node.color.toUpperCase()})`);
        collectNodeInfo(node.right);
      };
      collectNodeInfo(this.root);
      return `[${nodesInfo.join(', ')}]`;
    }

    /**
     * Inserts a new value into the Red-Black Tree.
     * @param {*} value The value to insert.
     */
    insert(value) {
      logDebug(`\n--- BEGIN INSERTION OF ${value} ---`);
      logDebug(`Inserting ${value} (initially red)`);
      let newNode = new RBNode(value);
      newNode.left = this.TNULL; // New nodes initially have TNULL children
      newNode.right = this.TNULL;

      let parent = null;
      let current = this.root;

      // Standard BST insertion to find the correct spot
      while (current !== this.TNULL) {
        parent = current;
        current = value < current.value ? current.left : current.right;
      }

      newNode.parent = parent; // Set the parent for the new node
      if (!parent) {
        this.root = newNode; // If no parent, this is the root
      } else if (value < parent.value) {
        parent.left = newNode;
      } else {
        parent.right = newNode;
      }

      // If new node is root, it must be black (Rule 2)
      if (newNode.parent === null) {
        newNode.color = 'black';
        logDebug(`-> Node ${newNode.value} is root, set to black.`);
        logDebug(`--- END INSERTION OF ${value} ---`);
        logDebug(`Current RBT State: ${this.toDebugString()}`);
        return;
      }

      // If grandparent is null, no fix needed (parent is root, which is black)
      if (newNode.parent.parent === null) {
        logDebug(`-> Node ${newNode.value}'s parent (${newNode.parent.value}) is root. No immediate violation requiring fixInsert.`);
        logDebug(`--- END INSERTION OF ${value} ---`);
        logDebug(`Current RBT State: ${this.toDebugString()}`);
        return;
      }

      // Fix Red-Black Tree properties after insertion
      this.fixInsert(newNode);

      logDebug(`--- END INSERTION OF ${value} ---`);
      logDebug(`Current RBT State: ${this.toDebugString()}`);
    }

    /**
     * Corrects Red-Black Tree violations after insertion of node 'k'.
     * @param {RBNode} k The newly inserted node (which is red).
     */
    fixInsert(k) {
      // Loop while the parent is red (violation of Rule 4: red nodes cannot have red children)
      while (k.parent && k.parent.color === 'red') {
        let grandParent = k.parent.parent;

        // Parent must exist and be red, so grandparent must exist.
        // If grandParent doesn't exist, k.parent must be the root (which should be black).
        // This check `k.parent && k.parent.color === 'red'` implicitly handles it.
        if (!grandParent) { // Should not happen if parent is red (root must be black)
            break;
        }

        // Determine if parent is left or right child of grandparent
        if (k.parent === grandParent.left) {
          let uncle = grandParent.right; // Uncle is right child of grandparent

          // Case 1.1: Uncle is red (Recoloring required)
          if (uncle !== this.TNULL && uncle.color === 'red') {
            logDebug(`-> Case 1.1: Parent (${k.parent.value} RED) and Uncle (${uncle.value} RED). Recoloring.`);
            k.parent.color = 'black';
            uncle.color = 'black';
            grandParent.color = 'red';
            k = grandParent; // Move up the tree to check for further violations
          } else {
            // Uncle is black (could be TNULL or an actual black node)
            // Case 1.2: Uncle is black and 'k' is a right child (Left Rotation needed)
            if (k === k.parent.right) {
              logDebug(`-> Case 1.2: Uncle ${uncle === this.TNULL ? 'NIL' : uncle.value} (BLACK), Node (${k.value}) is right child. Left rotate at ${k.parent.value}.`);
              k = k.parent; // 'k' moves to parent's position to prepare for next rotation
              this.leftRotate(k);
            }
            // Case 1.3: Uncle is black and 'k' is a left child (Right Rotation and Recoloring)
            logDebug(`-> Case 1.3: Uncle ${uncle === this.TNULL ? 'NIL' : uncle.value} (BLACK), Node (${k.value}) is left child (after potential Case 1.2 rotation). Right rotate at ${grandParent.value}, recolor.`);
            k.parent.color = 'black'; // Parent becomes black
            grandParent.color = 'red'; // Grandparent becomes red
            this.rightRotate(grandParent);
          }
        } else { // Parent is right child of grandparent (Symmetric cases)
          let uncle = grandParent.left; // Uncle is left child of grandparent

          // Case 2.1: Uncle is red (Recoloring required)
          if (uncle !== this.TNULL && uncle.color === 'red') {
            logDebug(`-> Case 2.1: Parent (${k.parent.value} RED) and Uncle (${uncle.value} RED). Recoloring.`);
            k.parent.color = 'black';
            uncle.color = 'black';
            grandParent.color = 'red';
            k = grandParent; // Move up the tree
          } else {
            // Uncle is black
            // Case 2.2: Uncle is black and 'k' is a left child (Right Rotation needed)
            if (k === k.parent.left) {
              logDebug(`-> Case 2.2: Uncle ${uncle === this.TNULL ? 'NIL' : uncle.value} (BLACK), Node (${k.value}) is left child. Right rotate at ${k.parent.value}.`);
              k = k.parent; // 'k' moves to parent's position
              this.rightRotate(k);
            }
            // Case 2.3: Uncle is black and 'k' is a right child (Left Rotation and Recoloring)
            logDebug(`-> Case 2.3: Uncle ${uncle === this.TNULL ? 'NIL' : uncle.value} (BLACK), Node (${k.value}) is right child (after potential Case 2.2 rotation). Left rotate at ${grandParent.value}, recolor.`);
            k.parent.color = 'black'; // Parent becomes black
            grandParent.color = 'red'; // Grandparent becomes red
            this.leftRotate(grandParent);
          }
        }
      }
      // Rule 2: Root must always be black
      if (this.root.color !== 'black') {
        logDebug(`-> Root (${this.root.value}) must be black. Recoloring root.`);
      }
      this.root.color = 'black';
    }

    /**
     * Performs a left rotation on the subtree rooted at 'x'.
     * @param {RBNode} x The node to rotate around.
     */
    leftRotate(x) {
      logDebug(`   Performing Left Rotate at node ${x.value}`);
      let y = x.right; // y is x's right child
      x.right = y.left; // x's right child becomes y's left child
      if (y.left !== this.TNULL) {
        y.left.parent = x; // Update y's left child's parent to x
      }
      y.parent = x.parent; // y's parent becomes x's parent

      if (x.parent === null) { // If x was the root
        this.root = y;
      } else if (x === x.parent.left) { // If x was a left child
        x.parent.left = y;
      } else { // If x was a right child
        x.parent.right = y;
      }
      y.left = x; // y's left child becomes x
      x.parent = y; // x's parent becomes y
    }

    /**
     * Performs a right rotation on the subtree rooted at 'x'.
     * @param {RBNode} x The node to rotate around.
     */
    rightRotate(x) {
      logDebug(`   Performing Right Rotate at node ${x.value}`);
      let y = x.left; // y is x's left child
      x.left = y.right; // x's left child becomes y's right child
      if (y.right !== this.TNULL) {
        y.right.parent = x; // Update y's right child's parent to x
      }
      y.parent = x.parent; // y's parent becomes x's parent

      if (x.parent === null) { // If x was the root
        this.root = y;
      } else if (x === x.parent.right) { // If x was a right child
        x.parent.right = y;
      } else { // If x was a left child
        x.parent.left = y;
      }
      y.right = x; // y's right child becomes x
      x.parent = y; // x's parent becomes y
    }

    /**
     * Converts the Red-Black Tree into a format suitable for Vis.js graph visualization.
     * @returns {{nodes: Array, edges: Array}} An object containing arrays of nodes and edges.
     */
    toVisGraph() {
      let nodes = [],
        edges = [],
        counter = 1;

      /**
       * Recursively traverses the tree to collect node and edge data.
       * @param {RBNode} node The current node being traversed.
       * @param {string|null} parentId The ID of the parent node for creating edges.
       */
      const traverse = (node, parentId = null) => {
        // If it's the TNULL sentinel node, and we are showing nulls, visualize it.
        // Otherwise, stop recursion for this path.
        if (node === this.TNULL) {
          if (this.showNulls && parentId !== null) {
            const nullId = `rbt-nil-${counter++}`; // Ensure unique IDs for RBT NILs
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
        const nodeId = `rbt-node-${node.value}-${counter++}`;
        nodes.push({
          id: nodeId,
          label: `${node.value}`,
          color: {
            background: node.color === 'red' ? '#FF0000' : '#000000',
            border: node.color === 'red' ? '#CC0000' : '#333333',
            highlight: {
              background: node.color === 'red' ? '#FF3333' : '#333333',
              border: node.color === 'red' ? '#FF0000' : '#000000'
            }
          },
          shape: 'circle',
          font: {
            color: '#FFFFFF'
          },
          value: node.value, // Store actual value for reference
          colorType: node.color // Store color type for direct reference
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
   * Parses the input string into an array of objects containing value and color.
   * Supports optional color specification, defaulting to 'red'.
   * @param {string} input The input string (e.g., "62(BLACK) 33(BLACK) 57(RED)").
   * @returns {Array<{value: number, color: string}>} An array of parsed node data.
   */
  function parseInput(input) {
    // Regex to capture number and an optional color in parentheses
    const regex = /(\d+)\s*(?:\(\s*(red|black)\s*\))?/gi;
    let match, result = [];
    while ((match = regex.exec(input)) !== null) {
      result.push({
        value: parseInt(match[1]),
        color: match[2] ? match[2].toLowerCase() : 'red' // Default to red if color not specified
      });
    }
    return result;
  }

  /**
   * Visualizes both the BST and Red-Black Tree based on the current input and settings.
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
    const rbt = new RedBlackTree(showNulls);

    // Insert all parsed values into both trees
    parsed.forEach(({
      value,
      color
    }) => {
      // For BST, we use the specified color directly
      bst.insert(value, color);
      // For RBT, it always inserts as red and then fixes its properties
      rbt.insert(value);
    });

    // Get graph data from both trees
    const {
      nodes: bstNodes,
      edges: bstEdges
    } = bst.toVisGraph();
    const {
      nodes: rbtNodes,
      edges: rbtEdges
    } = rbt.toVisGraph();

    // Draw the graphs
    drawVis("bstContainer", bstNodes, bstEdges);
    drawVis("rbtContainer", rbtNodes, rbtEdges);

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