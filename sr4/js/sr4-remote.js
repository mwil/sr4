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

	$.post('../cgi-bin/sr4.py', {'command': 'login', 'user': this.user, 'auth': this.auths}, function(response) {
		response = $.trim(response);

		if (response.indexOf('err:') === 0) {
			$('#remote-status-popup').html('Login failed!<br/>Message from server: '+response).popup('open');
		} else {
			var username = response.slice("ok:login:".length);

			localStorage.setItem(window.APPSTRING+"__active_user__", username);

			$("#rem-server-collap .ui-btn-text:first").text("Connected to Server (as "+username+")");
			$("#rem-server-collap").trigger("expand");	
		};

		$.mobile.loading("hide");
	});
};


SR4.Remote.fetchCharList = function() {
	$.mobile.loading("show");

	$.post('../cgi-bin/sr4.py', {'group': 'devel', 'command': 'list', 'auth': this.auths}, function(response) {
		response = $.trim(response);

		if (response.indexOf('err:') === 0) {
			$('#remote-status-popup').html('Listing failed!<br/>Message from server: '+response).popup('open');
			$('#rem-lc-collap').trigger('collapse');
		} else {
			SR4.Remote.CharList = response && JSON.parse(response);
			SR4.Remote.refreshCharList();	
		}

		$.mobile.loading("hide");
		$("#rem-lc-collap").trigger("expand");
	});
};

SR4.Remote.pullChar = function(index) {
	var charName = this.CharList[index];

	$.mobile.loading("show");

	$.post('../cgi-bin/sr4.py', {'group': 'devel', 'command': 'pull', 'cname': JSON.stringify(charName), 'auth': this.auths}, function(response) {
		response = $.trim(response);

		if (response.indexOf('err:') === 0) {
			$('#remote-status-popup').html('Pull failed!<br/>Message from server: '+response).popup('open');
		} else {
			SR4.Remote.Chars[charName] = response && JSON.parse(response);
			SR4.Remote.Chars[charName].__proto__ = Character.prototype;
			SR4.Remote.Chars[charName].upgrade();

			SR4.Remote.refreshCharList();

			// Overwrite local chars with the same name with remote chars // TODO: ask for confirmation
			SR4.Local.Chars[charName] = SR4.Remote.Chars[charName];
			SR4.Local.charListChanged();
			SR4.switchToChar(charName);

			$('#remote-status-popup').text('Character successfully added to local library!').popup('open');
		}

		$.mobile.loading("hide");
	});
};

SR4.Remote.pushChar = function() {
	$.mobile.loading("show");

	$.post('../cgi-bin/sr4.py', {'group': 'devel', 'command': 'push', 'auth': this.auths, 
								 'cname': JSON.stringify(SR4.currChar.charName), 
								 'char':JSON.stringify(SR4.currChar)}, function(response) 
	{
		response = $.trim(response);

		if (response === "ok:push:saved") {
			$('#remote-status-popup').text('Character is now stored on the server!').popup('open');
		} else {
			$('#remote-status-popup').html('Push failed!<br/>Message from server: '+response).popup('open');	
		}

		// TODO: keep charlist updated ...
		$.mobile.loading("hide");
	});
};

SR4.Remote.removeCharByIndex = function(index) {
	var charname = this.CharList[index];

	this.removeChar(charname);
};

SR4.Remote.removeChar = function(charname) {
	$.mobile.loading("show");

	delete this.Chars[charname];
	this.CharList = Object.keys(this.Chars);

	$.post('../cgi-bin/sr4.py', {'group': 'devel', 'command': 'delete', 'auth': this.auths, 
								 'cname': JSON.stringify(charname)}, function(response)
	{
	 	response = $.trim(response);

		if (response === "ok:delete:deleted") {
			$('#remote-status-popup').text('Character successfully removed!').popup('open');
		} else {
			$('#remote-status-popup').html('Remove failed!<br/>Message from server: '+response).popup('open');	
		}

		$('#rem-lc-collap').trigger('collapse');
		SR4.Remote.refreshCharList();

		$.mobile.loading("hide");
	});
};

SR4.Remote.refreshCharList = function() {
	$('#rem-loadchar-lv').empty();

	for (var i = 0; i < this.CharList.length; i++) {
		$('#rem-loadchar-lv').append("<li><a href='#' data-role='button' data-icon='forward' "+
			"onClick='SR4.Remote.pullChar("+i+"); $(\"#rem-lc-collap\").trigger(\"collapse\");'>"+this.CharList[i]+"</a>"+
			"<a href='#rem-delete-popup' data-rel='popup' onClick='$(\"#rem-delete-popup\").attr(\"data-target\", "+i+");'>Delete</a></li>")	
	};

	$("#rem-loadchar-lv").listview("refresh");
};



$(document).on('pageinit', '#title',  function() {
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
	    		$("#rem-server-collap .ui-btn-text:first").text("Connect to Server");
	    		$("#rem-lc-collap").trigger("collapse");
	    	};
	    };
	});
});
