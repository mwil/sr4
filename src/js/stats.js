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

var Stats = {};

var StatList = ["Attrib_EDG", "Attrib_BOD"];

Stats.init = function() {
	for (var i = 0; i < StatList.length; i++) {
		if (StatList[i] in localStorage) {
			this.update(StatList[i], localStorage[StatList[i]]);
		} else {
			this.update(StatList[i], 2);
		}
	}
};

/*
 * Update a single character statistic and update the page
 */
Stats.update = function(label, value) {
	this[label] = parseInt(value);

	// write to localStorage to have the same values next time
	localStorage.setItem(label, value)

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
	$('#Attrib_EDG')[0].innerHTML = Stats.Attrib_EDG;
	$('#Attrib_BOD')[0].innerHTML = Stats.Attrib_BOD;
};

Stats.updatePopup = function(label, target, value) {
	$('#stats-slider').attr('value', value);
	$('#stats-slider').attr('stat-target', target);
	$('#stats-slider').slider('refresh');

	$('#stats-poptext')[0].innerHTML = "New "+label+" value:";
};
