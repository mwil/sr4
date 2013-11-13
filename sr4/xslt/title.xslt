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
    	<h2><xsl:text>&#160;&#160;Switch Characters</xsl:text></h2> <!-- FIXME: hack to center, but ok -->
    	<ul data-role="listview" id="loadchar-lv"></ul>
    </div>
    <!-- -->

	<a href="#rename-popup" data-rel="popup"
		data-role="button" data-icon="edit" data-iconpos="right" class="ui-disabled nochar-disabled">
		<xsl:text>Rename Character</xsl:text>
	</a>

	<a href="#delete-popup" data-rel="popup" onClick="SR4.Local.removeChar();"
		data-role="button" data-icon="delete" data-iconpos="right" class="ui-disabled nochar-disabled">
		<xsl:text>Remove Character</xsl:text>
	</a>

	<div data-role="collapsible" data-collapsed-icon="refresh" data-expanded-icon="delete" data-iconpos="right"
		class="center-collap" id="rem-server-collap">
		<h2>Connect to Server</h2>

		<a href="#" data-role="button" data-icon="check" data-iconpos="right" onClick="SR4.Remote.pushChar();"
			class="ui-disabled nochar-disabled" id="rem-server-a">
			<xsl:text>Push Character (Server)</xsl:text>
		</a>

		<!-- Character load chooser -->
		<div data-role="collapsible" data-collapsed-icon="refresh" data-iconpos="right" data-expanded-icon="delete"
			id="rem-lc-collap" class="center-collap">
	    	<h2><xsl:text>&#160;&#160;Fetch Character (Server)</xsl:text></h2> <!-- FIXME: hack to center, but ok -->
	    	<ul data-role="listview" id="rem-loadchar-lv"></ul>
	    </div>

		<a href="#" data-role="button" data-icon="delete" data-iconpos="right" class="ui-disabled nochar-disabled"
			onClick="SR4.Remote.removeChar();">
			<xsl:text>Remove Character (Server)</xsl:text>
		</a>
	</div>

	<!-- The POPUPS -->

	<!-- Notifications from remote server interaction -->
	<div data-role="popup" id="remote-status-popup" class="ui-content">
	    <h3><xsl:text>AUTOFILLED</xsl:text></h3>
	</div>

	<!-- Get Username / Groupname / Password / ... -->
	<div data-role="popup" id="login-popup" class="ui-content">
		<h3><xsl:text>Enter your data ...</xsl:text></h3>
	</div>

    <!-- Generate new char window -->
	<div data-role="popup" id="createchar-popup" data-transition="pop" data-position-to="window" class="ui-content">
    	<h3 class="ui-title"><xsl:text>Enter a character name ...</xsl:text></h3>
    	<input type="text" id="newchar-name-txtbx" value="" placeholder="Enter name ..."/>

	    <a href="#" data-role="button" data-rel="back"
	    	onClick="SR4.Local.createChar($('#newchar-name-txtbx').val()); $('#newchar-name-txtbx').val('')">
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
	
</xsl:template>

</xsl:stylesheet>
