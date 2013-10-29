$(document).on('pagebeforeshow', '#monitor', function () {	
	if (window.startup) {
		SR4.init();
		window.startup = false;
	}

	SR4.refreshMonitorPage();
});

var Monitor = {
	currStun: 0,
	currPhy: 0,
	conditionModifier: 0
}

Monitor.hitStun = function(hits) {
	var maxStun = (8+Math.ceil(SR4.currChar.stats['Attrib_WIL']/2));

	if (hits >= 0) {
		if ((this.currStun + hits) > maxStun) {
			var overflow = (this.currStun + hits) - maxStun;
			
			this.hitPhy(overflow);
			this.currStun = maxStun;
		} else {
			this.currStun += hits;
		}
	} else {
		if (this.currStun == 0) {
			return;
		} else {
			this.currStun -= 1;
		}
	}

	this.refresh();
};

Monitor.hitPhy = function(hits) {
	var maxPhy = (8+Math.ceil(SR4.currChar.stats['Attrib_BOD']/2));

	if (hits >= 0) {
		if ((this.currPhy + hits) > maxPhy) {
			var overflow = (this.currPhy + hits) - maxPhy;
			this.currPhy += hits;
		} else {
			this.currPhy += hits;
		}
	} else {
		if (this.currPhy == 0) {
			return;
		} else {
			this.currPhy -= 1;
		}
	}

	this.refresh();

};

Monitor.refresh = function() {
	var maxStun = (8+Math.ceil(SR4.currChar.stats['Attrib_WIL']/2));
	var maxPhy  = (8+Math.ceil(SR4.currChar.stats['Attrib_BOD']/2));
	var stunMod = -Math.floor(this.currStun/3);
	var phyMod  = -Math.floor(this.currPhy/3);

	// TODO: detect stunned, coma, dead here

	// TODO: provide active modifiers for the current char
	this.conditionModifier = stunMod + phyMod;

	$('#stun-monitor .ui-btn-text').text("("+this.currStun+" / "+maxStun+") Mod: "+stunMod);

	$('#phy-monitor .ui-btn-text').text("("+this.currPhy+" / "+maxPhy+") Mod "+phyMod);
};
