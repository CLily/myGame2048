function showNum(i,j,num){
	var numberCell=$('#number-'+i+'-'+j);
	
	numberCell.text(num);
	numberCell.css('color',setColor(num));
	numberCell.css('background',setbgColor(num));
	
	numberCell.animate({
		'height':celll,
		'width':celll,
		'top':setTop(i,j),
		'left':setLeft(i,j)
	},50)
}

function moveAnimation(fx,fy,tx,ty){
	var numberCell=$('#number-'+fx+'-'+fy);
	numberCell.animate({
		'top':setTop(tx,ty),
		'left':setLeft(tx,ty)
	},200)
}

function updateScore(){
	$(".score").text(score);
}
