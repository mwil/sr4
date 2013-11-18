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
	Offsets: {},
	use_cmods: true,
	prev_count: []
};

Dice.rollToPopup = function(num_dice, edge) {
	var count = this.roll(num_dice, edge);

	this.prev_count = count;
	this.updateDicePopup(count);
};

Dice.rerollToPopup = function() {
	var count = this.prev_count;
	var num_reroll = 0;

	// reroll dice that did not score a hit
	for (var i = 0; i < 5; i++) {
		num_reroll += count[i];
		count[i] = 0;
	};

	for (var i = 0; i < num_reroll; i++) {
		var roll = 1 + Math.floor(Math.random() * 6);
		count[roll] += 1;
	};

	this.updateDicePopup(count);
};

Dice.addEdge = function(num_edge) {
	var count = this.prev_count;
	var adds = 0;

	var edge_count = this.roll(num_edge, true);

	for (var i = 0; i < count.length; i++) {
		count[i] += edge_count[i];
	};

	this.updateDicePopup(count);
};

Dice.roll = function(num_dice, rule_of_six) {
	var count = new Array(0, 0, 0, 0, 0, 0, 0);
	var adds  = 0;
	
	for (var i = 0; i < (num_dice + adds); i++) {
		var roll = 1 + Math.floor(Math.random() * 6);
		count[roll] += 1;

		// Rule of Six with Edge
		if (rule_of_six && roll == 6) {
			adds += 1;
		}
	};

	return count;
};

Dice.interpretResult = function(count) {
	var res = {'hits':0, 'zeros':0, 'glitch':false, 'critical':false};

	res['num_dice'] = count.reduce(function(a, b) { return a + b })
	res['hits']     = count[5] + count[6];
	res['zeros']    = count[1];
	res['glitch']   = res.zeros >= (res.num_dice)/2;
	res['critical'] = res.glitch && (res.hits == 0);

	return res;
};


Dice.updateDicePopup = function (count) {
	var res = this.interpretResult(count);
	var title = '';

	if (res.hits > 0) {
		if (res.glitch) {
			// normal glitch, too many ones ...
			title = "<h3 class='diceres warn'>"+res.hits+(res.hits>1?" Hits":" Hit")+ " (and glitch!)</h3>";	
		} else {
			title = "<h3 class='diceres'>"+res.hits+(res.hits>1?" Hits":" Hit")+"!</h3>";
		}
	} else {
		 if (res.glitch) {
			title = "<h3 class='diceres warn'>Critical glitch!!</h3>";	
		} else {
			title = "<h3 class='diceres'>No Hits!</h3>";
		}
	};

	$('.dice-poptext').html(title+"\
			<table class='center'>\
				<tr>\
					<td><div class='die warn'>&#9856;</div></td>\
					<td class='warn'>x</td><td class='warn'>"+count[1]+"</td>\
					<td><div class='die fade'>&#9857;</div></td>\
					<td class='fade'>x</td><td class='fade'>"+count[2]+"</td>\
					<td><div class='die fade'>&#9858;</div></td>\
					<td class='fade'>x</td><td class='fade'>"+count[3]+"</td>\
				</tr>\
				<tr>\
					<td><div class='die fade'>&#9859;</div></td>\
					<td class='fade'>x</td><td class='fade'>"+count[4]+"</td>\
					<td><div class='die hit'>&#9860;</div></td>\
					<td class='hit'>x</td><td class='hit'>"+count[5]+"</td>\
					<td><div class='die hit'>&#9861;</div></td>\
					<td class='hit'>x</td><td class='hit'>"+count[6]+"</td>\
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

Dice.useCharMods = function(use) {
	this.use_cmods = use;

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

			if (Dice.use_cmods) {
				offset += SR4.currChar.getMods();
			}
			
			$(this).attr("currval", baseval + offset);
			$(this).attr("valoffset", offset);

			// disable buttons that have no dice available anyway
			if (baseval+offset <= 0) {
				$(this).addClass('ui-disabled');
			} else {
				$(this).removeClass('ui-disabled');
			}

			$(this).find(".ui-btn-text").html(baseval + 
				(offset != 0 ? "<sub class='info'>("+(offset>0?"+":"")+offset+")</sub>" : ""));
		}
	);
};


// jQuery event registration

$(document).on('pagebeforeshow', '#dice', function () {
	if (SR4.currChar) {
		SR4.refreshDicePage();
	} else {
		$.mobile.changePage('#title', {transition: "none"});
	};
});
