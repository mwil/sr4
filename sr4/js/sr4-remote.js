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
	if (localStorage.hasOwnProperty(window.APPSTRING+"__active_user__")) {
		this.user = localStorage.getItem(window.APPSTRING+"__active_user__");
	}
};

SR4.Remote.loginToServer = function() {
	var i = 0;

	$.mobile.loading("show");

	$.post('../cgi-bin/sr4-login.php', {'command': 'login', 'username': this.user, 'password': 'jdzt9R'}, function(response) {
		response = response.split("\n");
		
		for (i = 0; i < response.length; i++) {
			response[i] = $.trim(response[i]);	
		}

		if (response[0].indexOf('err:') === 0) {
			$('#remote-status-popup').html('<h3>Login failed!</h3>Message: '+response[1]).popup('open');
		} else if (response[0].indexOf('ok:') === 0) {
			var username = response[1].slice("username=".length);
			var uid      = response[2].slice("uid=".length);

			localStorage.setItem(window.APPSTRING+"__active_user__", username);

			$("#rem-server-collap .ui-btn-text:first").text("Connected to Server (as "+username+")");
			$("#rem-server-collap").trigger("expand");

			SR4.Remote.login = true;
			SR4.Remote.updateSyncState(SR4.currChar.Remote.sync_state);

		} else {
			$('#remote-status-popup').html('<h3>Unexpected response from server!</h3>Message: '+response[0]).popup('open');
		}

		$.mobile.loading("hide");
	});
};

SR4.Remote.logoutFromServer = function() {
	$.mobile.loading("show");

	$.post('../cgi-bin/sr4-login.php', {'command': 'logout'}, function(response) {
		response = $.trim(response);

		if (response.indexOf('err:') === 0) {
			$('#remote-status-popup').html('<h3>Logout failed!</h3>Message: '+response).popup('open');
		} else if (response.indexOf('ok:') === 0) {				
			$("#rem-server-collap .ui-btn-text:first").text("Connect to Server");
			$("#rem-lc-collap").trigger("collapse");

			SR4.Remote.login = false;
			SR4.Remote.stopSync();

		} else {
			$('#remote-status-popup').html('<h3>Unexpected response from server!</h3>Message: '+response).popup('open');
		}

		$.mobile.loading("hide");
	});
};

SR4.Remote.fetchCharList = function() {
	var i = 0;

	$.mobile.loading("show");

	$.post('../cgi-bin/sr4-chars.php', {'command': 'list'}, function(response) {
		response = response.split("\n");
		
		for (i = 0; i < response.length; i++) {
			response[i] = $.trim(response[i]);	
		}

		if (response[0].indexOf('err:') === 0) {
			$('#remote-status-popup').html('<h3>Listing failed!</h3>Message: '+response[0]).popup('open');
			$('#rem-lc-collap').trigger('collapse');

		} else if (response[0].indexOf('ok:') === 0) {
			SR4.Remote.CharIDs = response[1] && JSON.parse(response[1]);
			SR4.Remote.refreshCharList();	

		} else {
			$('#remote-status-popup').html('<h3>Unexpected response from server!</h3>Message: '+response[0]).popup('open');
		}

		$("#rem-lc-collap").trigger("expand");
		$.mobile.loading("hide");
	});
};

SR4.Remote.pullCharByCID = function(cid) {
	var i = 0;

	$.mobile.loading("show");

	$.post('../cgi-bin/sr4-chars.php', {'command': 'pull', 'cid': cid}, function(response) {
		response = response.split("\n");
		
		for (i = 0; i < response.length; i++) {
			response[i] = $.trim(response[i]);	
		}

		if (response[0].indexOf('err:') === 0) {
			$('#remote-status-popup').html('<h3>Pull failed!</h3>Message: '+response).popup('open');

		} else if (response[0].indexOf('ok:') === 0) {
			var character = response[1] && JSON.parse(response[1]);
			var charName  = character.charName;

			var cid  = parseInt(response[2].slice("cid=".length), 10);
			var lmod = response[3].slice("last_modified=".length);

			if (SR4.Local.Chars[charName] !== undefined) {
				// update the existing char ... TODO ask for confirmation?
				SR4.Local.Chars[charName].updateByOther(character, cid, lmod);

			} else {
				// New char, update the received option to a character object
				character.__proto__ = Character.prototype;
				character.upgrade();

				character.Remote.cid = cid;
				character.Remote.last_modified = lmod;
				character.Remote.sync_state = "updated";

				SR4.Local.Chars[charName] = character;
				SR4.Local.Chars[charName].updated();
				SR4.Local.charListChanged();
			}

			SR4.switchToChar(charName);

			$('#remote-status-popup').html('<h3>Character successfully added to local library!</h3>').popup('open');

		} else {
			$('#remote-status-popup').html('<h3>Unexpected response from server!</h3>Message: '+response[0]).popup('open');
		}

		$.mobile.loading("hide");
	});
};

SR4.Remote.pushChar = function(with_popup) {
	var i = 0;

	$.mobile.loading("show");

	$.post('../cgi-bin/sr4-chars.php', {'command': 'push', 'cid': SR4.currChar.Remote.cid,
			'charname': SR4.currChar.charName, 'chardata': JSON.stringify(SR4.currChar)}, function(response) 
	{
		response = response.split("\n");
		
		for (i = 0; i < response.length; i++) {
			response[i] = $.trim(response[i]);	
		}

		if (response[0].indexOf("ok:") === 0) {
			if (with_popup) {
				$('#remote-status-popup').html('<h3>Character is now stored on the server!</h3>').popup('open');	
			} else {
				console.log("Character is now stored on the server!");
			}

			SR4.currChar.Remote.cid  = parseInt(response[1].slice("cid=".length), 10);
			SR4.currChar.Remote.last_modified = response[2].slice("last_modified=".length);
			SR4.currChar.updated();

			SR4.Remote.updateSyncState("updated");

		} else if (response[0].indexOf("err:") === 0) {
			if (with_popup) {
				$('#remote-status-popup').html('<h3>Push failed!</h3>Message: '+response[0]).popup('open');		
			} else {
				console.log('Push failed! Message: ', response[0]);
			}
			
		} else {
			if (with_popup) {
				$('#remote-status-popup').html('<h3>Unexpected response from server!</h3>Message: '+response[0]).popup('open');
			} else {
				console.log("Unexpected response from server! Message: ", response[0]);
			}
		}

		if (with_popup) {
			$('#rem-lc-collap').trigger('collapse');	
		}
		
		$.mobile.loading("hide");
	});
};

SR4.Remote.removeCharByCID = function(cid) {
	$.mobile.loading("show");

	delete this.Chars[this.CharIDs[cid]];

	$.post('../cgi-bin/sr4-chars.php', {'command': 'delchar', 'cid': cid}, function(response) {
		response = $.trim(response);

		if (response.indexOf("ok:") === 0) {
			$('#remote-status-popup').html('<h3>Character successfully removed!</h3>').popup('open');
		} else if (response.indexOf("err:") === 0) {
			$('#remote-status-popup').html('<h3>Remove failed!</h3>Message: '+response).popup('open');	
		} else {
			$('#remote-status-popup').html('<h3>Unexpected response from server!</h3>Message: '+response).popup('open');
		}

		$('#rem-lc-collap').trigger('collapse');

		$.mobile.loading("hide");
	});
};

SR4.Remote.refreshCharList = function() {
	var cid = 0;

	$('#rem-loadchar-lv').empty();

	for (cid in this.CharIDs) {
		if (this.CharIDs.hasOwnProperty(cid)) {
			$('#rem-loadchar-lv').append("<li><a href='#' data-role='button' data-icon='forward' "+
			"onClick='SR4.Remote.pullCharByCID("+cid+"); $(\"#rem-lc-collap\").trigger(\"collapse\");'>"+this.CharIDs[cid]+"</a>"+
			"<a href='#rem-delete-popup' data-rel='popup' onClick='$(\"#rem-delete-popup\").data(\"target\", "+cid+");'>Delete</a></li>");
		}
	}

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
			}
			// other callapsibles on #title also trigger this event, do nothing ...

		} else {  // on closing a collapsible
			if (curr_id === "rem-server-collap") {
				SR4.Remote.logoutFromServer();
			}
		}
	});

	// Taking care of focus
	$("#rename-popup").on("popupafteropen", function(e) {
		$("#charname-txtbx").focus();
	});
});
