class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (!this.left) {
			this.left = node;
			node.parent = this;
		} else if (!this.right) {
			this.right = node;
			node.parent = this;
		} else return false;
	}

	removeChild(node) {
		if (this.left === node) {
			node.parent = null;
			this.left = null;
		} else if (this.right === node) {
			node.parent = null;
			this.right = null;
		} else throw new Error();
	}

	remove() {
		if (!this.parent) return;

		this.parent.removeChild(this);
	}

	swapWithParent() {
		if (!this.parent)	return; 
	
		if (this === this.parent.left || this === this.parent.right) {
			let temp = {};
			temp.parent = this.parent.parent;
			temp.left = this.parent.left;
			temp.right = this.parent.right;

			if (this.left) this.left.parent = this.parent;
			if (this.right) this.right.parent = this.parent;

			this.parent.left = this.left;
			this.parent.right = this.right;
			this.parent.parent = this;

			if (this === temp.left) {
				this.left = this.parent;
				this.right = temp.right;
				if (this.right) this.right.parent = this;
			} else if (this === temp.right) {
				this.right = this.parent;
				this.left = temp.left;
				if (this.left) this.left.parent = this;
			}

			this.parent = temp.parent;
			if (this.parent) {
				if (this.parent.left === this.left || this.parent.left === this.right) {
					this.parent.left = this;
				}
				if (this.parent.right === this.left || this.parent.right === this.right) {
					this.parent.right = this;
				}
			}
		}
	}
}

module.exports = Node;
