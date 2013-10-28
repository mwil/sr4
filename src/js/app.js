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
		App.init();	
		startup = false;	
	}
});

var App = {
	StatList: ["Attrib_BOD", 
			   "Attrib_EDG"],
	AppStrings: [APPSTRING+"__lastchar__", 
				 APPSTRING+"__charlist__"],
	CharList: {},
	numChars: 0,
	currChar: null,
};

App.init = function() {
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
		var charname = localStorage.getItem(APPSTRING+"__lastchar__");
		
		for (var character in this.CharList) {
			if (character.charName == charname) {
				this.currChar = character;
				gotChar = true;
			}
		} 

		if (!gotChar) {
			// Unknown lastchar, this should not happen ...
			if (this.numChars > 0) {
				// if there are other characters, take a (random) one
				for (var character in this.CharList) {
					this.currChar = character;
					gotChar = true;
					break;
				};
			} else {
				localStorage.removeItem(APPSTRING+"__lastchar__")	
			}
		}
	}

	if (gotChar) {
		this.updateLoadCharLV();

		// we have a valid char now for sure, enable the functionality if disabled!
		$('.nochar-disabled').removeClass('ui-disabled');
	}
};

App.createChar = function(charName) {
	if (charName in this.CharList) {
		// Name already exists ... TODO: in-app notification
		alert("Character name already exists!");
		return;
	}

	var tmpchar = new Character(charName, false);
	this.CharList.push(tmpchar);
	this.currChar = tmpchar;

	// update charlist in localStorage
	var charstring = ""
	for (var chr in this.CharList) {
		charstring += chr.charName + FIELDSEP;
	};
	// remove trailing FIELDSEP
	charstring = charstring.slice(0, charstring.length - 2);

	localStorage.setItem(APPSTRING+"__charlist__", charstring);

	this.updateLoadCharLV();
	$('.nochar-disabled').removeClass('ui-disabled');
};

App.updateLoadCharLV = function() {
	if (this.numChars > 0) {
		$('loadchar-container').removeClass('ui-disabled');
	} else {
		$('loadchar-container').addClass('ui-disabled');
	}

	$('#loadchar-lv').empty();

	for (var chr in this.CharList) {
		$('#loadchar-lv').append("<li><a href='#'>"+chr.charName+"</a></li>")	
	};
};
