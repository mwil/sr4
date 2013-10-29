$(document).on('pagebeforeshow', '#monitor', function () {
	SR4.refreshMonitorPage();
});

Monitor = {
	currStun: 0,
	currPhy: 0,
}

Monitor.refresh = function() {
	$('#stun-monitor .ui-btn-text').text("("+this.currStun+" / "+(8+Math.ceil(SR4.currChar.stats['Attrib_WIL']))+")")

	$('#phy-monitor .ui-btn-text').text("("+this.currPhy+" / "+(8+Math.ceil(SR4.currChar.stats['Attrib_BOD']))+")")
};
