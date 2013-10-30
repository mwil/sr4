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

var DEFAULTVAL = 1;
var DEFAULTNAME = "Character Name";

var Character = function(charName) {
	this.charName  = DEFAULTNAME;
	this.stats     = {};
	this.condition = {currStun:0, currPhy:0, mods:0};

	// TODO: possible problems if name exists already, prevent this before creation! 
	this.rename(charName);

	// set default values for known stats ...
	for (var i = 0; i < SR4.StatList.length; i++) {
		this.stats[SR4.StatList[i]] = DEFAULTVAL;
	};

	this.updated();
};

Character.prototype.updated = function() {
	localStorage.setObject(window.APPSTRING+"Character."+this.charName, this);
};

Character.prototype.rename = function(charName) {
	this.charName = charName;
	this.updated();
};

/*
 * Update a single character statistic and update the page
 */
Character.prototype.updateStat = function(stat, value) {
	this.stats[stat] = parseInt(value);
	this.updated();
};


// jQuery event registration

$(document).on('pageshow', '#stats', function () {
	SR4.refreshStatsPage();
});
