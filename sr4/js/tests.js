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

var RECENT_LEN = 5;

Test = {
	mods: 0
};

Test.asString = function(stat_a, stat_b, offset) {
	var cc = SR4.currChar;
	var num_dice = cc.stats[stat_a] + cc.stats[stat_b] + cc.getMods() + Test.mods;

	if (cc.stats[stat_a] === 0 || cc.stats[stat_b] === 0) {
		//defaulting, one dice penalty!
		num_dice -= 1;
	}

	if (num_dice <= 0) {	
		return "No dice!";
	}

	var roll = Dice.roll(num_dice);
	var res = Dice.interpretResult(roll);

	Dice.updateDicePopup(roll);

	if (res.critical) {
		return "<div class='warn'>Critical glitch!</div>";
	} else {
		return (res.hits + offset) + (res.glitch?" (+glitch!)":"");
	}
};

Test.incMod = function(value) {
	this.mods += value;

	this.refresh();
};

Test.resetMod = function() {
	this.mods = 0;

	this.refresh();
};

Test.recentlyUsed = function(id) {
	if ($("#recent-skill-lv ."+id).length > 0) {
		// this test is already present in the list, just do nothing ...
		return;
	}

	if ($("#recent-skill-lv li").length >= RECENT_LEN) {
		// TODO: do something smarter like counting recent uses
		$("#recent-skill-lv li:last").remove();
	}

	var li = $("#search-skill-lv ."+id).closest("li");

	// wait for the button animation to finish instead of appending buttons during animation
	$("#search-skill-lv ."+id).promise().done(function() {
		$("#recent-skill-lv").prepend(li.clone()).listview("refresh");
	});	
};

Test.refresh = function() {
	if (!SR4.currChar) {
		return;
	}

	$("span.test-label").each(function() {
		var a     = $(this).closest("a");
		var stats = SR4.currChar.stats;

		var num_dice = stats[a.data("stat_a")] + stats[a.data("stat_b")] + SR4.currChar.getMods() + Test.mods;
		var offset   = parseInt(a.data("offset"), 10);

		if (stats[a.data("stat_a")] === 0 || stats[a.data("stat_b")] === 0) {
			//defaulting, one dice penalty!
			num_dice -= 1;
		}

		num_dice = Math.max(0, num_dice);

		$(this).html("("+num_dice+"d"+(offset!==0?"+"+offset:"")+")");

		if (num_dice === 0) {
			$(this).closest("a").addClass("ui-disabled");
		} else {
			$(this).closest("a").removeClass("ui-disabled");
		}
	});

	$('#test-mod-label .ui-btn-text').html('Test Modifiers <span class="info">('+(Test.mods+SR4.currChar.getMods())+')</span> &mdash; '+Test.mods);
};

Test.resetAll = function() {
	$("span.test-res").html("&ndash;");
	$("#recent-skill-lv").empty();
};


// jQuery event handling

$(document).on('pageinit', '#tests',  function() {
	$("#tests").on("updatedChar", function() {
		SR4.refreshTestsPage();
	});

	$("#tests").on("switchedChar", function() {
		Test.resetAll();
		SR4.refreshTestsPage();
	});
});

$(document).on('pagebeforeshow', '#tests', function () {	
	if (SR4.currChar) {
		SR4.refreshTestsPage();	
	} else {
		$.mobile.changePage('#title', {transition: "none"});
	}
});
