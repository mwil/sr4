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

	if (hits >= 0) {
		if ((SR4.currChar.currStun + hits) > maxStun) {
			var overflow = (SR4.currChar.condition.currStun + hits) - maxStun;
			
			this.hitPhy(overflow);
			SR4.currChar.condition.currStun = maxStun;
		} else {
			SR4.currChar.condition.currStun += hits;
		}
	} else {
		if (SR4.currChar.condition.currStun == 0) {
			return;
		} else {
			SR4.currChar.condition.currStun -= 1;
		}
	}

	this.refresh();
};

Monitor.hitPhy = function(hits) {
	var maxPhy = (8+Math.ceil(SR4.currChar.stats['Attrib_BOD']/2));

	if (hits >= 0) {
		if ((SR4.currChar.condition.currPhy + hits) > maxPhy) {
			var overflow = (SR4.currChar.condition.currPhy + hits) - maxPhy;
			SR4.currChar.condition.currPhy += hits;
		} else {
			SR4.currChar.condition.currPhy += hits;
		}
	} else {
		if (SR4.currChar.condition.currPhy == 0) {
			return;
		} else {
			SR4.currChar.condition.currPhy -= 1;
		}
	}

	this.refresh();
};

Monitor.refresh = function() {
	var maxStun = (8+Math.ceil(SR4.currChar.stats['Attrib_WIL']/2));
	var maxPhy  = (8+Math.ceil(SR4.currChar.stats['Attrib_BOD']/2));
	var stunMod = -Math.floor(SR4.currChar.condition.currStun/3);
	var phyMod  = -Math.floor(SR4.currChar.condition.currPhy/3);

	// TODO: detect stunned, coma, dead here
	
	SR4.currChar.condition.mods = stunMod + phyMod;

	$('#stun-monitor .ui-btn-text').text("("+SR4.currChar.condition.currStun+" / "+maxStun+") Mod: "+stunMod);

	$('#phy-monitor .ui-btn-text').text("("+SR4.currChar.condition.currPhy+" / "+maxPhy+") Mod "+phyMod);

	SR4.currChar.updated();
};


// jQuery event registration

$(document).on('pagebeforeshow', '#monitor', function () {	
	if (window.startup) {
		SR4.init();
		window.startup = false;
	}

	$('#monitor').bind('swipeleft', function(event, ui) {
    	$.mobile.changePage("#dice", "slide");
	});
	$('#dice').bind('swiperight', function(event, ui) {
    	$.mobile.changePage("#title", "slide");
	});

	SR4.refreshMonitorPage();
});

$(document).on('pagehide', '#monitor', function () { 
	$(this).off('swipeleft swiperight'); 
});
