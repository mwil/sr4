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

var APPSTRING = "SR4."
var FIELDSEP = "#";
var DEFAULTVAL = 1;
var DEFAULTNAME = "Character Name";

var Character = function(charName, exists) {
	this.charName = DEFAULTNAME;
	this.stats = {};

	if (exists) {
		this.loadChar(charName);
	} else {
		this.newChar(charName);
	}

};

Character.prototype.nameOk = function(charName) {
	if (!charName) {
		return false;
	}

	// Check for option-delimiter '#' in the name, replace silently!
	if (charName.indexOf(FIELDSEP) > -1) {
		charName.replace(FIELDSEP, ".");
	}

	if ($.inArray(charName, SR4.AppStrings) > -1) {
		// using internal strings may work, but it will propably not be nice ...
		alert("Please do not try to bork this app ...");
		return false;
	}

	return true;
};

Character.prototype.newChar = function(charName) {
	// TODO: possible problems if name exists already, prevent this before creation! 
	this.renameChar(charName);

	// set default values for known stats ...
	for (var i = 0; i < SR4.StatList.length; i++) {
		var query = APPSTRING+charName+FIELDSEP+SR4.StatList[i];

		this.updateStat(SR4.StatList[i], DEFAULTVAL);
		localStorage.setItem(query, DEFAULTVAL);
	};
};

Character.prototype.loadChar = function(charName) {
	this.renameChar(charName);

	for (var i = 0; i < SR4.StatList.length; i++) {
		var query = APPSTRING+charName+FIELDSEP+SR4.StatList[i];

		if (query in localStorage) {
			this.updateStat(SR4.StatList[i], localStorage[query]);
		} else {
			this.updateStat(SR4.StatList[i], DEFAULTVAL);
			localStorage.setItem(query, DEFAULTVAL);
		}
	}
};

Character.prototype.renameChar = function(charName) {
	if (!this.nameOk(charName)) {
		return;
	}

	// This requires some updating of the localStorage later if Values are stored with "Char Name#Attrib_X"
	for (var key in localStorage) {
		if (key.indexOf(this.charName) === APPSTRING.length) {
			// TODO: I hope one level of # is enough ...
			var option = key.split(FIELDSEP)[1];
			var currval = localStorage.getItem(key);

			localStorage.setItem(APPSTRING+charName+FIELDSEP+option, currval);
			localStorage.removeItem(key);
		}
	};

	this.charName = charName;
	localStorage.setItem(APPSTRING+"__lastchar__", charName);

	$('.charName').html(this.charName);
};

/*
 * Update a single character statistic and update the page
 */
Character.prototype.updateStat = function(stat, value) {
	this.stats[stat] = parseInt(value);

	// write to localStorage to have the same values next time
	localStorage.setItem(APPSTRING+this.charName+FIELDSEP+stat, value)

	// Notify dice offsets that a value was changed if necessary
	if (stat in Dice.Offsets) {
		Dice.changeOffset(stat, parseInt(value));
	}

	this.updatePage();
};

/*
 * Copy current values to the page contents
 */
Character.prototype.updatePage = function() {
	for (var i = 0; i < SR4.StatList.length; i++) { 
		var stat = SR4.StatList[i];

		$('#'+stat).html(this.stats[stat]);	
	};
};

Character.prototype.updatePopup = function(statName, statTarget, value) {
	$('#stats-slider').val(value);
	$('#stats-slider').attr('stat-target', statTarget);
	$('#stats-slider').slider('refresh');

	$('#stats-poptext').html("New "+statName+" value:");
};
