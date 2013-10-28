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
	StatList: ["Attrib_BOD", "Attrib_EDG"],
	AppStrings: [APPSTRING+"__lastchar__", 
				 APPSTRING+"__charlist__"],
	CharList: {},
	currChar = null;
};

App.init = function() {
	var gotChar = false;

	// load available chars from localStorage
	if ("SR4.__charlist__" in localStorage) {
		var charnames = localStorage.getItem(APPSTRING+"__charlist__").split(FIELDSEP);

		for (var i = 0; i < charnames.length; i++) {
			var tmpchar = new Character(charnames[i], true);
			this.CharList[charnames[i]] = tmpchar;
		};
	}

	if ("SR4.__lastchar__" in localStorage) {
		var charname = localStorage.getItem(APPSTRING+"__lastchar__");
		
		if (charname in this.CharList) {
			this.currChar = this.CharList[charname];
			gotChar = true;
		} else {
			// Unknown lastchar, this should not happen ...
			localStorage.removeItem(APPSTRING+"__lastchar__")
		}
	}

	if (gotChar) {
		// we have a valid char now for sure, enable the functionality if disabled!
		$('.startup-disabled').removeClass('ui-disabled');
	}
};

App.createChar = function(charName) {
	if (charName in this.CharList) {
		// Name already exists ...
		alert("Name already exists!");
		return;
	}

	var tmpchar = new Character(charName, false);
	this.CharList.push(tmpchar);

	var charstring = ""
	for (var chr in this.CharList) {
		charstring += chr.charName + FIELDSEP;
	};
	// remove trailing FIELDSEP
	charstring = charstring.slice(0, charstring.length - 2);

	localStorage.setItem(APPSTRING+"__charlist__", charstring);
};
