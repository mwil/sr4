<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0" xmlns="http://www.w3.org/1999/xhtml" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	
<!-- Templates for the condition monitor page -->

<xsl:template match="monitor">
	<h3 class="txtcenter"><xsl:text>Damage Tracks</xsl:text></h3>

	<form class="txtcenter">
	<fieldset data-role="controlgroup" data-type="horizontal" id="tworow-stun-cg">
		<a href="#" data-role="button" data-icon="minus" data-iconpos="left"
			onClick="Monitor.hitStun(-1);">
			<xsl:text>Dec</xsl:text>
		</a>
	    <a href="#" id="stun-monitor" data-role="button" style="width:220px;">
	    	<xsl:text>AUTOFILLED</xsl:text>
	    </a>
	    <a href="#" data-role="button" data-icon="plus" data-iconpos="right"
	    	onClick="Monitor.hitStun(1);">
	    	<xsl:text>Inc</xsl:text>
	    </a>
	</fieldset>
	
	<fieldset data-role="controlgroup" data-type="horizontal" id="tworow-phy-cg">
		<a href="#" data-role="button" data-icon="minus" data-iconpos="left"
			onClick="Monitor.hitPhy(-1);">
			<xsl:text>Dec</xsl:text>
		</a>
	    <a href="#" id="phy-monitor" data-role="button" style="width:220px;">
	    	<xsl:text>AUTOFILLED</xsl:text>
	    </a>
	    <a href="#" data-role="button" data-icon="plus" data-iconpos="right" 
	    	onClick="Monitor.hitPhy(1);">
	    	<xsl:text>Inc</xsl:text>
	    </a>
	</fieldset>

	<fieldset data-role="controlgroup" data-type="horizontal" id="tworow-misc-cg">
		<a href="#" data-role="button" data-icon="minus" data-iconpos="left"
			onClick="">
			<xsl:text>Dec</xsl:text>
		</a>
	    <a href="#" id="misc-monitor" data-role="button" style="width:220px;">
	    	<xsl:text>Misc. Modifiers (0)</xsl:text>
	    </a>
	    <a href="#" data-role="button" data-icon="plus" data-iconpos="right" 
	    	onClick="">
	    	<xsl:text>Inc</xsl:text>
	    </a>
	</fieldset>
	</form>

	<h3 class="txtcenter"><xsl:text>Combat Utilities</xsl:text></h3>

	<div data-role="collapsible" data-collapsed="false">
	    <h2><xsl:text>Combat</xsl:text></h2>

        <ul data-role="listview">
        	<li>
    			<a href="#" data-role="button" data-icon="refresh" id="roll-initiative" onClick="">
    				<xsl:text>Initiative Score</xsl:text>
    				<span class="ui-li-count med" id="currInitiative">12</span>
    			</a>
    		</li>
    	</ul>
    </div>

</xsl:template>

</xsl:stylesheet>
