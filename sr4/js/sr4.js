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

window.APPSTRING   = "Datajack.";
window.APPSTRING_C = window.APPSTRING + "Character.";

var SR4 = {
	StatList: [],
	CondList: ['currStun', 'currPhy', 'currMisc'],

	AppStrings: [
		window.APPSTRING+"__active_char__", 
		window.APPSTRING+"__charlist__",
		window.APPSTRING+"__active_user__"
	],

	Remote: {
		CharIDs: {},
		user: null,
		sync_state: null
	},

	Local:  {
		Chars: {},
		CharList: []
	},
	
	currChar: null,

	Detached: {
		tests_MAG: null,
		tests_RES: null	
	},

	Events: {
		sync: null
	}
};


SR4.switchToChar = function(charName) {
	this.currChar = this.Local.Chars[charName];

	localStorage.setItem(window.APPSTRING+"__active_char__", charName);

	$("div[data-role='page']:visible").trigger("switchedChar");
};

SR4.switchToCharByIndex = function(index) {
	// save to call from JS onClicks, even with evil unescaped names
	this.switchToChar(this.Local.CharList[index]);
};

SR4.refreshTitlePage = function() {
	if (this.currChar) {
		$('.charName').html(this.currChar.charName);
		$('.nochar-disabled').removeClass('ui-disabled');

	} else {
		$('.charName').html("No Char found!");
		$('.nochar-disabled').addClass('ui-disabled');
	}

	if (Object.keys(this.Local.Chars).length > 0) {
		$('#loadchar-container').removeClass('ui-disabled');
	}

	this.Local.refreshCharList();
};

SR4.refreshMonitorPage = function() {
	Monitor.refresh();
};

SR4.refreshTestsPage = function() {
	this.hideMAGorRES();

	Test.refresh();
};

SR4.hideMAGorRES = function() {
	if(!this.currChar) {
		return;
	}

	// hide skill collapsibles on stats page if attrib requirements are not satisfied
	// detach list element and restore them if necessary, just hiding them breaks ...
	if (this.currChar.stats.Attrib_MAG === 0) {
		$("div.skill-magic").hide();

		if (!this.Detached.tests_MAG) {
			this.Detached.tests_MAG = $("li.skill-magic").detach();	
		}

	} else {
		$("div.skill-magic").show();

		if (this.Detached.tests_MAG) {
			this.Detached.tests_MAG.appendTo("#search-skill-lv");
			this.Detached.tests_MAG = null;
		}
	}

	if (this.currChar.stats.Attrib_RES === 0) {
		$("div.skill-resonance").hide();

		if (!this.Detached.tests_RES) {
			this.Detached.tests_RES = $("li.skill-resonance").detach();
		}

	} else {
		$("div.skill-resonance").show();

		if (this.Detached.tests_RES) {
			this.Detached.tests_RES.appendTo("#search-skill-lv");
			this.Detached.tests_RES = null;
		}
	}
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

$(document).on('pageinit', '#title',  function() {
	// Taking care of focus for input popups
	$("#login-popup").on("popupafteropen", function(e) {
		$("#login-submit-btn").focus();
	});

	$("#createchar-popup").on("popupafteropen", function(e) {
		$("#newchar-name-txtbx").focus();
	});

	$("#rename-popup").on("popupafteropen", function(e) {
		$("#charname-txtbx").focus();
	});


	$("#title").on("updatedChar", function() {
		SR4.refreshTitlePage();
	});

	$("#title").on("switchedChar", function() {
		Test.resetAll();

		SR4.refreshTitlePage();
	});
});

$(document).on('pagebeforeshow', '#title', function () {
	SR4.refreshTitlePage();
});
