

var chess = document.getElementById('chess');
if(!chess.getContext)
{
	alert("您的浏览器不支持<canvas>");
	//return ;
}

var isMain = true;
var radius = 15;
var chessBoard = [];
var isStart = false;

var context = chess.getContext('2d');
context.strokeStyle = '#BFBFBF';


var oneStep = function (i,j,me) 
{
	context.beginPath();
	context.arc(radius + i*30, radius + j* 30, 13, 0, 2*Math.PI);
	context.closePath();
	var gradient = context.createRadialGradient(radius + i*30 + 2,
		radius + j* 30 - 2, 
		13, 
		radius + i*30 + 2, 
		radius + j*30 - 2, 
		2);
	if(me)
	{
		gradient.addColorStop(0, "#0A0A0A");
		gradient.addColorStop(1 ,"#636766");
	}
	else
	{
		gradient.addColorStop(0, "#D1D1D1");
		gradient.addColorStop(1 ,"#F9F9F9");
	}
	
	context.fillStyle = gradient;
	context.fill();
}


/**
 * [i description]
 * @type {Number}
 */
var drawChessBord = function ()
{
	for(var i = 0; i < radius; i++)
	{
		context.moveTo(30 * i + radius,  radius);
		context.lineTo(30 * i + radius, 435);
		context.stroke();

		context.moveTo(radius, 30 * i + radius);
		context.lineTo(435, 30 * i + radius);
		context.stroke();
	}
}



chess.onclick = function(e)
{
	if(!isStart) return;
	var offX = e.offsetX;
	var offY = e.offsetY;
	var i = Math.floor(offX/30);
	var j = Math.floor(offY/30);
	if(i < 0 || j < 0 || i>=radius || j >= radius)
	{
		alert("外面不能绘制");
	}
	else
	{
		if(chessBoard[i][j] == 0)
		{
			oneStep(i, j, isMain);
			if(isMain)
			{
				chessBoard[i][j] = 1;
			}
			else
			{
				chessBoard[i][j] = 2;
			}
			isMain = !isMain;
		}
	}
}

var resetBoard = function()
{
	chessBoard = [];
	for(var i=0; i< radius; i++)
	{
		chessBoard[i] = [];
		for (var j = 0; j<radius; j++)
		{
			chessBoard[i][j] = 0;
		}
	}

	isMain = true;
	isStart = true;
	context.clearRect(0,0,chess.width,chess.height);  

	drawChessBord();

}

window.onload = function()
{
	var start = document.getElementById('start');
	start.onclick = function(e)
	{
		resetBoard();
	}
}

