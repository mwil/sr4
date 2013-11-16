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

window.APPSTRING   = "Datajack."
window.APPSTRING_C = window.APPSTRING + "Character."

var SR4 = {
	StatList: [],
	CondList: ['currStun', 'currPhy', 'currMisc'],

	AppStrings: [window.APPSTRING+"__active_char__", 
				 window.APPSTRING+"__charlist__",
				 window.APPSTRING+"__active_user__"],

	Remote: { Chars: {}, 
			  CharList: [],
			  user: null,
			  auths: 'cornholio'
			},
	Local:  {Chars: {}, CharList: []},
	currChar: null
};


SR4.switchToChar = function(charName) {
	this.currChar = this.Local.Chars[charName];

	localStorage.setItem(window.APPSTRING+"__active_char__", charName);

	Test.resetAll();
	this.refreshTitlePage();
};

SR4.switchToCharByIndex = function(index) {
	// save to call from JS onClicks, even with evil unescaped names
	this.switchToChar(this.Local.CharList[index]);
};


SR4.refreshHeader = function() {
	$('.inheader').removeClass('ui-disabled');
};

SR4.refreshTitlePage = function() {
	if (this.currChar) {
		$('.charName').html(this.currChar.charName);
	} else {
		$('.charName').html("No Char found!");
	}

	if (Object.keys(this.Local.Chars).length > 0) {
		$('#loadchar-container').removeClass('ui-disabled');
		$('.nochar-disabled').removeClass('ui-disabled');

		this.Local.refreshCharList();
	} else {
		$('.nochar-disabled').addClass('ui-disabled');
	};
};

SR4.refreshStatsPage = function() {
	for (var i = 0; i < this.StatList.length; i++) { 
		var stat = this.StatList[i];

		$('#'+stat).html(this.currChar.stats[stat]);	
	};

	this.hideMAGorRES();
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

SR4.refreshTestsPage = function() {
	this.hideMAGorRES();

	Test.refresh();
};

SR4.hideMAGorRES = function() {
	if (this.currChar.stats["Attrib_MAG"] === 0) {
		$(".skill-magic").hide();
	} else {
		// TODO: show only if outer container is open! Use detach() instead?
		$(".skill-magic").show();
	};

	if (this.currChar.stats["Attrib_RES"] === 0) {
		$(".skill-resonance").hide();
	} else {
		$(".skill-resonance").show();
	};
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
	SR4.refreshTitlePage();
});
