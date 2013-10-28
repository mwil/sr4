/* Copyright 2013 Matthias Wilhelm

# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.

# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.

# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

var Dice = {
	Offsets: [],
};

Dice.roll = function(num_dice, edge) {
	var count = new Array(0, 0, 0, 0, 0, 0, 0);
	var adds  = 0;
	
	for (var i = 0; i < (num_dice + adds); i++) {
		roll = 1 + Math.floor(Math.random() * 6);
		count[roll] += 1;

		// Rule of Six with Edge
		if (edge && roll == 6) {
			adds += 1;
		}
	};

	this.prev_count = count;
	this.printToPopup(count);
};

Dice.reroll = function() {
	count = this.prev_count;
	num_reroll = 0;

	for (var i = 0; i < 5; i++) {
		num_reroll += count[i];
		count[i] = 0;
	};

	for (var i = 0; i < num_reroll; i++) {
		roll = 1 + Math.floor(Math.random() * 6);
		count[roll] += 1;
	};

	this.printToPopup(count);
};

Dice.addEdge = function(num_edge) {
	var count = this.prev_count;
	var adds = 0;

	for (var i = 0; i < (num_edge + adds); i++) {
		roll = 1 + Math.floor(Math.random() * 6);
		count[roll] += 1;

		// Rule of Six only on the Edge dice
		if (roll == 6) {
			adds += 1;
		}
	};

	this.printToPopup(count);
};

Dice.printToPopup = function (count) {
	var num_dice = count.reduce(function(a, b) { return a + b })
	var hits     = count[5] + count[6];
	console.log(count)

	if (hits > 0) {
		if (count[1] >= (num_dice)/2) {
			// normal glitch, too many ones ...
			var title = "<h3 class='diceresglitch'>"+hits+(hits>1?" Hits":" Hit")+ " (and glitch!)</h3>";	
		} else {
			var title = "<h3 class='diceres'>"+hits+(hits>1?" Hits":" Hit")+"!</h3>";
		}
	} else {
		 if (count[1] >= (num_dice)/2) {
			var title = "<h3 class='diceresglitch'>Critical glitch!!</h3>";	
		} else {
			var title = "<h3 class='diceres'>No Hits!</h3>";
		}
	}

	$('#dice-poptext').html(title+"\
			<table class='center'>\
				<tr>\
					<td><div class='die'>&#9856;</div></td>\
					<td>x</td><td>"+count[1]+"</td>\
					<td><div class='die'>&#9857;</div></td>\
					<td>x</td><td>"+count[2]+"</td>\
					<td><div class='die'>&#9858;</div></td>\
					<td>x</td><td>"+count[3]+"</td>\
				</tr>\
				<tr>\
					<td><div class='die'>&#9859;</div></td>\
					<td>x</td><td>"+count[4]+"</td>\
					<td><div class='die'>&#9860;</div></td>\
					<td>x</td><td>"+count[5]+"</td>\
					<td><div class='die'>&#9861;</div></td>\
					<td>x</td><td>"+count[6]+"</td>\
				</tr>\
			</table>");
};


Dice.rebaseDiceButtons = function(offset, remove) {
	if (remove) {
		offset = -offset;
	}

	$('.dicebutton').each(
		function(index) {
			var baseval = parseInt($(this).attr("baseval"));
			var currval = parseInt($(this).attr("currval"));
			
			$(this).attr("baseval", baseval + offset);
			$(this).attr("currval", currval + offset);
		}
	)

	this.updateDiceButtons();
};

Dice.changeOffset = function(stat, remove) {
	if (!remove) {
		if (Dice.Offsets.indexOf(stat) == -1) {
			Dice.Offsets.push(stat);	
		}
	} else if (Dice.Offsets.indexOf(stat) > -1) {
		// super-obvious solution to delete an array element ... 
		// http://stackoverflow.com/questions/3596089/how-to-add-and-remove-array-value-in-jquery
		Dice.Offsets.splice($.inArray(stat, Dice.Offsets), 1);
	}

	this.updateDiceButtons();
};

Dice.updateDiceButtons = function() {
	$('.dicebutton').each(
		function(index) {
			var baseval = parseInt($(this).attr("baseval"));
			var offset = 0;

			for (var i = 0; i < Dice.Offsets.length; i++) {
				offset += SR4.currChar.stats[Dice.Offsets[i]];
			};
			
			$(this).attr("currval", baseval + offset);
			$(this).attr("valoffset", offset);

			$(this).find(".ui-btn-text")[0].innerHTML = baseval + 
				(offset != 0 ? "<sub style='color:grey;'>(+"+offset+")</sub>" : "");
		}
	)
};
