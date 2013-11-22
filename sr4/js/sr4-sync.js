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

var SYNC_INTERVAL = 30000;

SR4.Remote.startSync = function() {
	if (!SR4.Events.sync) {
		SR4.Events.sync = setInterval(SR4.Remote.checkSyncChar, SYNC_INTERVAL);
	}
};

SR4.Remote.stopSync = function() {
	if (SR4.Events.sync) {
		clearInterval(SR4.Events.sync);
		SR4.Events.sync = null;
	}
};


SR4.Remote.updateSyncState = function(state) {
	var curr_state = SR4.currChar.Remote.sync_state;

	if (!SR4.Remote.login) {
		this.stopSync();
		$(".header-sync-btn").buttonMarkup({icon: "refresh", theme: "b"});
		$(".header-sync-btn").addClass("ui-disabled");
		return;
	}

	if ((state === "upload" && curr_state === "download") || (state === "download" && curr_state === "upload")) {
		state = "conflict";
	} else if (state === "uptodate" && curr_state === "upload") {
		state = "upload";
	} else {
		state = state;
	}

	switch (state) {
	case "detached":
		this.stopSync();
		$(".header-sync-btn").buttonMarkup({icon: "refresh", theme: "b"});
		$(".header-sync-btn").addClass("ui-disabled");
		break;

	case "updated":
	case "uptodate":
		this.startSync();
		$(".header-sync-btn").buttonMarkup({icon: "refresh", theme: "b"});
		$(".header-sync-btn").addClass("ui-disabled");
		break;

	case "upload":
		this.startSync();
		$(".header-sync-btn").removeClass("ui-disabled");
		$(".header-sync-btn").buttonMarkup({icon: "arrow-u", theme: "b"});
		break;

	case "download":
		this.stopSync();
		$(".header-sync-btn").removeClass("ui-disabled");
		$(".header-sync-btn").buttonMarkup({icon: "arrow-d", theme: "b"});
		break;

	case "conflict":
		this.stopSync();
		$(".header-sync-btn").addClass("ui-disabled");
		$(".header-sync-btn").buttonMarkup({icon: "alert", theme: "b"});
		break;

	default:
		console.log("updateSyncState: unknown state ", state, "!");
		$(".header-sync-btn").buttonMarkup({icon: "alert", theme: "b"});
		$(".header-sync-btn").addClass("ui-disabled");
		return;
	}

	SR4.currChar.Remote.sync_state = state;
};


SR4.Remote.checkSyncChar = function() {
	var i = 0;

	if (!SR4.currChar) {
		return;
	}

	$.post('../cgi-bin/sr4-chars.php', {'command':      'sync', 
										'cid':           SR4.currChar.Remote.cid,
										'last_modified': SR4.currChar.Remote.last_modified},
	function(response) {
		response = response.split("\n");
		
		for (i = 0; i < response.length; i++) {
			response[i] = $.trim(response[i]);	
		}

		if (response[0].indexOf("ok:sync:modified_on_server") === 0) {
			console.log("checkSync: found modified on server (timestamp: ", response[2].slice("last_modified=".length), ")!");

			$(".header-sync-btn").data("target", parseInt(response[1].slice("cid=".length), 10));

			SR4.Remote.updateSyncState("download");

		} else if (response[0].indexOf("ok:sync:up_to_date") === 0) {
			// nothing to do, nopping around
			SR4.Remote.updateSyncState("uptodate");			
			console.log("checkSync: we have the current char version.");

		} else if (response[0].indexOf("err:") === 0) {
			console.log('checkSync failed! Message: '+response[0]);
		} else {
			console.log('checkSync unexpected response from server! Message: '+response[0]);
		}
	});	
};

SR4.Remote.doSyncChar = function() {
	var i = 0;

	$.mobile.loading("show");

	if (!SR4.currChar) {
		return;
	}

	$.post('../cgi-bin/sr4-chars.php', {'command': 'pull', 'cid': SR4.currChar.Remote.cid}, function(response) {
		response = response.split("\n");
		
		for (i = 0; i < response.length; i++) {
			response[i] = $.trim(response[i]);	
		}

		if (response[0].indexOf('err:') === 0) {
			console.log('Pull failed! Message from server: '+response[0]);

		} else if (response[0].indexOf('ok:') === 0) {
			var character = response[1] && JSON.parse(response[1]);
			var cid  = parseInt(response[2].slice("cid=".length), 10);
			var lmod = response[3].slice("last_modified=".length);

			SR4.currChar.updateByOther(character, cid, lmod);
			SR4.Remote.updateSyncState("updated");
			console.log("Character successfully synced!");

		} else {
			console.log('Unexpected response from server! Message: '+response[0]);
		}

		$.mobile.loading("hide");
	});
};

// jQuery event handling //

$(document).on("switchedChar", function() {
	if (SR4.currChar.Remote.cid === null) {
		// local character that is not present on the server ...
		SR4.Remote.updateSyncState("detached");
	} else {
		SR4.Remote.checkSyncChar();
	}
});

$(document).on("updatedChar", function() {
	if (SR4.currChar.Remote.cid === null) {
		// local character that is not present on the server ...
		SR4.Remote.updateSyncState("detached");
	} else {
		SR4.Remote.updateSyncState("upload");
	}
});

$(document).on("click", ".header-sync-btn", function() {
	switch (SR4.currChar.Remote.sync_state) {
	case "download":
		SR4.Remote.doSyncChar();
		break;
	case "upload":
		SR4.Remote.pushChar(false);
		break;
	default:
		console.log("Clicked headersync but state is unknown!");
		break;
	}
});
