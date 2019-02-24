

var canvas = document.getElementById("canvas");

canvas.width = canvas.scrollWidth;
canvas.height = canvas.scrollHeight;

var ctx = canvas.getContext("2d");
var count = 0;

var x = 0;
var y = 0;

var cell = 20;

//x-cell = 40
//y-cell = 30

var snake = {
	
	x: 20 * cell,
	y: 15 * cell,
	
	velx: 0,
	vely: 0,
	
	tail: [[17*cell, 15*cell], [18*cell, 15*cell], [19*cell, 15*cell] ],
	points: 0
	

};

var apple = {
	
	x: 10 * cell,
	y: 10 * cell
	
	
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function draw_board() {
		
		for(var i=0; i < canvas.width; i = i + cell){
			for(var j=0; j < canvas.height; j = j + cell){
				ctx.beginPath();
				ctx.lineWidth = "2";
				ctx.strokeStyle = "grey";
				ctx.rect(i, j, cell, cell);
				ctx.stroke();	
			}
		}
}

function draw_snake(x,y,t){
	
	ctx.beginPath();
	ctx.arc(x+10, y+10, 10, 0, 2*Math.PI, false);
	
	if(t===1){
			ctx.fillStyle = "#99ff66";
	} else {
			ctx.fillStyle = "green";
	}
	
	ctx.fill();
	ctx.lineWidth = 2;
	ctx.strokeStyle = "#003300";
	ctx.stroke();	
}

function draw_apple(x,y){
	
	ctx.beginPath();
	ctx.arc(x+10, y+10, 10, 0, 2*Math.PI, false);
	ctx.fillStyle = "red";
	ctx.fill();
	ctx.lineWidth = 2;
	ctx.strokeStyle = "#003300";
	ctx.stroke();	
}

function test_tail(a){
	
  for(var i = 0; i<snake.tail.length; ++i){
    if (a[0] === snake.tail[i][0] && a[1] === snake.tail[i][1]){
    	return true;
    }
  }
return false;
}


function reset_game(){
	
	snake.x = 20 * cell;
	snake.y = 15 * cell;
	
	snake.velx = 0;
	snake.vely = 0;
	
	snake.tail = [[17*cell, 15*cell], [18*cell, 15*cell], [19*cell, 15*cell] ];
	alert("Game Over!\nYour points: " + snake.points);
	snake.points = 0;
	}

function loop() {
	

	
	
	requestAnimationFrame(loop);
	
	if (++count < 10) {
		return;
	}
	count = 0;
	
	ctx.clearRect(0,0,canvas.width,canvas.height);
	
	//draw_board();
	draw_apple(apple.x, apple.y);
	draw_snake(snake.x, snake.y, 1);
	


	if(test_tail([snake.x, snake.y])){
		reset_game();	
		return;
	}
	
	if(snake.x >= 800) {
		reset_game();
		return;
	} else if(snake.x < 0){
		reset_game();
		return;
	} else if(snake.y >= 600){
		reset_game();
		return;
	} else if(snake.y < 0){
		reset_game();
		return;
	}
	
	if (snake.x === apple.x && snake.y === apple.y ){
		apple.x = getRandomInt(0,40) * cell;
		apple.y = getRandomInt(0,30) * cell;
		snake.tail.push([snake.x, snake.y]);
		++snake.points; 
	}

	for (var i=0; i < snake.tail.length; ++i){
		var a = snake.tail[i][0]; 
		var b = snake.tail[i][1];
		draw_snake(a,b, 0);
	}
	
	if(snake.velx !== 0 || snake.vely !== 0){
		

		
		snake.tail.shift();
		snake.tail.push([snake.x, snake.y]);
		
		snake.x = snake.x + snake.velx;	
		snake.y = snake.y + snake.vely;
	
	
	}
	
	

	
	
	

	
}

document.addEventListener("keydown", move);

function move(e){
	
	//left
	if(e.which === 37 && snake.velx !== cell){
		snake.velx = -cell;
		snake.vely = 0;
	}
	
	//up
	else if(e.which === 38 && snake.vely !== cell){
		snake.velx = 0;
		snake.vely = -cell;
  	} 	
	
	//right
	else if(e.which === 39 && snake.velx !== -cell){
		snake.velx = cell;
		snake.vely = 0;
	}
		
	//down
	else if(e.which === 40 && snake.vely !== -cell){
		snake.velx = 0;
		snake.vely = cell;
	}
	
}

requestAnimationFrame(loop);