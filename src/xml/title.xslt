<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0" xmlns="http://www.w3.org/1999/xhtml" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<!-- Templates for the title (portal) page -->

<xsl:template match="title">
	<h1 class="centerhead charname"><xsl:text>No Char found!</xsl:text></h1>
	<div data-role="controlgroup">
		<a href="#newchar-popup" data-rel="popup" data-transition="pop" data-position-to="window"
			data-role="button" data-icon="arrow-r" data-iconpos="right"> 
			<xsl:text>New Character</xsl:text>
		</a>
		<a href="#rename-popup" data-rel="popup" data-transition="pop" data-position-to="window"
			data-role="button" data-icon="arrow-r" data-iconpos="right">
			<xsl:text>Rename Character</xsl:text>
		</a>
	</div>

	<!-- Character load chooser -->
	<div data-role="collapsible" data-theme="c" data-content-theme="c" data-iconpos="right"  data-inline="false">
    	<h2><xsl:text>Load Character</xsl:text></h2>
    	<ul data-role="listview">
        	<li>
        		<a href="#" class="charname"></a>
        	</li>
    	</ul>
    </div>
    <!-- -->

    <!-- Generate new char window -->
    <!-- Also appears when __lastchar__ is not set (called from Stats.init.js) -->
	<div data-role="popup" id="newchar-dialog" data-overlay-theme="c" data-theme="c" data-dismissible="false">
    	<div data-role="header" data-theme="c" class="ui-corner-top">
        	<h1>New Character</h1>
    	</div>
    
    	<div data-role="content" data-theme="c" class="ui-corner-bottom ui-content">
        	<h3 class="ui-title">Enter a character name ...</h3>
        	<input type="text" id="newchar-txtbx" value="" placeholder="Enter name ..."/>

		    <a href="#" data-role="button" data-rel="back"
		    	onClick="Stats.renameChar($('#newchar-txtbx').val());">
		    	<xsl:text>Generate</xsl:text>
		    </a>
    	</div>
	</div>

    <div data-role="popup" id="rename-popup">
		<form>
			<h3 class="ui-title"><xsl:text>New Character Name:</xsl:text></h3>
     		<input type="text" id="charname-txtbx" value="" placeholder="Enter name ..."/>

		    <a href="#" data-role="button" data-rel="back" 
		    	onClick="Stats.renameChar($('#charname-txtbx').val()); $('#charname-txtbx').val('');">
		    	<xsl:text>Set</xsl:text>
		    </a>
		</form>
	</div>
	 <div data-role="popup" id="newchar-popup">
			<h3><xsl:text>Currently not implemented.</xsl:text></h3>
	</div>

	<a href="#done-popup" data-role="button" data-icon="arrow-r" data-iconpos="right" data-rel="popup" 
	  	data-transition="pop" data-position-to="window"
	  	onClick="localStorage.clear();">

		<xsl:text>DEBUG: Clear localStorage</xsl:text></a>
	<div data-role="popup" id="done-popup">
		<h3><xsl:text>Done.</xsl:text></h3>
	</div>
	
</xsl:template>

</xsl:stylesheet>
