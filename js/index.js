var board=new Array();
var conflict=new Array();
var score=0;

var startx=0,starty=0,endx=0,endy=0;

$(function(){
	forMobile();
	newgame();
})

function forMobile(){
	if(boxl>500){
		boxl=500;
		celll=100;
		spl=20;
	}
	
	$("#gamebox").css('width',boxl);
	$("#gamebox").css('height',boxl);
	$("#gamebox").css('border-radius',boxl*0.016);
	
	$(".box").css('width',celll);
	$(".box").css('height',celll);
	$(".box").css('border-radius',celll*0.06);
	
	$(".gameover").css('width',boxl);
	$(".gameover").css('height',boxl);
	$(".gameover").css('line-height',boxl+'px');
}

function newgame(){
	$(".gameover").hide();
	//初始化棋盘
	init();
	//随机2个格子生成数字
	randomNum();
	randomNum();
}

function init(){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			$('#box-'+i+'-'+j).css('top',setTop(i,j));
			$('#box-'+i+'-'+j).css('left',setLeft(i,j));
		}
	}
	
	for(var i=0;i<4;i++){
		board[i]=new Array();
		conflict[i]=new Array();
		for(j=0;j<4;j++){
			board[i][j]=0;
			conflict[i][j]=false;
		}
	}
	
	updateBoard();
};

function updateBoard(){
	$(".number").remove();
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			$("#gamebox").append('<div class="number" id="number-'+i+'-'+j+'"></div>');
			
			$(".number").css('line-height',celll+'px');
			$(".number").css('border-radius',celll*0.06);
			
			var numberCell=$('#number-'+i+'-'+j);
			
			if(board[i][j]>=128 && board[i][j]<1024){
				numberCell.css('font-size',celll*0.5+'px');
			}else if(board[i][j]>=1024){
				numberCell.css('font-size',celll*0.4+'px');
			}else{
				numberCell.css('font-size',celll*0.6+'px');
			}
			
			if(board[i][j]==0){
				numberCell.css('height','0px');
				numberCell.css('width','0px');
				numberCell.css('top',setTop(i,j)+celll/2);
				numberCell.css('left',setLeft(i,j)+celll/2);
			}else{
				numberCell.css('height',celll);
				numberCell.css('width',celll);
				numberCell.css('top',setTop(i,j));
				numberCell.css('left',setLeft(i,j));
				numberCell.text(board[i][j]);
				numberCell.css('color',setColor(board[i][j]));
				numberCell.css('background',setbgColor(board[i][j]));
			}
			conflict[i][j]=false;
		}
	}
};


function randomNum(n){
	if(nospace()){
		return false;
	}
	
	//随机数字
	if(n){
		num=n;
	}else{
		var num=Math.random()<=0.5?2:4;
	}
	
	var arr=new Array();
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(board[i][j]==0){
				arr.push(i+''+j);
			}
		}
	}
	
	//随机位置
	var add=parseInt(Math.random()*arr.length);
	var x=arr[add].substring(0,1);
	var y=arr[add].substring(1);
	
	//显示数字
	board[x][y]=num;
	showNum(x,y,num);
	
	return true;
};

document.addEventListener('touchstart',function(event){
	startx=event.touches[0].pageX;
	starty=event.touches[0].pageY;
})

document.addEventListener('touchmove',function(event){
	event.preventDefault();
})

document.addEventListener('touchend',function(event){
	endx=event.changedTouches[0].pageX;
	endy=event.changedTouches[0].pageY;
	
	var delx=endx-startx;
	var dely=endy-starty;
	
	if(Math.abs(delx)<0.03*swidth && Math.abs(dely)<0.03*swidth){
		return false;
	}
	
	if(Math.abs(delx)>=Math.abs(dely)){
		if(delx>0){
			//向右
			moveRight();
		}else{
			//向左
			moveLeft();
		}
	}else{
		if(dely>0){
			//向下
			moveDown();
		}else{
			//向上
			moveUp();
		}
	}
	
})

$(document).keydown(function(event){
	switch(event.keyCode){
		case 37:	//left
			event.preventDefault();
			moveLeft();
			break;
		case 38:    //up
			event.preventDefault();
			moveUp();
			break;
		case 39:    //right
			event.preventDefault();
			moveRight();
			break;
		case 40:    //down
			event.preventDefault();
			moveDown();
			break;
		default:
			break;
			
	}
});

function isgameOver(){
	if(nospace() && noMove()){
		gameOver();
	}
}

function gameOver(){
	$(".gameover").show();
};

function moveLeft(){
	if(canMoveLeft()){
		for(var i=0;i<4;i++){
			for(var j=1;j<4;j++){
				if(board[i][j]!=0){
					for(var k=0;k<j;k++){
						if(board[i][k]==0 && noHBlock(i,j,k)){
							moveAnimation(i,j,i,k);
							board[i][k]=board[i][j];
							board[i][j]=0;
						}else if( board[i][k]==board[i][j] && noHBlock(i,j,k) && !conflict[i][k]){
							moveAnimation(i,j,i,k);
							board[i][k]+=board[i][j];
							board[i][j]=0;
							score+=board[i][k];
							updateScore();
							conflict[i][k]=true;
						}
					}
				}
			}
		}
		setTimeout("updateBoard()",200);
		setTimeout("randomNum(2)",210);
		setTimeout("isgameOver()",300);
	}
};

function moveUp(){
	if(canMoveUp()){
		for(var i=1;i<4;i++){
			for(var j=0;j<4;j++){
				if(board[i][j]!=0){
					for(var k=0;k<i;k++){
						if(board[k][j]==0 && noVBlock(j,i,k)){
							moveAnimation(i,j,k,j);
							board[k][j]=board[i][j];
							board[i][j]=0;
						}else if( board[k][j]==board[i][j] && noVBlock(j,i,k) && !conflict[k][j]){
							moveAnimation(i,j,k,j);
							board[k][j]+=board[i][j];
							board[i][j]=0;
							score+=board[k][j];
							updateScore();
							conflict[k][j]=true;
						}
					}
				}
			}
		}
		setTimeout("updateBoard()",200);
		setTimeout("randomNum(2)",210);
		setTimeout("isgameOver()",300);
	}
};

function moveRight(){
	if(canMoveRight()){
		for(var i=0;i<4;i++){
			for(var j=2;j>=0;j--){
				if(board[i][j]!=0){
					for(var k=3;k>j;k--){
						if(board[i][k]==0 && noHBlock(i,k,j)){
							moveAnimation(i,j,i,k);
							board[i][k]=board[i][j];
							board[i][j]=0;
						}else if( board[i][k]==board[i][j] && noHBlock(i,k,j) && !conflict[i][k]){
							moveAnimation(i,j,i,k);
							board[i][k]+=board[i][j];
							board[i][j]=0;
							score+=board[i][k];
							updateScore();
							conflict[i][k]=true;
						}
					}
				}
			}
		}
		setTimeout("updateBoard()",200);
		setTimeout("randomNum(2)",210);
		setTimeout("isgameOver()",300);
	}
};

function moveDown(){
	if(canMoveDown()){
		for(var i=2;i>=0;i--){
			for(var j=0;j<4;j++){
				if(board[i][j]!=0){
					for(var k=3;k>i;k--){
						if(board[k][j]==0 && noVBlock(j,k,i)){
							moveAnimation(i,j,k,j);
							board[k][j]=board[i][j];
							board[i][j]=0;
						}else if( board[k][j]==board[i][j] && noVBlock(j,k,i) && !conflict[k][j]){
							moveAnimation(i,j,k,j);
							board[k][j]+=board[i][j];
							board[i][j]=0;
							score+=board[k][j];
							updateScore();
							conflict[k][j]=true;
						}
					}
				}
			}
		}
		setTimeout("updateBoard()",200);
		setTimeout("randomNum(2)",210);
		setTimeout("isgameOver()",300);
	}
};
