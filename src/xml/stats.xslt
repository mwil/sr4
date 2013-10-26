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
	    <h2 id="edge-poptext"><xsl:text>New Edge value:</xsl:text></h2>
	    <form>
			<div data-role="fieldcontain">
			    <select name="select-native-1" id="select-native-1" onChange="alert('ja.'); Stats.update('edge', 5);">
			        <option value="0">0</option>
			        <option value="1">1</option>
			        <option value="2">2</option>
			        <option value="3">3</option>
			        <option value="4">4</option>
			        <option value="5">5</option>
			        <option value="6">6</option>
			        <option value="7">7</option>
			    </select>
			</div>
			</form>
	</div>
</xsl:template>

</xsl:stylesheet>
