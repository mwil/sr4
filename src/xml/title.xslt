<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0" xmlns="http://www.w3.org/1999/xhtml" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<!-- Templates for the title (portal) page -->

<xsl:template match="title">
	<h1 class="centerhead charname"><xsl:text>AUTOFILL</xsl:text></h1>
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
        		<a href="#" class="charname"><xsl:text>AUTOFILL</xsl:text></a>
        	</li>
    	</ul>
    </div>
    <!-- -->

    <div data-role="popup" id="rename-popup">
		<form>
			<h3><xsl:text>New Character Name:</xsl:text></h3>
     		<input type="text" id="charname-txtbx" value="" placeholder="Enter name ..."/>

		    <a href="#" data-role="button" data-rel="back" onClick="Stats.renameChar($('#charname-txtbx').val()); $('#charname-txtbx').val('');">
		    	<xsl:text>Set</xsl:text>
		    </a>
		</form>
	</div>
	 <div data-role="popup" id="newchar-popup">
			<h3><xsl:text>Currently not implemented.</xsl:text></h3>
	</div>
	
</xsl:template>

</xsl:stylesheet>
