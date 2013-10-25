
// Run once the DOM is ready
/**/
$(document).ready(
    function () {
    	UI.init();
    }
);

var Dice = {};

Dice.roll = function(num_dice) {
	var rolls = new Array(num_dice);
	var hits  = 0;
	var ones  = 0;
	
	for (var i = 0; i < num_dice; i++) {
		rolls[i] = 1 + Math.floor(Math.random() * 6);
		if (rolls[i] > 4) {
			hits += 1;
		} else if (rolls[i] == 1) {
			ones += 1;
		}
	};

	$('#poptext')[0].innerHTML = "You got a " + rolls + " from " + num_dice + " dice!" + 
								 "</br>This is " + hits + " hits and " + ones + " ones.";
};
