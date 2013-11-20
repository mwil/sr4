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


SR4.Remote.init = function() {
	if (window.APPSTRING+"__active_user__" in localStorage) {
		this.user = localStorage.getItem(window.APPSTRING+"__active_user__");
	}
};

SR4.Remote.loginToServer = function() {
	$.mobile.loading("show");

	$.post('../cgi-bin/sr4-login.php', {'command': 'login', 'username': this.user, 'password': 'jdzt9R'}, function(response) {
		response = response.split("\n");
		
		for (var i = 0; i < response.length; i++) {
			response[i] = $.trim(response[i]);	
		};

		if (response[0].indexOf('err:') === 0) {
			$('#remote-status-popup').html('Login failed!<br/>'+response[1]).popup('open');
		} else if (response[0].indexOf('ok:') === 0) {
			var username = response[1].slice("username=".length);
			var uid      = response[2].slice("uid=".length);

			localStorage.setItem(window.APPSTRING+"__active_user__", username);

			$("#rem-server-collap .ui-btn-text:first").text("Connected to Server (as "+username+")");
			$("#rem-server-collap").trigger("expand");	
		} else {
			$('#remote-status-popup').html('Unexpected response from server!<br/>Message: '+response[0]).popup('open');
		};

		$.mobile.loading("hide");
	});
};

SR4.Remote.logoutFromServer = function() {
	$.mobile.loading("show");

	$.post('../cgi-bin/sr4-login.php', {'command': 'logout'}, function(response) {
		response = $.trim(response);

		if (response.indexOf('err:') === 0) {
			$('#remote-status-popup').html('Logout failed!<br/>Message from server: '+response).popup('open');
		} else if (response.indexOf('ok:') === 0) {				
			$("#rem-server-collap .ui-btn-text:first").text("Connect to Server");
			$("#rem-lc-collap").trigger("collapse");
		} else {
			$('#remote-status-popup').html('Unexpected response from server!<br/>Message: '+response).popup('open');
		};

		$.mobile.loading("hide");
	});
};

SR4.Remote.fetchCharList = function() {
	$.mobile.loading("show");

	$.post('../cgi-bin/sr4-chars.php', {'command': 'list'}, function(response) {
		response = response.split("\n");
		
		for (var i = 0; i < response.length; i++) {
			response[i] = $.trim(response[i]);	
		};

		if (response[0].indexOf('err:') === 0) {
			$('#remote-status-popup').html('Listing failed!<br/>Message from server: '+response[0]).popup('open');
			$('#rem-lc-collap').trigger('collapse');
		} else if (response[0].indexOf('ok:') === 0) {
			SR4.Remote.CharIDs = response[1] && JSON.parse(response[1]);
			SR4.Remote.refreshCharList();	
		} else {
			$('#remote-status-popup').html('Unexpected response from server!<br/>Message: '+response[0]).popup('open');
		};

		$.mobile.loading("hide");
		$("#rem-lc-collap").trigger("expand");
	});
};

SR4.Remote.pullCharByCID = function(cid) {
	$.mobile.loading("show");

	$.post('../cgi-bin/sr4-chars.php', {'command': 'pull', 'cid': cid}, function(response) {
		response = response.split("\n");
		
		for (var i = 0; i < response.length; i++) {
			response[i] = $.trim(response[i]);	
		};

		if (response[0].indexOf('err:') === 0) {
			$('#remote-status-popup').html('Pull failed!<br/>Message from server: '+response).popup('open');

		} else if (response[0].indexOf('ok:') === 0) {
			var character = response[1] && JSON.parse(response[1]);
			var charName  = character.charName;

			character.__proto__ = Character.prototype;

			SR4.Remote.Chars[charName] = character;
			SR4.Remote.Chars[charName].upgrade();

			SR4.Remote.Chars[charName].Remote.cid = parseInt(response[2].slice("cid=".length));
			SR4.Remote.Chars[charName].Remote.last_modified = response[3].slice("last_modified=".length));

			SR4.Remote.refreshCharList();

			// Overwrite local chars with the same name with remote chars // TODO: ask for confirmation
			SR4.Local.Chars[charName] = SR4.Remote.Chars[charName];
			SR4.Local.Chars[charName].updated();
			SR4.Local.charListChanged();
			SR4.switchToChar(charName);

			$('#remote-status-popup').html('Character successfully added to local library!').popup('open');

		} else {
			$('#remote-status-popup').html('Unexpected response from server!<br/>Message: '+response[0]).popup('open');
		};

		$.mobile.loading("hide");
	});
};

SR4.Remote.pushChar = function() {
	$.mobile.loading("show");

	$.post('../cgi-bin/sr4-chars.php', {'command': 'push', 'cid': SR4.currChar.Remote.cid,
			'charname': SR4.currChar.charName, 'chardata': JSON.stringify(SR4.currChar)}, function(response) 
	{
		response = response.split("\n");
		
		for (var i = 0; i < response.length; i++) {
			response[i] = $.trim(response[i]);	
		};

		if (response[0].indexOf("ok:") === 0) {
			$('#remote-status-popup').text('Character is now stored on the server!').popup('open');
			SR4.currChar.Remote.cid = parseInt(response[1].slice("cid=".length));
			SR4.currChar.updated();

		} else if (response[0].indexOf("err:") === 0) {
			$('#remote-status-popup').html('Push failed!<br/>Message from server: '+response[0]).popup('open');	
		} else {
			$('#remote-status-popup').html('Unexpected response from server!<br/>Message: '+response[0]).popup('open');
		}

		$('#rem-lc-collap').trigger('collapse');
		$.mobile.loading("hide");
	});
};

SR4.Remote.removeCharByCID = function(cid) {
	$.mobile.loading("show");

	delete this.Chars[this.CharIDs[cid]];

	$.post('../cgi-bin/sr4-chars.php', {'command': 'delchar', 'cid': cid}, function(response) {
		response = $.trim(response);

		if (response.indexOf("ok:") === 0) {
			$('#remote-status-popup').text('Character successfully removed!').popup('open');
		} else if (response.indexOf("err:") === 0) {
			$('#remote-status-popup').html('Remove failed!<br/>Message: '+response).popup('open');	
		} else {
			$('#remote-status-popup').html('Unexpected response from server!<br/>Message: '+response).popup('open');
		};

		$('#rem-lc-collap').trigger('collapse');
		SR4.Remote.refreshCharList();

		$.mobile.loading("hide");
	});
};

SR4.Remote.refreshCharList = function() {
	$('#rem-loadchar-lv').empty();

	for (var cid in this.CharIDs) {
		$('#rem-loadchar-lv').append("<li><a href='#' data-role='button' data-icon='forward' "+
			"onClick='SR4.Remote.pullCharByCID("+cid+"); $(\"#rem-lc-collap\").trigger(\"collapse\");'>"+this.CharIDs[cid]+"</a>"+
			"<a href='#rem-delete-popup' data-rel='popup' onClick='$(\"#rem-delete-popup\").data(\"target\", "+cid+");'>Delete</a></li>")	
	};

	$("#rem-loadchar-lv").listview("refresh");
};



$(document).on('pageinit', '#title',  function() {
	// handle the "fetch before show" collapsibles on the title page
	$(".ui-collapsible-heading-toggle").on("click", function (e) {
		var curr_id = $(this).closest(".ui-collapsible").attr("id");
		
		if ($(this).closest(".ui-collapsible").hasClass("ui-collapsible-collapsed")) {
			// Opening a collapsible

			if(curr_id === "rem-server-collap") {
				e.stopImmediatePropagation();

				$("#rem-user-txtbx").val(SR4.Remote.user);
				setTimeout(function() { $("#login-popup").popup("open"); }, 100);

			} else if (curr_id === "rem-lc-collap") {
				e.stopImmediatePropagation();

				SR4.Remote.fetchCharList();
			};
			// other callapsibles on #title also trigger this event, do nothing ...

		} else {
			// Closing a collapsible

			if(curr_id === "rem-server-collap") {
				SR4.Remote.logoutFromServer();
			};
		};
	});

	// Taking care of focus
	$("#rename-popup").on("popupafteropen", function(e) {
		$("#charname-txtbx").focus();
	});
});
