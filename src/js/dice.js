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

$(document).on('pagebeforeshow', '#dice', function () {
	if (window.startup) {
		SR4.init();
		window.startup = false;
	}

	SR4.refreshDicePage();
});

var Dice = {
	Offsets: {}
};

Dice.roll = function(num_dice, edge) {
	var count = new Array(0, 0, 0, 0, 0, 0, 0);
	var adds  = 0;
	
	for (var i = 0; i < (num_dice + adds); i++) {
		var roll = 1 + Math.floor(Math.random() * 6);
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
	var count = this.prev_count;
	var num_reroll = 0;

	for (var i = 0; i < 5; i++) {
		num_reroll += count[i];
		count[i] = 0;
	};

	for (var i = 0; i < num_reroll; i++) {
		var roll = 1 + Math.floor(Math.random() * 6);
		count[roll] += 1;
	};

	this.printToPopup(count);
};

Dice.addEdge = function(num_edge) {
	var count = this.prev_count;
	var adds = 0;

	for (var i = 0; i < (num_edge + adds); i++) {
		var roll = 1 + Math.floor(Math.random() * 6);
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
	console.log(count);

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

	this.refreshDiceButtons();
};

Dice.changeOffset = function(obj, prop, remove) {
	if (!remove) {
		this.Offsets[prop] = obj;
	} else if (prop in this.Offsets) {
		delete this.Offsets[prop];
	}

	this.refreshDiceButtons();
};

Dice.refreshDiceButtons = function() {
	$('.dicebutton').each(
		function(index) {
			var baseval = parseInt($(this).attr("baseval"));
			var offset = 0;

			// ugly hack, why is there no sane way to access nested objects ??
			for (var prop in Dice.Offsets) {
				var proplist = prop.split('.');
				var currobj  = Dice.Offsets[prop];
				
				for (var i = 0; i < proplist.length; i++) {
					currobj = currobj[proplist[i]];
				};
				
				offset += currobj;
			};
			
			$(this).attr("currval", baseval + offset);
			$(this).attr("valoffset", offset);

			// disable buttons that have no dice available anyway
			if (baseval+offset <= 0) {
				$(this).addClass('ui-disabled');
			} else {
				$(this).removeClass('ui-disabled');
			}

			$(this).find(".ui-btn-text").html(baseval + 
				(offset != 0 ? "<sub style='color:grey;'>("+(offset>0?"+":"")+offset+")</sub>" : ""));
		}
	)
};
