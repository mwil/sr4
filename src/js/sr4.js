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

// load on first pageinit only
var startup = true;

var APPSTRING = "SR4."
var FIELDSEP = "#";

//$(window).load( function() {});
$(document).on('pageinit', function () {
	if (startup) {
		SR4.init();	
		startup = false;	
	}
});

var SR4 = {
	StatList: ["Attrib_BOD", 
			   "Attrib_EDG"],
	AppStrings: [APPSTRING+"__lastchar__", 
				 APPSTRING+"__charlist__"],
	CharList: {},
	numChars: 0,
	currChar: null,
};

SR4.init = function() {
	var gotChar = false;

	// load available chars from localStorage
	if (APPSTRING+"__charlist__" in localStorage) {
		var charnames = localStorage.getItem(APPSTRING+"__charlist__").split(FIELDSEP);

		for (var i = 0; i < charnames.length; i++) {
			var tmpchar = new Character(charnames[i], true);
			this.CharList[charnames[i]] = tmpchar;
			this.numChars += 1;
		};
	}

	if (APPSTRING+"__lastchar__" in localStorage) {
		var lastchar = localStorage.getItem(APPSTRING+"__lastchar__");
		
		if (lastchar in this.CharList) {
			this.currChar = this.CharList[lastchar];
			gotChar = true;
		} else {
			// Unknown lastchar, this should not happen ...
			if (this.numChars > 0) {
				// if there are other characters, take a (random) one
				for (var charname in this.CharList) {
					this.currChar = this.CharList[charname];
					gotChar = true;
					break;
				};
			} else {
				localStorage.removeItem(APPSTRING+"__lastchar__");
			}
		}
	}

	if (gotChar) {
		SR4.updateStatsPage();
		this.updateLoadCharLV();

		// we have a valid char now for sure, enable the functionality if disabled!
		$('.nochar-disabled').removeClass('ui-disabled');
	}
};

SR4.createChar = function(charName) {
	if (charName in this.CharList) {
		// Name already exists ... TODO: in-app notification
		alert("Character name already exists!");
		return;
	}

	var tmpchar = new Character(charName, false);
	this.CharList[charName] = tmpchar;
	this.numChars += 1;
	this.currChar = this.CharList[charName];

	this.charListChanged();

	this.updateLoadCharLV();
	$('.nochar-disabled').removeClass('ui-disabled');
};

SR4.switchToChar = function(charName) {
	this.currChar = this.CharList[charName];

	localStorage.setItem(APPSTRING+"__lastchar__", charName);

	$('.charName').html(charName);
	this.updateLoadCharLV();
	this.updateStatsPage();
};

SR4.charNameChanged = function(oldName, newName) {
	this.CharList[newName] = this.CharList[oldName];
	delete this.CharList[oldName];
	
	this.currChar = this.CharList[newName];
	localStorage.setItem(APPSTRING+"__lastchar__", newName);

	this.charListChanged();
	
	$('.charName').html(newName);
	this.updateLoadCharLV();
};

SR4.charListChanged = function() {
	// update charlist in localStorage
	var charstring = "";
	for (var charname in this.CharList) {
		charstring += charname + FIELDSEP;
	};
	// remove trailing FIELDSEP
	charstring = charstring.slice(0, charstring.length - 1);

	localStorage.setItem(APPSTRING+"__charlist__", charstring);
}

SR4.updateLoadCharLV = function() {
	if (this.numChars > 0) {
		$('#loadchar-container').removeClass('ui-disabled');
	} else {
		$('#loadchar-container').addClass('ui-disabled');
	}

	$('#loadchar-lv').empty();

	for (var charname in this.CharList) {
		$('#loadchar-lv').append("<li><a href='#' data-role='button' onClick='SR4.switchToChar(\""+charname+"\")'>"+charname+"</a></li>")	
	};

	$("#loadchar-lv").listview("refresh");
};

/*
 * Copy current values to the page contents
 */
SR4.updateStatsPage = function() {
	for (var i = 0; i < this.StatList.length; i++) { 
		var stat = this.StatList[i];

		$('#'+stat).html(this.currChar.stats[stat]);	
	};
};

SR4.updateStatsPopup = function(statName, statTarget, value) {
	$('#stats-slider').val(value);
	$('#stats-slider').attr('stat-target', statTarget);
	$('#stats-slider').slider('refresh');

	$('#stats-poptext').html("New "+statName+" value:");
};
