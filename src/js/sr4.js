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

window.startup = true;
window.withSwipe = false;
window.APPSTRING = "SR4."

var SR4 = {
	StatList: [],
	AppStrings: [window.APPSTRING+"__active_char__", 
				 window.APPSTRING+"__charlist__"],
	CharList: {},
	numChars: 0,
	currChar: null
};

SR4.init = function() {
	var gotChar = false;

	this.StatList = $('#StatList').attr("data-stats").trim().split(/\s+/);

	// load available chars from localStorage
	if (window.APPSTRING+"__charlist__" in localStorage) {
		var charnames = localStorage.getObject(window.APPSTRING+"__charlist__");

		for (var i = 0; i < charnames.length; i++) {
			this.CharList[charnames[i]] = localStorage.getObject(window.APPSTRING+"Character."+charnames[i]);
			this.CharList[charnames[i]].__proto__ = Character.prototype // add prototype functions again (I hope)
			this.numChars += 1;
		};
	}

	if (window.APPSTRING+"__active_char__" in localStorage) {
		var activechar = localStorage.getItem(window.APPSTRING+"__active_char__");
		
		if (activechar in this.CharList) {
			this.currChar = this.CharList[activechar];
			localStorage.setItem(window.APPSTRING+"__active_char__", activechar);

			gotChar = true;
		} else {
			// Unknown activechar, this should not happen ...
			if (this.numChars > 0) {
				// if there are other characters, take a (random) one
				for (var charname in this.CharList) {
					this.currChar = this.CharList[charname];
					localStorage.setItem(window.APPSTRING+"__active_char__", charname);
					gotChar = true;
					break;
				};
			} else {
				localStorage.removeItem(window.APPSTRING+"__active_char__");
			}
		}
	}

	this.refreshHeader();
};

SR4.createChar = function(charName) {
	if (charName in this.CharList || !charName) {
		// Name already exists ... TODO: in-app notification
		return;
	}

	var tmpchar = new Character(charName);
	this.CharList[charName] = tmpchar;
	this.numChars += 1;
	this.charListChanged();
	
	this.switchToChar(charName);
};

SR4.removeChar = function() {
	// cleanup 
	localStorage.removeItem(window.APPSTRING+"Character."+this.currChar.charName);
	delete this.CharList[this.currChar.charName];
	this.numChars -= 1;

	this.charListChanged();
	if (this.numChars > 0) {
		// pick up someone (possibly random) TODO: is there a less ugly way?
		for (var charname in this.CharList) {
			this.switchToChar(charname);
			break;	
		}
	} else {
		// remove and disable all links again
		this.currChar = null;
		localStorage.removeItem(window.APPSTRING+"__active_char__");
		this.refreshTitlePage();
	}
};

SR4.switchToChar = function(charName) {
	this.currChar = this.CharList[charName];

	localStorage.setItem(window.APPSTRING+"__active_char__", charName);

	this.refreshTitlePage();
};

SR4.renameChar= function(newName) {
	var oldName = this.currChar.charName;
	this.currChar.rename(newName);

	// relabel in global character list
	this.CharList[newName] = this.CharList[oldName];
	delete this.CharList[oldName];

	// clear character from localStorage
	localStorage.removeItem(window.APPSTRING+"Character."+oldName);
	
	// mark the new name as active again
	this.currChar = this.CharList[newName];
	localStorage.setItem(window.APPSTRING+"__active_char__", newName);

	this.charListChanged();
	this.refreshTitlePage();
};

SR4.charListChanged = function() {
	// update charlist in localStorage
	// keys breaks in old browsers? who cares.
	localStorage.setObject(window.APPSTRING+"__charlist__", Object.keys(this.CharList));
}

SR4.refreshHeader = function() {
	$('.inheader').removeClass('ui-disabled');
};

SR4.refreshTitlePage = function() {
	if (this.currChar) {
		$('.charName').html(this.currChar.charName);
	} else {
		$('.charName').html("No Char found!");
	}

	if (this.numChars > 0) {
		$('#loadchar-container').removeClass('ui-disabled');
		$('.nochar-disabled').removeClass('ui-disabled');

		$('#loadchar-lv').empty();

		for (var charname in this.CharList) {
			$('#loadchar-lv').append("<li><a href='#' data-role='button'\
				onClick='SR4.switchToChar(\""+charname+"\"); $(\"#loadchar-container\").trigger(\"collapse\");'>"+charname+"</a></li>")	
		};

		$("#loadchar-lv").listview("refresh");
	} else {
		$('.nochar-disabled').addClass('ui-disabled');
	}
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
	// auto-adjust the maxval to repair a too loose maxval
	var maxval = 9;
	while (maxval < value) {
		maxval += 5;
	}

	$('#stats-slider').val(value);
	$('#stats-slider').attr('stat-target', statTarget);
	$('#stats-slider').attr('max', maxval);
	$('#stats-slider').slider('refresh');

	$('#stats-poptext').html("New "+statName+" value:");
};

SR4.refreshMonitorPage = function() {
	Monitor.refresh();
};


/* ######################### */
/* Nicer Storage interaction */
/* ######################### */

Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
};

Storage.prototype.getObject = function(key) {
    var value = this.getItem(key);
    return value && JSON.parse(value);
};


/* ###########################
    jQuery event registration
   ########################### */

$(document).on('pagebeforeshow', '#title', function () {
	if (window.startup) {
		SR4.init();
		window.startup = false;
	}

	if (window.withSwipe) {
		$('#title').bind('swipeleft', function(event, ui) {
	    	$.mobile.changePage("#stats", "slide");
		});
		$('#title').bind('swiperight', function(event, ui) {
	    	$.mobile.changePage("#monitor", "slide");
		});
	}

	SR4.refreshTitlePage();
});
