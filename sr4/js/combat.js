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

Character.prototype.hitStun = function(hits) {
	var maxStun = (8+Math.ceil(this.stats.Attrib_WIL/2));
	var cond    = this.condition;

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

	this.updated();
};

Character.prototype.hitPhy = function(hits) {
	var maxPhy = (8+Math.ceil(this.stats.Attrib_BOD/2));
	var cond   = this.condition;

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

	this.updated();
};

Character.prototype.hitMisc = function(hits) {
	this.condition.currMisc += hits;
	this.updated();
};

Character.prototype.resetStun = function() {
	if (this.condition.currStun === 0) {
		return;
	}

	this.condition.currStun = 0;
	this.updated();
};

Character.prototype.resetPhy = function() {
	if (this.condition.currPhy === 0) {
		return;
	}

	this.condition.currPhy = 0;
	this.updated();
};

Character.prototype.resetMisc = function() {
	if (this.condition.currMisc === 0) {
		return;
	}

	this.condition.currMisc = 0;
	this.updated();
};

Character.prototype.updatedMonitor = function() {
	var stunMod = -Math.floor(this.condition.currStun/3);
	var phyMod  = -Math.floor(this.condition.currPhy/3);

	// update the dice pool modifiers of the current character
	this.mods.stunMod = stunMod;
	this.mods.phyMod  = phyMod;
	this.mods.miscMod = this.condition.currMisc;
};

Monitor.refresh = function() {
	if (!SR4.currChar) {
		return;
	}

	var cc    = SR4.currChar;
	var cond  = cc.condition;

	var maxStun = (8+Math.ceil(cc.stats.Attrib_WIL/2));
	var maxPhy  = (8+Math.ceil(cc.stats.Attrib_BOD/2));

	var stun_msg = "Stun Track <span class='info'>("+cc.mods.stunMod+")</span>";
	var phy_msg  = "Physical Track <span class='info'>("+cc.mods.phyMod+")</span>";

	if (cond.currStun >= maxStun) {
		stun_msg = this.knock_msg;
	}

	if (cond.currPhy > maxPhy) {

		if (cond.currPhy <= (maxPhy + cc.stats.Attrib_BOD)) {
			phy_msg = this.coma_msg;
		} else {
			phy_msg = this.dead_msg;
		}
	} else if (cond.currPhy === maxPhy) {
		phy_msg = this.knock_msg;
	}

	$('#stun-monitor .ui-btn-text').html(stun_msg+" &mdash; <span>("+cond.currStun+"/"+maxStun+")</span>");
	$('#phy-monitor  .ui-btn-text').html(phy_msg+ " &mdash; <span>("+cond.currPhy+"/"+maxPhy+ ")</span>");
	$('#misc-monitor .ui-btn-text').html('Other Modifiers <span class="info">('+cond.currMisc+')</span>');

	// Refresh Ini test, this needs a better separation (TODO)
	$("#roll-initiative").data("offset", SR4.currChar.stats.Attrib_REA + SR4.currChar.stats.Attrib_INT);
	// Test.refresh();
};


// jQuery event registration

$(document).on('pageinit', '#combat',  function() {
	$("#combat").on("updatedChar", function() {
		SR4.refreshMonitorPage();
	});

	$("#combat").on("switchedChar", function() {
		SR4.refreshMonitorPage();
	});

	$(".monitor-btn").click( function() {
		if (!SR4.currChar) {
			return;
		}

		var target = $(this).data("target");
		var value  = parseInt($(this).data("value"), 10);

		if (value !== 0) {
			SR4.currChar["hit"+target](value);
		} else {
			SR4.currChar["reset"+target]();
		}
	});
});

$(document).on('pagebeforeshow', '#combat', function () {	
	if (SR4.currChar) {
		SR4.refreshMonitorPage();
	} else {
		$.mobile.changePage('#title', {transition: "none"});
	}
});
