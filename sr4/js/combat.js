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

var Monitor = {
	knock_msg: "<span class='fade'>Knocked Out!<span>",
	coma_msg:  "<span class='warn'>Character in Coma!<span>",
	dead_msg:  "<span class='warn'>! DEAD !<span>"
};

Monitor.hitStun = function(hits) {
	var maxStun = (8+Math.ceil(SR4.currChar.stats.Attrib_WIL/2));
	var cond    = SR4.currChar.condition;

	hits = parseInt(hits, 10);

	if (hits >= 0) {
		if ((cond.currStun + hits) > maxStun) {
			var overflow = (cond.currStun + hits) - maxStun;
			
			this.hitPhy(overflow);
			cond.currStun = maxStun;
			return;
		} else {
			cond.currStun += hits;
		}
	} else {
		if (cond.currStun > 0) {
			cond.currStun -= 1;
		}
	}

	SR4.currChar.updated();
};

Monitor.hitPhy = function(hits) {
	var maxPhy = (8+Math.ceil(SR4.currChar.stats.Attrib_BOD/2));
	var cond   = SR4.currChar.condition;

	hits = parseInt(hits, 10);

	if (hits >= 0) {
		if ((cond.currPhy + hits) > maxPhy) {
			var overflow = (cond.currPhy + hits) - maxPhy;
			cond.currPhy += hits;
		} else {
			cond.currPhy += hits;
		}
	} else {
		if (cond.currPhy === 0) {
			return;
		} else {
			cond.currPhy -= 1;
		}
	}

	SR4.currChar.updated();
};

Monitor.hitMisc = function(hits) {
	hits = parseInt(hits, 10);

	SR4.currChar.condition.currMisc += hits;
	SR4.currChar.updated();
};

Monitor.resetStun = function() {
	if (SR4.currChar.condition.currStun === 0) {
		return;
	}

	SR4.currChar.condition.currStun = 0;
	SR4.currChar.updated();
};

Monitor.resetPhy = function() {
	if (SR4.currChar.condition.currPhy === 0) {
		return;
	}

	SR4.currChar.condition.currPhy = 0;
	SR4.currChar.updated();
};

Monitor.resetMisc = function() {
	if (SR4.currChar.condition.currMisc === 0) {
		return;
	}

	SR4.currChar.condition.currMisc = 0;
	SR4.currChar.updated();
};

Monitor.refresh = function() {
	if (!SR4.currChar) {
		return;
	}

	var maxStun = (8+Math.ceil(SR4.currChar.stats.Attrib_WIL/2));
	var maxPhy  = (8+Math.ceil(SR4.currChar.stats.Attrib_BOD/2));
	var stunMod = -Math.floor(SR4.currChar.condition.currStun/3);
	var phyMod  = -Math.floor(SR4.currChar.condition.currPhy/3);
	var cond    = SR4.currChar.condition;

	var stun_msg = "Stun Track <span class='info'>("+stunMod+")</span>";
	var phy_msg  = "Physical Track <span class='info'>("+phyMod+")</span>";

	if (cond.currStun >= maxStun) {
		stun_msg = this.knock_msg;
	}

	if (cond.currPhy > maxPhy) {

		if (cond.currPhy <= (maxPhy + SR4.currChar.stats.Attrib_BOD)) {
			phy_msg = this.coma_msg;
		} else {
			phy_msg = this.dead_msg;
		}
	} else if (cond.currPhy === maxPhy) {
		phy_msg = this.knock_msg;
	}

	// update the dice pool modifiers of the current character
	SR4.currChar.mods.stunMod = stunMod;
	SR4.currChar.mods.phyMod  = phyMod;
	SR4.currChar.mods.miscMod = cond.currMisc;

	$('#stun-monitor .ui-btn-text').html(stun_msg+" &mdash; <span>("+cond.currStun+"/"+maxStun+")</span>");
	$('#phy-monitor  .ui-btn-text').html(phy_msg+ " &mdash; <span>("+cond.currPhy+"/"+maxPhy+ ")</span>");
	$('#misc-monitor .ui-btn-text').html('Other Modifiers <span class="info">('+cond.currMisc+')</span>');

	// Refresh Ini test, this needs a better separation (TODO)
	$("#roll-initiative").data("offset", SR4.currChar.stats.Attrib_REA + SR4.currChar.stats.Attrib_INT);
	Test.refresh();
};


// jQuery event registration

$(document).on('pageinit', '#combat',  function() {
	$("#combat").on("updatedChar", function() {
		SR4.refreshMonitorPage();
	});

	$("#combat").on("switchedChar", function() {
		SR4.refreshMonitorPage();
	});

	$(".monitor-hit-btn").click( 
		function() {
			Monitor["hit"+$(this).data("target")]($(this).data("value"));
		}
	);

	$(".monitor-reset-btn").click( 
		function() {
			Monitor["reset"+$(this).data("target")]();
		}
	);

});

$(document).on('pagebeforeshow', '#combat', function () {	
	if (SR4.currChar) {
		SR4.refreshMonitorPage();
	} else {
		$.mobile.changePage('#title', {transition: "none"});
	}
});
