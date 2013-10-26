<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0" xmlns="http://www.w3.org/1999/xhtml" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<!-- Templates for the stats page -->

<xsl:template match="stats">
	<div data-role="collapsible-set" data-theme="c" data-content-theme="d" data-inset="true">
	    <div data-role="collapsible">
	        <h2><xsl:text>Attributes</xsl:text></h2>
	        <ul data-role="listview">
	            <li>
	            	<a href="#stats-popup" data-rel="popup" data-transition="pop" data-position-to="window" 
	            		onClick="Stats.updatePopup('Body', 'Attrib_BOD', Stats.Attrib_BOD);">
	            		<xsl:text>Body</xsl:text>
	            		<span class="ui-li-count med" id="Attrib_BOD"></span>
	            	</a>
	        	</li>
	            <li>
	            	<a href="#stats-popup" data-rel="popup" data-transition="pop" data-position-to="window" 
	            		onClick="Stats.updatePopup('Edge', 'Attrib_EDG', Stats.Attrib_EDG);">
	            		<xsl:text>Edge</xsl:text>
	            		<span class="ui-li-count med" id="Attrib_EDG"></span>
	            	</a>
	            </li>
	        </ul>
	    </div>
	</div>

	<div data-role="popup" id="stats-popup" class="ui-content">
	    <h3 id="stats-poptext" class="poplabel"><xsl:text>New FIXME value:</xsl:text></h3>
		
		<form style="width:360px;">
		    <input type="range" id="stats-slider" data-highlight="true" min="1" max="8" value="7"/>
		    <a href="#" data-role="button" data-rel="back" stat-target="invalid"
		    	onClick="Stats.update($('#stats-slider').attr('stat-target'), $('#stats-slider').val());">
		    	<xsl:text>Set</xsl:text>
		    </a>
		</form>
	</div>
</xsl:template>

</xsl:stylesheet>
