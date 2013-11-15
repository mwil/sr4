<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0" xmlns="http://www.w3.org/1999/xhtml" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	
<!-- Templates for the condition monitor page -->

<xsl:template match="monitor">
	<h3 class="txtcenter"><xsl:text>Damage Monitors</xsl:text></h3>

	<form class="txtcenter fullwidth">
	<fieldset data-role="controlgroup" data-type="horizontal" id="tworow-stun-cg">
		<a href="#" data-role="button" data-icon="minus" data-iconpos="left" class="btn-out"
			onClick="Monitor.hitStun(-1);">
		</a>
	    <a href="#" id="stun-monitor" data-role="button" class="btn-in">
	    	<xsl:text>AUTOFILLED</xsl:text>
	    </a>
	    <a href="#" data-role="button" data-icon="plus" data-iconpos="right" class="btn-out"
	    	onClick="Monitor.hitStun(1);">
	    </a>
	</fieldset>
	
	<fieldset data-role="controlgroup" data-type="horizontal" id="tworow-phy-cg">
		<a href="#" data-role="button" data-icon="minus" data-iconpos="left" class="btn-out"
			onClick="Monitor.hitPhy(-1);">
		</a>
	    <a href="#" id="phy-monitor" data-role="button" class="btn-in">
	    	<xsl:text>AUTOFILLED</xsl:text>
	    </a>
	    <a href="#" data-role="button" data-icon="plus" data-iconpos="right" class="btn-out"
	    	onClick="Monitor.hitPhy(1);">
	    </a>
	</fieldset>

	<fieldset data-role="controlgroup" data-type="horizontal" id="tworow-misc-cg">
		<a href="#" data-role="button" data-icon="minus" data-iconpos="left" class="btn-out"
			onClick="Monitor.incMisc(-1);">
		</a>
	    <a href="#" id="misc-monitor" data-role="button" class="btn-in">
	    	<xsl:text>AUTOFILLED</xsl:text>
	    </a>
	    <a href="#" data-role="button" data-icon="plus" data-iconpos="right" class="btn-out"
	    	onClick="Monitor.incMisc(1);">
	    </a>
	</fieldset>
	</form>

	<h3 class="txtcenter"><xsl:text>Combat Utilities</xsl:text></h3>

	<div data-role="collapsible" data-collapsed="false">
	    <h2><xsl:text>Combat Test Quicklinks</xsl:text></h2>

        <ul data-role="listview">
        	<li data-icon="refresh">
    			<a href="#" id="roll-initiative" stat_a="Attrib_REA" stat_b="Attrib_INT" offset="8"
    				onClick="$('#currInitiative').html(Test.asString('Attrib_REA', 'Attrib_INT', SR4.currChar.stats['Attrib_REA'] + SR4.currChar.stats['Attrib_INT']));">
    				<xsl:text>Roll Initiative </xsl:text>
    				<span class="test-label info"><xsl:text>(x dice)</xsl:text></span>
    				<span class="ui-li-count med test-res" id="currInitiative">--</span>
    			</a>
    		</li>
    	</ul>
    </div>

</xsl:template>

</xsl:stylesheet>
