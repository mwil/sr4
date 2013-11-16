<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0" xmlns="http://www.w3.org/1999/xhtml" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<!-- Templates for the title (portal) page -->

<xsl:template match="title">
	<h1 class="txtcenter charName"><xsl:text>No Char found!</xsl:text></h1>
	
	<a href="#createchar-popup" data-rel="popup" data-transition="pop" data-position-to="window"
		data-role="button" data-icon="gear" data-iconpos="right"> 
		<xsl:text>New Character</xsl:text>
	</a>

	<!-- Character load chooser -->
	<div data-role="collapsible" data-iconpos="right"  data-collapsed-icon="arrow-d" data-expanded-icon="arrow-u"
		id="loadchar-container" class="center-collap ui-disabled nochar-disabled">
		<h2><xsl:text>&#160;&#160;Browse Local Characters</xsl:text></h2> <!-- FIXME: hack to center, but ok -->
		<ul data-role="listview" id="loadchar-lv" data-split-icon="delete" data-split-theme="c"></ul>
	</div>
	<!-- -->

	<a href="#rename-popup" data-rel="popup"
		data-role="button" data-icon="edit" data-iconpos="right" class="ui-disabled nochar-disabled">
		<xsl:text>Rename Character</xsl:text>
	</a>


	<!-- The SERVER COLLAPSIBLE -->
	<div data-role="collapsible" data-collapsed-icon="refresh" data-expanded-icon="delete" data-iconpos="right"
		class="center-collap" id="rem-server-collap">
		<h2><xsl:text>Connect to Server</xsl:text></h2>

		<a href="#" data-role="button" data-icon="bars" data-iconpos="right" class="ui-disabled" id="rem-group-a">
			<xsl:text>Choose Group (current: devel)</xsl:text>
		</a>

		<!-- Character load chooser -->
		<div data-role="collapsible" data-collapsed-icon="refresh" data-iconpos="right" data-expanded-icon="arrow-u"
			id="rem-lc-collap" class="center-collap">
			<h2><xsl:text>&#160;&#160;Browse Remote Characters</xsl:text></h2> <!-- FIXME: hack to center, but ok -->
			<ul data-role="listview" id="rem-loadchar-lv" data-split-icon="delete" data-split-theme="c"></ul>
		</div>

		<a href="#" data-role="button" data-icon="check" data-iconpos="right" onClick="SR4.Remote.pushChar();"
			class="ui-disabled nochar-disabled" id="rem-server-a">
			<xsl:text>Push Character to Server</xsl:text>
		</a>
	</div>




	<!-- The POPUPS -->

	<!-- Notifications from remote server interaction -->
	<div data-role="popup" id="remote-status-popup" class="ui-content">
		<h3><xsl:text>AUTOFILLED</xsl:text></h3>
	</div>

	<!-- Get Username / Groupname / Password / ... -->
	<div data-role="popup" id="login-popup" data-transition="pop" data-position-to="window" class="ui-content">
		<h3><xsl:text>Enter your username:</xsl:text></h3>

		<input type="text" id="rem-user-txtbx" value="" placeholder="Enter name ..." data-clear-btn="true"/>
		<input type="text" id="rem-pass-txtbx" value="" placeholder="Password" disabled="disabled"/>

		<button type="submit" data-theme="b" data-icon="check"
			onClick="SR4.Remote.user=$('#rem-user-txtbx').val(); SR4.Remote.loginToServer(); $('#login-popup').popup('close');">
			<xsl:text>Sign in</xsl:text>
		</button>
	</div>

	<!-- Generate new char window -->
	<div data-role="popup" id="createchar-popup" data-transition="pop" data-position-to="window" class="ui-content">
		<h3 class="ui-title"><xsl:text>Enter a character name ...</xsl:text></h3>
		<input type="text" id="newchar-name-txtbx" value="" placeholder="Enter name ..."/>

		<a href="#" data-role="button" data-rel="back"
			onClick="SR4.Local.createChar($('#newchar-name-txtbx').val()); $('#newchar-name-txtbx').val('');">
			<xsl:text>Generate!</xsl:text>
		</a>
	</div>

	<!-- Rename -->
	<div data-role="popup" id="rename-popup" data-transition="pop" data-position-to="window" class="ui-content">
		<form>
			<h3 class="ui-title"><xsl:text>New Character Name:</xsl:text></h3>
			<input type="text" id="charname-txtbx" value="" placeholder="Enter name ..."/>

			<a href="#" data-role="button" data-rel="back" 
				onClick="SR4.Local.renameChar($('#charname-txtbx').val()); $('#charname-txtbx').val('');">
				<xsl:text>Rename</xsl:text>
			</a>
		</form>
	</div>
	
	<!-- Delete confirmation -->
	<div data-role="popup" id="delete-popup" data-transition="pop" data-position-to="window" class="ui-content" data-target="">
		<form>
			<h3 class="ui-title"><xsl:text>Are you sure you want to delete this character?</xsl:text></h3>

			<a href="#" data-role="button" data-rel="back"
				onClick="SR4.Local.removeCharByIndex($('#delete-popup').attr('data-target'));">
				<xsl:text>Delete</xsl:text>
			</a>

			<a href="#" data-role="button" data-rel="back">
				<xsl:text>Back</xsl:text>
			</a>
		</form>
	</div>

	<!-- Remote Delete confirmation -->
	<div data-role="popup" id="rem-delete-popup" data-transition="pop" data-position-to="window" class="ui-content" data-target="">
		<form>
			<h3 class="ui-title"><xsl:text>Are you sure you want to delete this character from the server?</xsl:text></h3>

			<a href="#" data-role="button" data-rel="back"
				onClick="SR4.Remote.removeCharByIndex($('#rem-delete-popup').attr('data-target'));">
				<xsl:text>Delete</xsl:text>
			</a>

			<a href="#" data-role="button" data-rel="back">
				<xsl:text>Back</xsl:text>
			</a>
		</form>
	</div>

</xsl:template>

</xsl:stylesheet>
