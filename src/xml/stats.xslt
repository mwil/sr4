<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0" xmlns="http://www.w3.org/1999/xhtml" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<!-- Templates for the stats page -->

<xsl:template match="stats">
	<div data-role="collapsible-set" data-theme="c" data-content-theme="d" data-inset="true">
	    <div data-role="collapsible">
	        <h2><xsl:text>Attributes</xsl:text></h2>
	        <ul data-role="listview">
	            <li>
	            	<a href="#edge-popup" data-rel="popup" data-transition="pop" data-position-to="window">
	            	<xsl:text>Edge</xsl:text><span class="ui-li-count med" id="edge"></span>
	            	</a>
	        	</li>
	        </ul>
	    </div>
	</div>

	<div data-role="popup" id="edge-popup" class="ui-content">
	    <h3 id="edge-poptext"><xsl:text>New Edge value:</xsl:text></h3>
	    
	    <div data-role="controlgroup">
	    	<a href="#" data-role="button">1</a>
	    	<a href="#" data-role="button">2</a>
	    	<a href="#" data-role="button">3</a>
	    	<a href="#" data-role="button">4</a>
	    	<a href="#" data-role="button">5</a>
	    	<a href="#" data-role="button">6</a>
	    	<a href="#" data-role="button">7</a>
	    	<a href="#" data-role="button">8</a>
	    	<a href="#" data-role="button">9</a>
	    	<a href="#" data-role="button">10</a>
	    	<a href="#" data-role="button">Even more ...</a>
		</div>
	</div>
</xsl:template>

</xsl:stylesheet>
