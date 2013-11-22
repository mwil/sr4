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

var DEFAULTVAL = 0;
var DEFAULTNAME = "Character Name";

var Character = function(charName) {
	var i;

	this.charName  = DEFAULTNAME;
	this.stats     = {};
	this.condition = {currStun:0, currPhy:0, currMisc:0};
	this.mods      = {};

	this.Remote = {
		cid: null,
		last_modified: null
	};

	// TODO: possible problems if name exists already, prevent this before creation! 
	this.rename(charName);

	// set default values for known stats ...
	for (i = 0; i < SR4.StatList.length; i++) {
		this.stats[SR4.StatList[i]] = DEFAULTVAL;
	}

	for (i = 0; i < SR4.CondList.length; i++) {
		this.condition[SR4.CondList[i]] = 0;
	}

	this.updated();
};

// Bring character to the newest 'version', i.e., add Stats from SR4.StatList when missing
Character.prototype.upgrade = function() {
	// TODO: also remove props that were factored out along the way!
	var i;

	if (!this.Remote) {
		this.Remote = {
			cid: null,
			last_modified: null
		};	
	}

	for (i = 0; i < SR4.StatList.length; i++) {
		if (this.stats[SR4.StatList[i]] === undefined) {
			this.stats[SR4.StatList[i]] = DEFAULTVAL;
		}
	}

	for (i = 0; i < SR4.CondList.length; i++) {
		if (this.condition[SR4.CondList[i]] === undefined) {
			this.condition[SR4.CondList[i]] = 0;
		}
	}

	if (this.mods === undefined) {
		this.mods = {};
	}
};

Character.prototype.updateByOther = function(other, cid, last_modified) {
	if (this.charName !== other.charName) {
		this.charName  = other.charName;

		SR4.Local.charListChanged();	
	}
	
	this.stats     = other.stats;
	this.condition = other.condition;
	this.mods      = other.mods;

	this.Remote = {
		cid: cid,
		last_modified: last_modified
	};

	// the character in the string may be incomplete, do upgrade anyway
	this.upgrade();
	this.updated();
};

Character.prototype.updated = function() {
	// dump the new version into localStorage to have it around next time
	localStorage.setObject(window.APPSTRING+"Character."+this.charName, this);

	if (this === SR4.currChar) {
		// notify the visible page that the current character changed ...
		$("div[data-role='page']:visible").trigger("updatedChar");	
	}
};

Character.prototype.rename = function(charName) {
	this.charName = charName;
	this.updated();
};

/*
 * Update a single character statistic and update the page
 */
Character.prototype.setStat = function(stat, value) {
	this.stats[stat] = parseInt(value, 10);
	this.updated();
};

Character.prototype.getMods = function() {
	var imod = null;
	var mods = 0;

	for (imod in this.mods) {
		if (this.mods.hasOwnProperty(imod)) {
			mods += this.mods[imod];	
		}
	}

	return mods;
};
