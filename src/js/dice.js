var Dice = {};

Dice.roll = function(num_dice, edge) {
	var rolls = new Array();
	var hits  = 0;
	var ones  = 0;
	var adds  = 0;
	
	for (var i = 0; i < (num_dice + adds); i++) {
		rolls[i] = 1 + Math.floor(Math.random() * 6);
		if (rolls[i] > 4) {
			hits += 1;
		} else if (rolls[i] == 1) {
			ones += 1;
		}

		if (edge && rolls[i] == 6) {
			adds += 1;
		}
	};

	$('#dice-poptext')[0].innerHTML = "You got a " + rolls + " from " + num_dice + " dice!" + 
								      "<br/>This is " + hits + " hits and "+ ones + " ones. "+
								      "<br/>Edge was "+ edge + "and you got "+ adds+" additional hits." ;
};
