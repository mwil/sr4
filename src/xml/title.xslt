<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0" xmlns="http://www.w3.org/1999/xhtml" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<!-- Templates for the title (portal) page -->

<xsl:template match="title">
	<h1 class="centerhead charName"><xsl:text>No Char found!</xsl:text></h1>
	
	<a href="#newchar-dialog" data-rel="popup" data-transition="pop" data-position-to="window"
		data-role="button" data-icon="arrow-r" data-iconpos="right"> 
		<xsl:text>New Character</xsl:text>
	</a>

	<!-- Character load chooser -->
	<div data-role="collapsible" data-theme="c" data-content-theme="c" data-iconpos="right" id="loadchar-container" 
		data-inline="false" class="ui-disabled">
    	<h2><xsl:text>Load Character</xsl:text></h2>
    	<ul data-role="listview" id="loadchar-lv">
    	</ul>
    </div>
    <!-- -->

	<a href="#rename-popup" data-rel="popup" data-transition="pop" data-position-to="window"
		data-role="button" data-icon="arrow-r" data-iconpos="right" class="ui-disabled nochar-disabled">
		<xsl:text>Rename Character</xsl:text>
	</a>

    <!-- Generate new char window -->
	<div data-role="popup" id="newchar-dialog" data-theme="c">
    	<h3 class="ui-title">Enter a character name ...</h3>
    	<input type="text" id="newchar-name-txtbx" value="" placeholder="Enter name ..."/>

	    <a href="#" data-role="button" data-rel="back"
	    	onClick="App.createChar($('#newchar-name-txtbx').val()); $('#newchar-name-txtbx').val('')">
	    	<xsl:text>Generate!</xsl:text>
	    </a>
    </div>
	

    <div data-role="popup" id="rename-popup">
		<form>
			<h3 class="ui-title"><xsl:text>New Character Name:</xsl:text></h3>
     		<input type="text" id="charname-txtbx" value="" placeholder="Enter name ..."/>

		    <a href="#" data-role="button" data-rel="back" 
		    	onClick="App.currChar.renameChar($('#charname-txtbx').val()); $('#charname-txtbx').val('');">
		    	<xsl:text>Rename</xsl:text>
		    </a>
		</form>
	</div>

	<a href="#done-popup" data-role="button" data-icon="arrow-r" data-iconpos="right" data-rel="popup" 
	  	data-transition="pop" data-position-to="window"
	  	onClick="console.log(localStorage);">
		<xsl:text>DEBUG: Print localStorage</xsl:text>
	</a>
	<a href="#done-popup" data-role="button" data-icon="arrow-r" data-iconpos="right" data-rel="popup" 
	  	data-transition="pop" data-position-to="window"
	  	onClick="localStorage.clear();">
		<xsl:text>DEBUG: Clear localStorage</xsl:text>
	</a>
	<div data-role="popup" id="done-popup">
		<h3><xsl:text>Done.</xsl:text></h3>
	</div>
	
</xsl:template>

</xsl:stylesheet>
