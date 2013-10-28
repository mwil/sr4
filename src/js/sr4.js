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

$(document).on('pagebeforeshow', '#title', function () {
	if (startup) {
		SR4.init();	
		startup = false;	
	} else {
		SR4.refreshTitlePage();
	}
});

$(document).on('pagebeforeshow', '#stats', function () {
	SR4.refreshStatsPage();
});

var SR4 = {
	StatList: ["Attrib_BOD", 
			   "Attrib_EDG"],
	AppStrings: [APPSTRING+"__active_char__", 
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

	if (APPSTRING+"__active_char__" in localStorage) {
		var activechar = localStorage.getItem(APPSTRING+"__active_char__");
		
		if (activechar in this.CharList) {
			this.switchToChar(activechar);
			gotChar = true;
		} else {
			// Unknown activechar, this should not happen ...
			if (this.numChars > 0) {
				// if there are other characters, take a (random) one
				for (var charname in this.CharList) {
					this.switchToChar(charname);
					gotChar = true;
					break;
				};
			} else {
				localStorage.removeItem(APPSTRING+"__active_char__");
			}
		}
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
	this.charListChanged();
	
	this.switchToChar(charName);
};

SR4.removeCharacter = function() {
	// TODO: implemement me!
};

SR4.switchToChar = function(charName) {
	this.currChar = this.CharList[charName];

	localStorage.setItem(APPSTRING+"__active_char__", charName);

	this.refreshTitlePage();
};

SR4.charNameChanged = function(oldName, newName) {
	this.CharList[newName] = this.CharList[oldName];
	delete this.CharList[oldName];
	
	this.currChar = this.CharList[newName];
	localStorage.setItem(APPSTRING+"__active_char__", newName);

	this.charListChanged();
	this.refreshTitlePage();
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

SR4.refreshTitlePage = function() {
	$('.charName').html(this.currChar.charName);

	if (this.numChars > 0) {
		$('#loadchar-container').removeClass('ui-disabled');
		$('.nochar-disabled').removeClass('ui-disabled');
	} else {
		$('#loadchar-container').addClass('ui-disabled');
	}

	$('#loadchar-lv').empty();

	for (var charname in this.CharList) {
		$('#loadchar-lv').append("<li><a href='#' data-role='button'\
			onClick='SR4.switchToChar(\""+charname+"\"); $(\"#loadchar-container\").trigger(\"collapse\");'>"+charname+"</a></li>")	
	};

	$("#loadchar-lv").listview("refresh");
};

SR4.refreshStatsPage = function() {
	for (var i = 0; i < this.StatList.length; i++) { 
		var stat = this.StatList[i];

		$('#'+stat).html(this.currChar.stats[stat]);	
	};
};

SR4.refreshDicePage = function() {
	Dice.refreshDiceButtons();
}

SR4.updateStatsPopup = function(statName, statTarget, value) {
	$('#stats-slider').val(value);
	$('#stats-slider').attr('stat-target', statTarget);
	$('#stats-slider').slider('refresh');

	$('#stats-poptext').html("New "+statName+" value:");
};
