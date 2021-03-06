<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0" xmlns="http://www.w3.org/1999/xhtml" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<!-- Templates for the title (portal) page -->

<xsl:template match="title">
	<h1 class="txtcenter charName"><xsl:text>No Char found!</xsl:text></h1>
	
	<a href="#createchar-popup" data-role="button" data-icon="gear" data-iconpos="right" id="createchar-popup-btn"
		data-rel="popup" data-transition="pop" data-position-to="window"> 
		<xsl:text>New Character</xsl:text>
	</a>

	<!-- Character load chooser -->
	<div data-role="collapsible" data-iconpos="right"  data-collapsed-icon="arrow-d" data-expanded-icon="arrow-u"
		id="loadchar-container" class="center-collap ui-disabled nochar-disabled">
		<h2><xsl:text>&#160;&#160;Browse Local Characters</xsl:text></h2> <!-- FIXME: hack to center, but ok -->
		<ul data-role="listview" id="loadchar-lv" data-split-icon="delete" data-split-theme="c"></ul>
	</div>
	<!-- -->

	<a href="#rename-popup" data-rel="popup" id="rename-popup-btn" data-role="button" data-icon="edit" data-iconpos="right" class="ui-disabled nochar-disabled">
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

		<a href="#" data-role="button" data-icon="check" data-iconpos="right" id="rem-push-btn" class="ui-disabled nochar-disabled">
			<xsl:text>Push Character to Server</xsl:text>
		</a>
	</div>


	<!-- The POPUPS -->

	<!-- Notifications from remote server interaction Popup -->
	<div data-role="popup" id="remote-status-popup" class="ui-content">
		<h3><xsl:text>Loading ...</xsl:text></h3>
	</div>

	<!-- Get Username / Groupname / Password / ... Popup -->
	<div data-role="popup" id="login-popup" data-transition="pop" data-position-to="window" class="ui-content">
		<h3><xsl:text>Enter your username:</xsl:text></h3>

		<form>
			<input type="text" id="rem-user-txtbx" value="" placeholder="Enter name ..." data-clear-btn="true"/>
			<input type="text" id="rem-pass-txtbx" value="" placeholder="Password" disabled="disabled"/>

			<button type="button" data-theme="b" data-icon="check" data-iconpos="right" id="login-submit-btn">
				<xsl:text>Sign in</xsl:text>
			</button>
		</form>
	</div>

	<!-- Generate new char popup -->
	<div data-role="popup" id="createchar-popup" data-transition="pop" data-position-to="window" class="ui-content">
		<h3 class="ui-title"><xsl:text>Enter a character name ...</xsl:text></h3>
		
		<form>
			<input type="text" id="newchar-name-txtbx" value="" placeholder="Enter name ..."/>
			<button type="button" id="local-newchar-ok-btn"><xsl:text>Generate!</xsl:text></button>
		</form>
	</div>

	<!-- Rename Popup -->
	<div data-role="popup" id="rename-popup" data-transition="pop" data-position-to="window" class="ui-content">
		<h3 class="ui-title"><xsl:text>New Character Name:</xsl:text></h3>

		<p><xsl:text>Warning: renaming detaches the character from the server!</xsl:text></p>
	
		<form>	
			<input type="text" id="rename-txtbx" value="" placeholder="Enter name ..." tabindex="1"/>
			<button type="button" id="local-rename-ok-btn" tabindex="2"><xsl:text>Rename</xsl:text></button>
		</form>
	</div>
	
	<!-- Delete confirmation Popup -->
	<div data-role="popup" id="delete-popup" data-transition="pop" data-position-to="window" class="ui-content" data-target="">
		<h3 class="ui-title"><xsl:text>Are you sure you want to delete this character?</xsl:text></h3>
		
		<form>
			<button type="button" id="local-delete-ok-btn"><xsl:text>Delete</xsl:text></button>
			<button type="reset"><xsl:text>Back</xsl:text></button>
		</form>
	</div>

	<!-- Remote Delete confirmation Popup -->
	<div data-role="popup" id="rem-delete-popup" data-transition="pop" data-position-to="window" class="ui-content" data-target="">
		<h3 class="ui-title"><xsl:text>Are you sure you want to delete this character from the server?</xsl:text></h3>

		<form>
			<button type="button" id="rem-delete-ok-btn"><xsl:text>Delete</xsl:text></button>
			<button type="reset"><xsl:text>Back</xsl:text></button>
		</form>
	</div>

</xsl:template>

</xsl:stylesheet>
