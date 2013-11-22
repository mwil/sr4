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

	if (hits >= 0) {
		if ((cond.currStun + hits) > maxStun) {
			var overflow = (cond.currStun + hits) - maxStun;
			
			this.hitPhy(overflow);
			cond.currStun = maxStun;
		} else {
			cond.currStun += hits;
		}
	} else {
		if (cond.currStun > 0) {
			cond.currStun -= 1;
		}
	}

	this.refresh();
};

Monitor.hitPhy = function(hits) {
	var maxPhy = (8+Math.ceil(SR4.currChar.stats.Attrib_BOD/2));
	var cond   = SR4.currChar.condition;

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

	this.refresh();
};

Monitor.incMisc = function(value) {
	SR4.currChar.condition.currMisc += value;
	this.refresh();
};

Monitor.resetStun = function() {
	SR4.currChar.condition.currStun = 0;

	// changing the char directly seems to make it null for a short while and trigger a page transition ...
	setTimeout(function(){Monitor.refresh();}, 50);
};

Monitor.resetPhy = function() {
	SR4.currChar.condition.currPhy = 0;

	setTimeout(function(){Monitor.refresh();}, 50);
};

Monitor.resetMisc = function() {
	SR4.currChar.condition.currMisc = 0;
	
	this.refresh();
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
	$("roll-initiative").data("offset", SR4.currChar.stats.Attrib_REA + SR4.currChar.stats.Attrib_INT);
	Test.refresh();
};


// jQuery event registration

$(document).on('pageinit', '#monitor',  function() {
	$("#monitor").on("updatedChar", function() {
		SR4.refreshMonitorPage();
	});

	$("#monitor").on("switchedChar", function() {
		SR4.refreshMonitorPage();
	});
});

$(document).on('pagebeforeshow', '#monitor', function () {	
	if (SR4.currChar) {
		SR4.refreshMonitorPage();
	} else {
		$.mobile.changePage('#title', {transition: "none"});
	}
});
