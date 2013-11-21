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
	var i = 0;
	var icharname = null;

	// get the statlist that was saved by XSLT in a data element of a hidden div
	SR4.StatList = $('.AttrList').data("stats").trim().split(/\s+/);

	// Get the skill information from each category and add it to the statlist
	$('.SkillList').each(function() {
		SR4.StatList = SR4.StatList.concat($(this).data("stats").trim().split(/\s+/));
	});
	

	// load available chars from localStorage
	if (localStorage.hasOwnProperty(window.APPSTRING+"__charlist__")) {
		var charnames = localStorage.getObject(window.APPSTRING+"__charlist__");

		for (i = 0; i < charnames.length; i++) {
			if (localStorage.hasOwnProperty(window.APPSTRING_C+charnames[i])) {
				this.Chars[charnames[i]] = localStorage.getObject(window.APPSTRING_C+charnames[i]);
				this.Chars[charnames[i]].__proto__ = Character.prototype; // add prototype functions again

				this.Chars[charnames[i]].upgrade();
			}
		}

		this.CharList = Object.keys(this.Chars);
	}

	if (localStorage.hasOwnProperty(window.APPSTRING+"__active_char__")) {
		var activechar = localStorage.getItem(window.APPSTRING+"__active_char__");
		
		if (this.Chars[activechar] !== undefined) {
			SR4.switchToChar(activechar);
		} else {
			localStorage.removeItem(window.APPSTRING+"__active_char__");
		}
	}
			
	if (Object.keys(this.Chars).length > 0 && !SR4.currChar) {
		// if we don't have a char yet and there are other characters, take a (random) one
		for (icharname in this.Chars) {
			if (this.Chars.hasOwnProperty(icharname)) {
				SR4.switchToChar(charname);
				break;	
			}
		}
	}
};

SR4.Local.createChar = function(charName) {
	if (this.Chars[charName] !== undefined || !charName) {
		// Name already exists ... TODO: in-app notification
		return;
	}

	var tmpchar = new Character(charName);
	this.Chars[charName] = tmpchar;
	this.charListChanged();
	
	SR4.switchToChar(charName);
};

SR4.Local.removeChar = function() {
	var icharname = null;
	// cleanup 
	localStorage.removeItem(window.APPSTRING_C+SR4.currChar.charName);
	delete this.Chars[SR4.currChar.charName];

	this.charListChanged();

	if (Object.keys(this.Chars).length > 0) {
		// pick up someone (possibly random) TODO: is there a less ugly way?
		for (icharname in this.Chars) {
			if (this.Chars.hasOwnProperty(icharname)) {
				SR4.switchToChar(charname);
				break;
			}
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
	}
};

SR4.Local.renameChar = function(newName) {
	var oldName = SR4.currChar.charName;

	if (newName === oldName) {
		return;
	}

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
	localStorage.setObject(window.APPSTRING+"__charlist__", Object.keys(this.Chars));
	this.CharList = Object.keys(this.Chars);

	this.refreshCharList();
};

SR4.Local.refreshCharList = function() {
	var i = 0;

	$('#loadchar-lv').empty();

	for (i = 0; i < this.CharList.length; i++) {
		$('#loadchar-lv').append("<li><a href='#' data-role='button' data-icon='forward'" +
			                     "onClick='SR4.switchToCharByIndex("+i+"); $(\"#loadchar-container\").trigger(\"collapse\");'>"+this.CharList[i]+
			                     "</a><a href='#delete-popup' data-rel='popup' onClick='$(\"#delete-popup\").attr(\"data-target\", "+i+")'>Delete</a></li>");	
	}

	$("#loadchar-lv").listview("refresh");
};
