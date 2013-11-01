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

var Monitor = {}

Monitor.hitStun = function(hits) {
	var maxStun = (8+Math.ceil(SR4.currChar.stats['Attrib_WIL']/2));
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
	var maxPhy = (8+Math.ceil(SR4.currChar.stats['Attrib_BOD']/2));
	var cond   = SR4.currChar.condition;

	if (hits >= 0) {
		if ((cond.currPhy + hits) > maxPhy) {
			var overflow = (cond.currPhy + hits) - maxPhy;
			cond.currPhy += hits;
		} else {
			cond.currPhy += hits;
		}
	} else {
		if (cond.currPhy == 0) {
			return;
		} else {
			cond.currPhy -= 1;
		}
	}

	this.refresh();
};

Monitor.refresh = function() {
	var maxStun = (8+Math.ceil(SR4.currChar.stats['Attrib_WIL']/2));
	var maxPhy  = (8+Math.ceil(SR4.currChar.stats['Attrib_BOD']/2));
	var stunMod = -Math.floor(SR4.currChar.condition.currStun/3);
	var phyMod  = -Math.floor(SR4.currChar.condition.currPhy/3);
	var cond    = SR4.currChar.condition;

	// TODO: detect stunned, coma, dead here
	
	cond.mods = stunMod + phyMod;

	$('#stun-monitor .ui-btn-text').text("("+cond.currStun+" / "+maxStun+") Mod: "+stunMod);

	$('#phy-monitor .ui-btn-text').text("("+cond.currPhy+" / "+maxPhy+") Mod "+phyMod);

	SR4.currChar.updated();
};


// jQuery event registration

$(document).on('pagebeforeshow', '#monitor', function () {	
	SR4.refreshMonitorPage();
});
