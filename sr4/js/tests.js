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

Test = {
	mods: 0
}

Test.asString = function(stat_a, stat_b, offset) {
	var cc = SR4.currChar;
	var num_dice = cc.stats[stat_a] + cc.stats[stat_b] + cc.getMods() + Test.mods;

	if (cc.stats[stat_a] === 0 || cc.stats[stat_b] === 0) {
		//defaulting, one dice penalty!
		num_dice -= 1;
	};

	if (num_dice <= 0) {
		return "No dice!"
	};

	var roll = Dice.roll(num_dice);
	var res = Dice.interpretResult(roll);

	Dice.updateDicePopup(roll);

	if (res.critical) {
		return "<div class='warn'>Critical glitch!</div>"
	} else {
		return (res.hits + offset) + (res.glitch?" (+glitch!)":"");
	};
};

Test.incMod = function(value) {
	this.mods += value;

	this.refresh();
};

Test.resetMod = function() {
	this.mods = 0;

	this.refresh();
};

Test.refresh = function() {
	$("span.test-label").each(function() {
		var a     = $(this).closest("a");
		var stats = SR4.currChar.stats;

		var num_dice = stats[a.attr("stat_a")] + stats[a.attr("stat_b")] + SR4.currChar.getMods() + Test.mods;
		var offset   = parseInt(a.attr("offset"));

		if (stats[a.attr("stat_a")] === 0 || stats[a.attr("stat_b")] === 0) {
			//defaulting, one dice penalty!
			num_dice -= 1;
		};

		num_dice = Math.max(0, num_dice);

		$(this).text("("+num_dice+"d"+(offset!=0?"+"+offset:"")+")");
	});

	$('#test-mod-label .ui-btn-text').html('Additional Modifiers <span class="info">('+Test.mods+')</span>');
};

Test.resetAll = function() {
	$("span.test-res").text("--");
};

$(document).on('pagebeforeshow', '#tests', function () {	
	if (SR4.currChar) {
		SR4.refreshTestsPage();	
	} else {
		$.mobile.changePage('#title', {transition: "none"});
	};
});
