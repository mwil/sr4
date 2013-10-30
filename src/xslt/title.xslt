<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0" xmlns="http://www.w3.org/1999/xhtml" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<!-- Templates for the title (portal) page -->

<xsl:template match="title">
	<h1 class="centerhead charName"><xsl:text>No Char found!</xsl:text></h1>
	
	<a href="#createchar-popup" data-rel="popup" data-transition="pop" data-position-to="window"
		data-role="button" data-icon="arrow-r" data-iconpos="right"> 
		<xsl:text>New Character</xsl:text>
	</a>

	<!-- Character load chooser -->
	<div data-role="collapsible" data-theme="c" data-content-theme="c" data-iconpos="right" 
		id="loadchar-container" data-inline="false" class="ui-disabled nochar-disabled">
    	<h2><xsl:text>&#160;&#160;Load Character</xsl:text></h2> <!-- FIXME: hack to center, but ok -->
    	<ul data-role="listview" id="loadchar-lv"></ul>
    </div>
    <!-- -->

	<a href="#rename-popup" data-rel="popup" data-transition="pop" data-position-to="window"
		data-role="button" data-icon="arrow-r" data-iconpos="right" class="ui-disabled nochar-disabled">
		<xsl:text>Rename Character</xsl:text>
	</a>

	<a href="#delete-popup" data-rel="popup" data-transition="pop" data-position-to="window"
		onClick="SR4.removeChar();"
		data-role="button" data-icon="arrow-r" data-iconpos="right" class="ui-disabled nochar-disabled">
		<xsl:text>Remove Character</xsl:text>
	</a>

	<a href="#" data-role="button" data-icon="arrow-r" data-iconpos="right">
		<xsl:attribute name="onClick">
			if (SR4.currChar) {$.post('../cgi-bin/sr4.py', {mode: 'push', char: JSON.stringify(SR4.currChar), charname: SR4.currChar.charName}, function(data) {});}
		</xsl:attribute>
		<xsl:text>Push to Server</xsl:text>
	</a>

	<a href="#" data-role="button" data-icon="arrow-r" data-iconpos="right">
		<xsl:attribute name="onClick">
			$.post('../cgi-bin/sr4.py', {mode: 'pull'}, function(data) {SR4.currChar=JSON.parse(data); SR4.refreshTitlePage();});
		</xsl:attribute>
		<xsl:text>Pull from Server</xsl:text>
	</a>

	<!-- The POPUPS -->


    <!-- Generate new char window -->
	<div data-role="popup" id="createchar-popup" data-theme="c">
    	<h3 class="ui-title">Enter a character name ...</h3>
    	<input type="text" id="newchar-name-txtbx" value="" placeholder="Enter name ..."/>

	    <a href="#" data-role="button" data-rel="back"
	    	onClick="SR4.createChar($('#newchar-name-txtbx').val()); $('#newchar-name-txtbx').val('')">
	    	<xsl:text>Generate!</xsl:text>
	    </a>
    </div>

    <div data-role="popup" id="rename-popup">
		<form>
			<h3 class="ui-title"><xsl:text>New Character Name:</xsl:text></h3>
     		<input type="text" id="charname-txtbx" value="" placeholder="Enter name ..."/>

		    <a href="#" data-role="button" data-rel="back" 
		    	onClick="SR4.renameChar($('#charname-txtbx').val()); $('#charname-txtbx').val('');">
		    	<xsl:text>Rename</xsl:text>
		    </a>
		</form>
	</div>
	
</xsl:template>

</xsl:stylesheet>
