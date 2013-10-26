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
	Stats.updatePage();
});

var Stats = {}

Stats.edge = 7;

Stats.update = function(what, value) {
	alert('hier');
	this.setAttribute(what, value);
	this.updatePage();

}

Stats.updatePage = function() {
	$('#edge')[0].innerHTML = Stats.edge;
}