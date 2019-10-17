const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this._size = 0;
	}

	push(data, priority) {
		let node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
		this._size++;
	}

	pop() {
		if (this.parentNodes.length) {
			let detachedRoot = this.detachRoot();
			this.restoreRootFromLastInsertedNode(detachedRoot);
			this.shiftNodeDown(this.root);
			this._size--;
			return detachedRoot.data;
		}
	}

	detachRoot() {
		const detached = this.root;

		if (this.parentNodes.indexOf(this.root) >= 0) {
			this.parentNodes.shift();
		}

		this.root = null;

		return detached;
	}

	restoreRootFromLastInsertedNode(detached) {
		let lastNode = this.parentNodes[this.parentNodes.length - 1];
		if (!lastNode) return;

		if (lastNode.parent) {
			if ((this.parentNodes.indexOf(lastNode.parent) === -1) && (lastNode.parent !== detached)) {
				this.parentNodes.unshift(lastNode.parent);
			}
			lastNode.parent.removeChild(lastNode);

			this.root = lastNode;

			if (detached.left) {
				lastNode.left = detached.left;
				lastNode.left.parent = lastNode;
			}

			if (detached.right) {
				lastNode.right = detached.right;
				lastNode.right.parent = lastNode;
			}

			let lastNodeIndex = this.parentNodes.indexOf(lastNode);
			if (lastNodeIndex >= 0) {
				this.parentNodes.splice(lastNodeIndex, 1);
			}

			if (!lastNode.left || !lastNode.right) {
				this.parentNodes.unshift(lastNode);
			}
		}
	}

	size() {
		return this._size;
	}

	isEmpty() {
		return this._size === 0 ? true : false;
	}

	clear() {
		this.root = null;
		this.parentNodes.length = 0;
		this._size = 0;
	}

	insertNode(node) {
		this.parentNodes.push(node);

		if (this.parentNodes.length === 1) {
			this.root = node;
		} else {
			this.parentNodes[0].appendChild(node);
		}

		if (this.parentNodes[0].left && this.parentNodes[0].right) {
			this.parentNodes.shift();
		}
	}

	shiftNodeUp(node) {

		if (!node.parent) {
			this.root = node;
			return;
		}

		if (node.priority > node.parent.priority) {
			const nodeIndex = this.parentNodes.indexOf(node);
			const parentIndex = this.parentNodes.indexOf(node.parent);

			if (nodeIndex >= 0) {
				if (parentIndex >= 0) {
					this._swap(nodeIndex, parentIndex);
				} else {
					this.parentNodes.splice(nodeIndex, 1, node.parent);
				}
			}

			node.swapWithParent();
			this.shiftNodeUp(node);
		}
	}

	shiftNodeDown(node) {
		if (!node) return;
		if (!node.left && !node.right) return;

		if (node.left && node.right) {
			if (node.left.priority > node.priority || node.right.priority > node.priority) {
				if (node.left.priority > node.right.priority) {
					if (this.root === node) {
						this.root = node.left;
					}

					const nodeIndex = this.parentNodes.indexOf(node);
					const swapedIndex = this.parentNodes.indexOf(node.left);
					if (swapedIndex >= 0) {
						if (nodeIndex >= 0) {
							this._swap(nodeIndex, swapedIndex);
						} else {
							this.parentNodes.splice(swapedIndex, 1, node);
						}
					}

					node.left.swapWithParent();
					this.shiftNodeDown(node);
					return;
				}

				if (node.right.priority > node.left.priority) {
					if (this.root === node) {
						this.root = node.right;
					}

					const nodeIndex = this.parentNodes.indexOf(node);
					const swapedIndex = this.parentNodes.indexOf(node.right);
					if (swapedIndex >= 0) {
						if (nodeIndex >= 0) {
							this._swap(nodeIndex, swapedIndex);
						} else {
							this.parentNodes.splice(swapedIndex, 1, node);
						}
					}

					node.right.swapWithParent();
					this.shiftNodeDown(node);
					return;
				}
			}
		} else if (!node.left && node.right.priority > node.priority) {
			if (this.root === node) {
				this.root = node.right;
			}

			const nodeIndex = this.parentNodes.indexOf(node);
			const swapedIndex = this.parentNodes.indexOf(node.right);
			if (swapedIndex >= 0) {
				if (nodeIndex >= 0) {
					this._swap(nodeIndex, swapedIndex);
				} else {
					this.parentNodes.splice(swapedIndex, 1, node);
				}
			}

			node.right.swapWithParent();
			this.shiftNodeDown(node);
		} else if (!node.right && node.left.priority > node.priority) {
			if (this.root === node) {
				this.root = node.left;
			}

			const nodeIndex = this.parentNodes.indexOf(node);
			const swapedIndex = this.parentNodes.indexOf(node.left);
			if (swapedIndex >= 0) {
				if (nodeIndex >= 0) {
					this._swap(nodeIndex, swapedIndex);
				} else {
					this.parentNodes.splice(swapedIndex, 1, node);
				}
			}

			node.left.swapWithParent();
			this.shiftNodeDown(node);
		} else return;
	}

	_swap(item1, item2) {
		let buff = this.parentNodes[item1];
		this.parentNodes[item1] = this.parentNodes[item2];
		this.parentNodes[item2] = buff;
	}
}

module.exports = MaxHeap;
