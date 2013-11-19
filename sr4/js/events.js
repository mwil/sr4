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

$(document).on('pageinit', "[data-role='page']", function () {
	if (window.startup) {
		SR4.Local.init();
		SR4.Remote.init();
		window.startup = false;
	}
});

$(document).on('pagebeforeshow', "[data-role='page']", function () { 
	$('.next-button').attr('href', '#'+$(this).jqmData('next'));

	if (window.withSwipe) {
		$(this).bind('swipeleft', function(event, ui) {
	    	$.mobile.changePage('#'+$(this).jqmData('next'), {transition: "slide"});
		});

		$(this).bind('swiperight', function(event, ui) {
	    	$.mobile.changePage('#'+$(this).jqmData('prev'), {transition: "slide", reverse: true});
		});
	};

	// hide elements that are only of interest for mages or technomancers
	SR4.hideMAGorRES();
});

$(document).on('pagebeforehide', "[data-role='page']", function () { 		
	if (window.withSwipe) {
		$(this).off('swipeleft swiperight');
	}
});

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
});

$(document).on('pageinit', '#stats',  function() {
	// Taking care of focus
	$("#stats-popup").on("popupafteropen", function(e) {
		// focus on the handle and not just the input element (focuses text box next to slider)
		$(".ui-slider-handle").focus();
	});
});