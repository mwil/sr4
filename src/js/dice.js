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

	if (hits > 0) {
		if (ones >= (num_dice+adds)/2) {
			// normal glitch, too many ones ...
			var title = "<h3 style='color:red';>"+hits+(hits>1?" Hits":" Hit")+ " (and glitch!)</h3>";	
		} else {
			var title = "<h3>"+hits+(hits>1?" Hits":" Hit")+"!</h3>";
		}
	} else {
		 if (ones >= (num_dice+adds)/2) {
			var title = "<h3 style='color:red;'>Critical glitch!!</h3>";	
		} else {
			var title = "<h3>No Hits!</h3>";
		}
	}

	$('#dice-poptext')[0].innerHTML = title+"\
			<table>\
				<tr>\
					<td><div class='die'>&#9856;</div></td>\
					<td>&#x2a09;</td><td>"+count[1]+"</td>\
					<td><div class='die'>&#9857;</div></td>\
					<td>&#x2a09;</td><td>"+count[2]+"</td>\
					<td><div class='die'>&#9858;</div></td>\
					<td>&#x2a09;</td><td>"+count[3]+"</td>\
				</tr>\
				<tr>\
					<td><div class='die'>&#9859;</div></td>\
					<td>&#x2a09;</td><td>"+count[4]+"</td>\
					<td><div class='die'>&#9860;</div></td>\
					<td>&#x2a09;</td><td>"+count[5]+"</td>\
					<td><div class='die'>&#9861;</div></td>\
					<td>&#x2a09;</td><td>"+count[6]+"</td>\
				</tr>\
			</table>";
};

Dice.relabel = function(offset) {
	console.log($('.dicebutton').attr());
	$('.dicebutton').each(
		function(index) {
			//alert($(this)[0].attr());
			//$(this).children()[0].innerHTML = '<span class="ui-btn-text">'+($(this).baseval)+'</span>';
		}
	)
};
