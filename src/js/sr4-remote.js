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

SR4.Remote.fetchCharList = function() {
	$.post('../cgi-bin/sr4.py', {command: 'list'}, function(data) {
		var clist = data && JSON.parse(data);
		console.log(this);
		console.log(clist);
	});
};

SR4.Remote.refreshCharList = function() {
	$('#rem-loadchar-lv').empty();

	for (var charname in this.rem_CharList) {
		$('#loadchar-lv').append("<li><a href='#' data-role='button'\
			onClick='SR4.switchToChar(\""+charname+"\"); $(\"#loadchar-container\").trigger(\"collapse\");'>"+charname+"</a></li>")	
	};

	$("#loadchar-lv").listview("refresh");
};
