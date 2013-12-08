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


Test.recentlyUsed = function(cls) {
	var $r_li = $("#recent-skill-lv ."+cls);
	var $s_li = $("#search-skill-lv ."+cls);

	if ($r_li.length > 0) {
		// this test is already present in the list, just do nothing ...
		return;
	}

	if ($("#recent-skill-lv li").length >= RECENT_LEN) {
		// TODO: do something smarter like counting recent uses
		$("#recent-skill-lv li:last").remove();
	}

	//var $li = $("#search-skill-lv ."+cls).clone();
	var $a  = $s_li.find("a.test-btn").clone();
	var $li = $( '<li data-icon="false">'+$("<div/>" ).append($a).html()+"</li>");

	$li.addClass( $s_li.attr("class").match(/skill-\w+/i)[0] );
	$li.addClass( cls );

	$("#recent-skill-lv").prepend($li).listview("refresh");
};

Test.refresh = function() {
	if (!SR4.currChar) {
		return;
	}

	$("span.test-label").each(function() {
		var $a     = $(this).closest("a");
		var stat_a = SR4.currChar.stats[$a.data("stat_a")];
		var stat_b = SR4.currChar.stats[$a.data("stat_b")];

		var num_dice = stat_a + stat_b + SR4.currChar.getMods() + Test.mods;
		var offset   = parseInt($a.data("offset"), 10);

		if (stat_a === 0 || stat_b === 0) {
			//defaulting, one dice penalty!
			num_dice -= 1;
		}

		num_dice = Math.max(0, num_dice);

		$(this).html("("+num_dice+"d"+(offset!==0?"+"+offset:"")+")");	
		$a.toggleClass("ui-disabled", (num_dice === 0));
	});

	$('#test-mod-label .ui-btn-text').html('Test Modifiers <span class="info">('+(Test.mods+SR4.currChar.getMods())+')</span> &mdash; '+Test.mods);

	SR4.hideMAGorRES();
	$("#search-skill-lv").listview("refresh");
	$("#recent-skill-lv").listview("refresh");

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

	$(".tests-mod-btn").click( function() {
		var value = parseInt($(this).data("value"), 10);

		if (value !== 0) {
			Test.incMod(value);
		} else {
			Test.resetMod();
		}
	});

	$("#search-skill-lv").on("click", ".test-btn", function() {
		var skill = $(this).data("skill");

		$('.count-'+skill).html(Test.asString($(this).data("stat_a"), $(this).data("stat_b"), $(this).data("offset"))); 
		Test.recentlyUsed('roll-'+skill);
	});

	$("#recent-skill-lv").on("click", ".test-btn", function() {
		var skill = $(this).data("skill");

		$('.count-'+skill).html(Test.asString($(this).data("stat_a"), $(this).data("stat_b"), $(this).data("offset"))); 
	});
});


$(document).on('pagebeforeshow', '#tests', function () {	
	if (SR4.currChar) {
		SR4.refreshTestsPage();	
	} else {
		$.mobile.changePage('#title', {transition: "none"});
	}
});
