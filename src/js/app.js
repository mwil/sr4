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

//$(window).load( function() {});
$(document).on('pageinit', function () {
	if (startup) {
		App.init();	
		startup = false;	
	}
});

var App = {
	StatList: ["Attrib_BOD", "Attrib_EDG"],
	AppStrings: ["__lastchar__", "__charlist__"],
	CharList: [],
};

App.init = function() {
	if ("__lastchar__" in localStorage) {
		var charname = localStorage.getItem("__lastchar__");
		Stats.init(charname);
	}
	if ("__charlist__" in localStorage) {
		this.CharList = localStorage.getItem("__charlist__");
	}
};
