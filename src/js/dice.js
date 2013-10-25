var Dice = {};

Dice.roll = function(num_dice, edge, sort) {
	var rolls = new Array();
	var count = new Array(null, 0, 0, 0, 0, 0, 0);
	var hits  = 0;
	var ones  = 0;
	var adds  = 0;
	
	for (var i = 0; i < (num_dice + adds); i++) {
		rolls[i] = 1 + Math.floor(Math.random() * 6);
		count[rolls[i]] += 1;

		if (rolls[i] > 4) {
			hits += 1;
		} else if (rolls[i] == 1) {
			ones += 1;
		}

		if (edge && rolls[i] == 6) {
			adds += 1;
		}
	};

	if (sort) {
		rolls.sort(function(a,b){return a - b});
	}

	$('#dice-poptext')[0].innerHTML = "You got a "+rolls+" from "+num_dice+" dice!"+ 
									  "<br/>This is "+count[1]+"x1 + "+count[2]+"x2 + "+count[3]+"x3 + "+count[4]+"x4 + "+count[5]+"x5 + "+count[6]+"x6 + "+
								      "<br/>This is "+hits+" hits and "+ones+" ones. "+
								      "<br/>Edge was "+edge+" and you got "+adds+" additional hits." ;
};
