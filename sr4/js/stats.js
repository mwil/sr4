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

SR4.refreshStatsPage = function() {
	for (var i = 0; i < this.StatList.length; i++) { 
		var stat = this.StatList[i];

		$('#'+stat).html(this.currChar.stats[stat]);	
	};

	this.hideMAGorRES();
};

SR4.updateStatsPopup = function(statName, statTarget, value) {
	// auto-adjust the maxval to repair a too loose maxval
	var maxval = 9;
	
	while (maxval < value) {
		maxval += 5;
	};

	$('#stats-slider').val(value);
	$('#stats-slider').attr('stat-target', statTarget);
	$('#stats-slider').attr('max', maxval);
	$('#stats-slider').slider('refresh');

	$('#stats-poptext').html("New "+statName+" value:");
};

$(document).on('pageinit', '#stats',  function() {
	// Taking care of focus
	$("#stats-popup").on("popupafteropen", function(e) {
		// focus on the handle and not just the input element (focuses text box next to slider)
		$("#stats-popup .ui-slider-handle").focus();
	});
});


$(document).on('pagebeforeshow', '#stats',  function() {
	// hide elements that are only of interest for mages or technomancers
	SR4.hideMAGorRES();
});
