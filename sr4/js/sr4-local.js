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


SR4.Local.init = function() {
	var gotChar = false;

	SR4.StatList = $('#StatList').attr("data-stats").trim().split(/\s+/);

	// load available chars from localStorage
	if (window.APPSTRING+"__charlist__" in localStorage) {
		var charnames = localStorage.getObject(window.APPSTRING+"__charlist__");

		for (var i = 0; i < charnames.length; i++) {
			if (window.APPSTRING_C+charnames[i] in localStorage) {
				this.Chars[charnames[i]] = localStorage.getObject(window.APPSTRING_C+charnames[i]);
				this.Chars[charnames[i]].__proto__ = Character.prototype; // add prototype functions again (I hope)

				this.Chars[charnames[i]].upgrade();
			}
		};

		this.CharList = Object.keys(this.Chars);
	}

	if (window.APPSTRING+"__active_char__" in localStorage) {
		var activechar = localStorage.getItem(window.APPSTRING+"__active_char__");
		
		if (activechar in this.Chars) {
			SR4.currChar = this.Chars[activechar];
			localStorage.setItem(window.APPSTRING+"__active_char__", activechar);

			gotChar = true;
		} else {
			// Unknown activechar, this should not happen ...
			if (Object.keys(this.Chars).length > 0) {
				// if there are other characters, take a (random) one
				for (var charname in this.Chars) {
					SR4.currChar = this.Chars[charname];
					localStorage.setItem(window.APPSTRING+"__active_char__", charname);
					gotChar = true;
					break;
				};
			} else {
				localStorage.removeItem(window.APPSTRING+"__active_char__");
			}
		}
	}

	SR4.refreshHeader();
};

SR4.Local.createChar = function(charName) {
	if (charName in this.Chars || !charName) {
		// Name already exists ... TODO: in-app notification
		return;
	}

	var tmpchar = new Character(charName);
	this.Chars[charName] = tmpchar;
	this.charListChanged();
	
	SR4.switchToChar(charName);
};

SR4.Local.removeChar = function() {
	// cleanup 
	localStorage.removeItem(window.APPSTRING_C+SR4.currChar.charName);
	delete this.Chars[SR4.currChar.charName];

	this.charListChanged();

	if (Object.keys(this.Chars).length > 0) {
		// pick up someone (possibly random) TODO: is there a less ugly way?
		for (var charname in this.Chars) {
			SR4.switchToChar(charname);
			break;	
		}
	} else {
		// remove and disable all links again
		SR4.currChar = null;
		localStorage.removeItem(window.APPSTRING+"__active_char__");
		SR4.refreshTitlePage();
	}
};

SR4.Local.removeCharByIndex = function(index) {
	var charname = this.CharList[index];

	if (charname === SR4.currChar.charName) {
		this.removeChar();
	} else {
		localStorage.removeItem(window.APPSTRING_C+charname);
		delete this.Chars[charname];

		this.charListChanged();		
	};
};

SR4.Local.renameChar = function(newName) {
	var oldName = SR4.currChar.charName;

	if (newName === oldName) {
		return;
	};

	SR4.currChar.rename(newName);

	// relabel in local character list
	this.Chars[newName] = this.Chars[oldName];
	delete this.Chars[oldName];

	// clear character from localStorage
	localStorage.removeItem(window.APPSTRING_C+oldName);
	
	SR4.switchToChar(newName);

	this.charListChanged();
};

SR4.Local.charListChanged = function() {
	// update charlist in localStorage
	// keys breaks in old browsers? who cares. This already breaks in Firefox.
	localStorage.setObject(window.APPSTRING+"__charlist__", Object.keys(this.Chars));
	this.CharList = Object.keys(this.Chars);

	this.refreshCharList();
};

SR4.Local.refreshCharList = function() {
	$('#loadchar-lv').empty();

	for (var i = 0; i < this.CharList.length; i++) {
		$('#loadchar-lv').append("<li><a href='#' data-role='button' data-icon='forward'" +
			                     "onClick='SR4.switchToCharByIndex("+i+"); $(\"#loadchar-container\").trigger(\"collapse\");'>"+this.CharList[i]+
			                     "</a><a href='#delete-popup' data-rel='popup' onClick='$(\"#delete-popup\").attr(\"data-target\", "+i+")'>Delete</a></li>")	
	};

	$("#loadchar-lv").listview("refresh");
};
