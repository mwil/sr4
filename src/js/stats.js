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

var Stats = { 
	Attrib:{},
};

Stats.Attrib.edge = 7;

var StatList = ["Attrib.edge"];

Stats.init = function() {
	console.log($('this.Attrib.edge')[0]);
	for (var i = 0; i < StatList.length; i++) {
		if (StatList[i] in localStorage) {
			Stats[StatList[i]] = localStorage[StatList[i]];
		} else {
			Stats[StatList[i]] = 2;
		}
	}

	Stats.updatePage();
};

/*
 * Update a single character statistic and update the page
 */
Stats.update = function(label, value) {
	this[label] = parseInt(value);
	console.log(label);
	console.log(this);
	console.log(this.Attrib.edge);

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
	$('#edge')[0].innerHTML = Stats.Attrib.edge;
};
