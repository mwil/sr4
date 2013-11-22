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

window.withSwipe = false;

$(document).one('pageinit', function () {
		SR4.Local.init();
		SR4.Remote.init();
		console.log("Should appear once.");
	}
});

/* // Handle swiping, does not work so well.
$(document).on('pagebeforeshow', "div[data-role='page']", function () { 
	$('.next-button').attr('href', '#'+$(this).jqmData('next'));

	if (window.withSwipe) {
		$(this).bind('swipeleft', function(event, ui) {
			$.mobile.changePage('#'+$(this).jqmData('next'), {transition: "slide"});
		});

		$(this).bind('swiperight', function(event, ui) {
			$.mobile.changePage('#'+$(this).jqmData('prev'), {transition: "slide", reverse: true});
		});
	};
});

$(document).on('pagebeforehide', "div[data-role='page']", function () {
	if (window.withSwipe) {
		$(this).off('swipeleft swiperight');
	}
});
*/
