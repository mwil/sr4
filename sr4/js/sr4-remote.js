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

	$.post('../cgi-bin/sr4.py', {'group': 'devel', 'command': 'list', 'auth': auths}, function(data) {
		SR4.Remote.CharList = data && JSON.parse(data);
		SR4.Remote.refreshCharList();

		$.mobile.hidePageLoadingMsg();
	});
};

SR4.Remote.pullChar = function(charName) {
	$.mobile.showPageLoadingMsg(true);

	$.post('../cgi-bin/sr4.py', {'group': 'devel', 'command': 'pull', 'cname': charName, 'auth': auths}, function(data) {
		SR4.Remote.Chars[charName] = data && JSON.parse(data);
		SR4.Remote.Chars[charName].__proto__ = Character.prototype;
		SR4.Remote.refreshCharList();

		// Overwrite local chars with the same name with remote chars // TODO: ask for confirmation
		SR4.Local.Chars[charName] = SR4.Remote.Chars[charName];
		SR4.Local.refreshCharList();
		SR4.switchToChar(charName);

		$.mobile.hidePageLoadingMsg();
	});
};

SR4.Remote.pushChar = function() {
	$.mobile.showPageLoadingMsg(true);

	$.post('../cgi-bin/sr4.py', {'group': 'devel', 'command': 'push', 'auth': auths, 
								 'cname': JSON.stringify(SR4.currChar.charName), 
								 'char':JSON.stringify(SR4.currChar)}, function(data) {
		response = data;

		console.log('In pushChar, response: ', response);

		$.mobile.hidePageLoadingMsg();
	});
};

SR4.Remote.refreshCharList = function() {
	$('#rem-loadchar-lv').empty();

	for (var i = 0; i < this.CharList.length; i++) {
		$('#rem-loadchar-lv').append(
			"<li><a href='#' data-role='button' onClick='SR4.Remote.pullChar(\""+this.CharList[i]+
				"\"); $(\"#rem-lc-collap\").trigger(\"collapse\");'>"+this.CharList[i]+"</a></li>")	
	};

	$("#rem-loadchar-lv").listview("refresh");
};

$(document).on('expand', '#rem-lc-collap', function (event) {
    SR4.Remote.fetchCharList();
});
