function Binary()
{
		
	var Node = function(key)
	{
		this.key = key ;
		this.left = null;
		this.right = null;
	}
	var root = null;

	//实现分支逻辑
	insertNode = function(node, newNode)
	{
		if(node.key > newNode.key)
		{
			if(node.left === null)
			{
				node.left = newNode;
			}
			else
			{
				insertNode(node.left, newNode);
			}
		}
		else
		{
			if(node.right === null)
			{
				node.right = newNode;
			}
			else
			{
				insertNode(node.right, newNode);
			}
		}
		
	}

	//插入入口
	this.insert = function(key)
	{
		var newNode = new Node(key);
		if(root === null)
		{
			root = newNode;
		}
		else
		{
			insertNode(root, newNode);
		}
		
	}



	//中序排序
	inOrderTraverseNode = function(node, callback)
	{
		if(node !== null)
		{
			inOrderTraverseNode(node.left, callback);
			callback(node.key);
			inOrderTraverseNode(node.right, callback);
		}

	}


	this.inOrderTraverse = function(callback) 
	{
		inOrderTraverseNode(root, callback);
	}


	//求最小值
	var findMin = function(node)
	{
		if(node !== null)
		{
			while(node.left !== null)
			{
				node = node.left;
			}

			return node.key;
		}

		return null;
	}

	this.min = function()
	{
		return findMin(root);
	}

	//求最大值
	var findMax = function(node)
	{
		if(node !== null)
		{
			while(node.right !== null)
		{
			node = node.right;
		}

		return node.key;
		}

		return null;
	}

	this.max = function()
	{
		return findMax(root);
	}

	//随机查找
	var searhNode = function (node, key)
	{
		if(node === null)
		{
			return false;
		}

		if(node.key > key)
		{
			return searhNode(node.left, key);
		}
		else if(node.key < key)
		{
			return searhNode(node.right, key);
		}

		return true;
	}

	this.searh = function (key)
	{
		return searhNode(root, key);
	}

	var findMinNode = function(node)
	{
		if(node === null)
		{
			return null;
		}

		while(node.left !== null)
		{
			node = node.left;
		}
		return node;
	}

	var removeNode = function (node, key)
	{
		if(node === null)
		{
			return null;
		}

		if(key < node.key)
		{
			node.left = removeNode(node.left, key);
			return node;
		}
		else if(key > node.key)
		{
			node.right = removeNode(node.right, key);
			return node;
		}

		else
		{
			if(node.left === null && node.right === null)
			{
				node = null;
				return null;
			}

			if(node.left === null)
			{
				node = node.right;
				return node;
			}
			else if(node.right === null)
			{
				node = node.left;
				return node;
			}

			var aux = findMinNode(node.right);
			node.key = aux;
			node.right = removeNode(node.right, aux.key);
			return node;
		}
	}


	this.remove = function(key)
	{
		removeNode(root, key);
	}

var nodes = [45, 30, 25, 78, 47, 90,23,24,56,32,66,89];
var binary = new Binary();
nodes.forEach(function(key)
{
	binary.insert(key);
});

var callback = function (key)
{
	console.log(key);
}

binary.inOrderTraverse(callback);

console.log("当前最小值为:" + binary.min());
console.log("当前最大值为:" + binary.max());
console.log(binary.searh(30));


