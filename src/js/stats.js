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

jQuery(window).load(function () {
	Stats.init();
});

var Stats = {
	charName: null,
};

// AutoGen me!
var StatList = ["Attrib_BOD", "Attrib_EDG"];
var AppStrings = ["__lastchar__"];

Stats.init = function() {
	// find current char ... (there is only one atm)
	if ("__lastchar__" in localStorage) {
		var charname = localStorage.getItem("__lastchar__");
	} else {
		// TODO: rather use dialog when no lastchar is set
		// add newchar method to have full char records in store
		// make # configurable FIELDSELECT="#"
		// ++ add localStorage cleaner for development
		// let the dialog do its job first ...
		$('#newchar-dialog').popup("open");
		return;
	}

	this.renameChar(charname);

	for (var i = 0; i < StatList.length; i++) {
		var query = charname+"#"+StatList[i];

		if (query in localStorage) {
			this.update(StatList[i], localStorage[query]);
		} else {
			this.update(StatList[i], 2);
		}
	}
};

Stats.renameChar = function(charname) {
	if (charname == Stats.charName) {
		// nothing happened.
		return;
	} else if ($.inArray(charname, AppStrings) > -1) {
		// using internal strings may work, but it will propably not be nice ...
		alert("Please do not try to bork this app ...");
		return;
	}
	// TODO: check for option-delimiter '#' in the name!

	// This requires some updating of the localStorage later if Values are stored with "Char Name#Attrib_X"
	for (var key in localStorage) {
		if (key.indexOf(Stats.charName) === 0) {
			// TODO: I hope one level of # is enough ...
			var option = key.split("#")[1];
			var currval = localStorage.getItem(key);

			localStorage.setItem(charname+"#"+option, currval);
			localStorage.removeItem(key);
		}
	};

	console.log(localStorage);
	Stats.charName = charname;
	localStorage.setItem("__lastchar__", charname);

	$('.charname').html(Stats.charName);
}

/*
 * Update a single character statistic and update the page
 */
Stats.update = function(label, value) {
	this[label] = parseInt(value);

	// write to localStorage to have the same values next time
	localStorage.setItem(Stats.charName+"#"+label, value)

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
