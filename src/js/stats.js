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

var FIELDSEP = "#";
var DEFAULTVAL = 1;

var Stats = {
	charName: null,
};

Stats.init = function(charname) {
	this.loadChar(charname);

	// we have a valid char now, enable the functionality!
	$('.startup-disabled').removeClass('ui-disabled');
};

Stats.newChar = function(charname) {
	if (!this.nameOk(charname)) {
		return;
	}

	// Apply name ...
	Stats.charName = charname;
	localStorage.setItem("__lastchar__", charname);
	$('.charname').html(Stats.charName);

	// set default values for stats ...
	for (var i = 0; i < App.StatList.length; i++) {
		var query = charname+FIELDSEP+App.StatList[i];

		this.update(App.StatList[i], DEFAULTVAL);
		localStorage.setItem(query, DEFAULTVAL);
	};

	// we have a valid char now for sure, enable the functionality if disabled!
	$('.startup-disabled').removeClass('ui-disabled');
};

Stats.loadChar = function(charname) {
	this.renameChar(charname);

	for (var i = 0; i < App.StatList.length; i++) {
		var query = charname+FIELDSEP+App.StatList[i];

		if (query in localStorage) {
			this.update(App.StatList[i], localStorage[query]);
		} else {
			this.update(App.StatList[i], DEFAULTVAL);
			localStorage.setItem(query, DEFAULTVAL);
		}
	}
};

Stats.renameChar = function(charname) {
	if (!this.nameOk(charname)) {
		return;
	}

	// This requires some updating of the localStorage later if Values are stored with "Char Name#Attrib_X"
	for (var key in localStorage) {
		if (key.indexOf(Stats.charName) === 0) {
			// TODO: I hope one level of # is enough ...
			var option = key.split(FIELDSEP)[1];
			var currval = localStorage.getItem(key);

			localStorage.setItem(charname+FIELDSEP+option, currval);
			localStorage.removeItem(key);
		}
	};

	Stats.charName = charname;
	localStorage.setItem("__lastchar__", charname);

	$('.charname').html(Stats.charName);
};

Stats.nameOk = function(charname) {
	if ($.inArray(charname, App.AppStrings) > -1) {
		// using internal strings may work, but it will propably not be nice ...
		alert("Please do not try to bork this app ...");
		return false;
	}
	// TODO: check for option-delimiter '#' in the name!

	return true;
};

/*
 * Update a single character statistic and update the page
 */
Stats.update = function(label, value) {
	this[label] = parseInt(value);

	// write to localStorage to have the same values next time
	localStorage.setItem(Stats.charName+FIELDSEP+label, value)

	// Notify dice offsets that a value was changed if necessary
	if (label in Dice.Offsets) {
		Dice.changeOffset(label, parseInt(value));
	}

	Stats.updatePage();
};

/*
 * Copy current values to the page contents
 */
Stats.updatePage = function() {
	$('#Attrib_EDG').html(Stats.Attrib_EDG);
	$('#Attrib_BOD').html(Stats.Attrib_BOD);
};

Stats.updatePopup = function(label, target, value) {
	$('#stats-slider').val(value);	
	$('#stats-slider').attr('stat-target', target);
	$('#stats-slider').slider('refresh');

	$('#stats-poptext').html("New "+label+" value:");
};
