var swidth=window.screen.availWidth;
var boxl=swidth*0.92;
var celll=swidth*0.18;
var spl=swidth*0.04;

function setTop(i,j){
	return spl+i*(spl+celll);
}
function setLeft(i,j){
	return spl+j*(spl+celll);	
}
function setColor(num){
	switch(num){
		case 2:
		case 4:
			return "#7c736a";
			break;
		default:
			return "#fff";
			break;
	}
}
function setbgColor(num){
	switch(num){
		case 2: return "#eee4da";break;
		case 4: return "#ece0c8";break;
		case 8: return "#f2b179";break;
		case 16: return "#f59563";break;
		case 32: return "#f57c5f";break;
		case 64: return "#f65d3b";break;
		case 128: return "#edce71";break;
		case 256: return "#edcc61";break;
		case 512: return "#ecc850";break;
		case 1024: return "#33b5e5";break;
		case 2048: return "#09c";break;
		case 4096: return "#a6c";break;
		case 8192: return "#93c";break;
	}
}


function nospace(){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(board[i][j]==0){
				return false;
			}
		}
	}	
	return true;
}


function canMoveLeft(){
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(board[i][j]!=0){
				if(board[i][j-1]==0 || board[i][j-1]==board[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}

function canMoveUp(){
	for(var i=1;i<4;i++){
		for(var j=0;j<4;j++){
			if(board[i][j]!=0){
				if(board[i-1][j]==0 || board[i-1][j]==board[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}

function canMoveRight(){
	for(var i=0;i<4;i++){
		for(var j=2;j>=0;j--){
			if(board[i][j]!=0){
				if(board[i][j+1]==0 || board[i][j+1]==board[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}

function canMoveDown(){
	for(var i=2;i>=0;i--){
		for(var j=0;j<4;j++){
			if(board[i][j]!=0){
				if(board[i+1][j]==0 || board[i+1][j]==board[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}

function noHBlock(x,fy,ty){
	for(var i=ty+1;i<fy;i++){
		if(board[x][i]!=0){
			return false;
		}
	}
	return true;
}
function noVBlock(y,fx,tx){
	for(var i=tx+1;i<fx;i++){
		if(board[i][y]!=0){
			return false;
		}
	}
	return true;
}


function noMove(){
	if(canMoveLeft()||canMoveUp()||canMoveRight()||canMoveDown()){
		return false;
	}
	return true;
}
