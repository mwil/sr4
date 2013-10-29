<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0" xmlns="http://www.w3.org/1999/xhtml" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<!-- Templates for the stats page -->

<xsl:template match="stats">
	<!-- autogen the stats list from the <attribs> element tree in sr4.xml -->
	<div data-role="collapsible-set" data-theme="c" data-content-theme="d" data-inset="true">
	    <div data-role="collapsible">
	        <h2><xsl:text>Attributes</xsl:text></h2>
	        <ul data-role="listview">
	        	<xsl:for-each select="/app/attribs/attr">
		            <li>
		            	<a href="#stats-popup" data-rel="popup" data-transition="pop" data-position-to="window" 
		            		onClick="SR4.updateStatsPopup('{name}', 'Attrib_{id}', SR4.currChar.stats['Attrib_{id}']);">
		            		<xsl:value-of select="name"/>
		            		<span class="ui-li-count med" id="Attrib_{id}"></span>
		            	</a>
		            </li>
		        </xsl:for-each>
	        </ul>
	        <!-- TODO: add more collapsibles from skills data, possible from the Chummer xml files -->
	    </div>
	</div>

	<!-- the popup to change character stats values, it is reused and automatically filled refreshed by SR4.updateStatsPopup.js -->
	<div data-role="popup" id="stats-popup" class="ui-content">
	    <h3 id="stats-poptext" class="ui-title"><xsl:text>New AUTOFILLED value:</xsl:text></h3>
		
		<form>
			<div class="ui-grid-a">
		    	<div class="ui-block-a" style="width:280px;">
		    		<input type="range" id="stats-slider" data-highlight="true" min="0" max="9" value="7" stat-target="autofilled"/>
		    	</div>
		    	<div class="ui-block-b" style="width:120px;">
		    		<a href="#" data-role="button" data-icon="plus" data-iconpos="left"
		    			onClick="$('#stats-slider').attr('max', $('#stats-slider').attr('max')+5).slider('refresh');">
		    			<xsl:text>Max</xsl:text>
		    		</a>
		    	</div>
			</div>

		    <a href="#" data-role="button" data-rel="back"
		    	onClick="SR4.currChar.updateStat($('#stats-slider').attr('stat-target'), $('#stats-slider').val()); SR4.refreshStatsPage();">
		    	<xsl:text>Set</xsl:text>
		    </a>
		</form>
	</div>
</xsl:template>

</xsl:stylesheet>
