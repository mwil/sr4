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

auths = 'cornholio'

SR4.Remote.fetchCharList = function() {
	$.mobile.showPageLoadingMsg(true);

	$.post('../cgi-bin/sr4.py', {'group': 'devel', 'command': 'list', 'auth': auths}, function(response) {
		response = $.trim(response);

		if (response.indexOf('err:') === 0) {
			$('#remote-status-popup').html('Listing failed!<br/>Message: '+response).popup('open');
			$('#rem-lc-collap').trigger('collapse');
		} else {
			SR4.Remote.CharList = response && JSON.parse(response);
			SR4.Remote.refreshCharList();	
		}

		$.mobile.hidePageLoadingMsg();
	});
};

SR4.Remote.pullChar = function(index) {
	var charName = this.CharList[index];

	$.mobile.showPageLoadingMsg(true);

	$.post('../cgi-bin/sr4.py', {'group': 'devel', 'command': 'pull', 'cname': JSON.stringify(charName), 'auth': auths}, function(response) {
		response = $.trim(response);

		if (response.indexOf('err:') === 0) {
			$('#remote-status-popup').html('Pull failed!<br/>Message: '+response).popup('open');
		} else {
			SR4.Remote.Chars[charName] = response && JSON.parse(response);
			SR4.Remote.Chars[charName].__proto__ = Character.prototype;
			SR4.Remote.Chars[charName].upgrade();

			SR4.Remote.refreshCharList();

			// Overwrite local chars with the same name with remote chars // TODO: ask for confirmation
			SR4.Local.Chars[charName] = SR4.Remote.Chars[charName];
			SR4.Local.charListChanged();
			SR4.switchToChar(charName);

			$('#remote-status-popup').text('Pull successful!').popup('open');
		}

		$.mobile.hidePageLoadingMsg();
	});
};

SR4.Remote.pushChar = function() {
	$.mobile.showPageLoadingMsg(true);

	$.post('../cgi-bin/sr4.py', {'group': 'devel', 'command': 'push', 'auth': auths, 
								 'cname': JSON.stringify(SR4.currChar.charName), 
								 'char':JSON.stringify(SR4.currChar)}, function(response) 
	{
		response = $.trim(response);

		if (response === "ok:push:saved") {
			$('#remote-status-popup').text('Push successful!').popup('open');
		} else {
			$('#remote-status-popup').html('Push failed!<br/>Message: '+response).popup('open');	
		}

		$.mobile.hidePageLoadingMsg();
	});
};

SR4.Remote.removeChar = function() {
	$.mobile.showPageLoadingMsg(true);

	delete this.Chars[SR4.currChar.charName];
	this.CharList = Object.keys(this.Chars);

	$.post('../cgi-bin/sr4.py', {'group': 'devel', 'command': 'delete', 'auth': auths, 
								 'cname': JSON.stringify(SR4.currChar.charName)}, function(response)
	{
	 	response = $.trim(response);

		if (response === "ok:delete:deleted") {
			$('#remote-status-popup').text('Remove successful!').popup('open');
		} else {
			$('#remote-status-popup').html('Remove failed!<br/>Message: '+response).popup('open');	
		}

		$('#rem-lc-collap').trigger('collapse');
		SR4.Remote.refreshCharList();

		$.mobile.hidePageLoadingMsg();
	});
};



SR4.Remote.refreshCharList = function() {
	$('#rem-loadchar-lv').empty();

	for (var i = 0; i < this.CharList.length; i++) {
		$('#rem-loadchar-lv').append(
			"<li><a href='#' data-role='button' onClick='SR4.Remote.pullChar("+i+"); $(\"#rem-lc-collap\").trigger(\"collapse\");'>"+this.CharList[i]+"</a></li>")	
	};

	$("#rem-loadchar-lv").listview("refresh");
};

$(document).on('expand', '#rem-lc-collap', function (event) {
    SR4.Remote.fetchCharList();
});
