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
	if (!this.currChar) {
		return;
	};
		
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
	$('#stats-slider').data('target', statTarget);
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


	$("#stats").on("updatedChar", function() {
		SR4.refreshStatsPage();
	});

	$("#title").on("switchedChar", function() {
		SR4.refreshStatsPage();
	});

	$("#stats-set-btn").click( 
		function() {
			SR4.currChar.setStat($('#stats-slider').data('target'), $('#stats-slider').val());
		}
	);

	$("#stats-max-btn").click( 
		function() {
			var $slider = $('#stats-slider');

			$slider.attr('max', 5 + parseInt($slider.attr('max'), 10)).slider('refresh');
		}
	);

	$("#stats-attr-lv").on("click", ".stats-attr-btn", 
		function() {
			SR4.updateStatsPopup($(this).data("name"), $(this).data("stat"), SR4.currChar.stats[$(this).data("stat")]);
		}
	);

	$(".stats-skill-lv").on("click", ".stats-skill-btn", 
		function() {
			SR4.updateStatsPopup($(this).data("name"), $(this).data("stat"), SR4.currChar.stats[$(this).data("stat")]);
		}
	);
});

$(document).on('pagebeforeshow', '#stats',  function() {
	if (SR4.currChar) {
		SR4.refreshStatsPage();	
	} else {
		$.mobile.changePage('#title', {transition: "none"});
	}
});
