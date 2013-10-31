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
	$.post('../cgi-bin/sr4.py', {group: 'devel', command: 'list'}, function(data) {
		SR4.Remote.Chars = data && JSON.parse(data);

		for (var cname in SR4.Remote.Chars) {
		 	SR4.Remote.Chars[cname].__proto__ = Character.prototype;
		}
		console.log('in fetch:', SR4.Remote.Chars);

		SR4.Remote.refreshCharList();
	});
};

SR4.Remote.refreshCharList = function() {
	$('#rem-loadchar-lv').empty();

	for (var charname in this.Chars) {
		$('#rem-loadchar-lv').append("<li><a href='#' data-role='button'\
			onClick='SR4.switchToChar(\""+charname+"\"); $(\"#rem-loadchar-container\").trigger(\"collapse\");'>"+charname+"</a></li>")	
	};

	$("#rem-loadchar-lv").listview("refresh");
};
