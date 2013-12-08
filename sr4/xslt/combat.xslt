<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0" xmlns="http://www.w3.org/1999/xhtml" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	
<!-- Templates for the combat and condition monitoring page -->

<xsl:template match="combat">
	<h3 class="txtcenter nosel"><xsl:text>Damage Monitors</xsl:text></h3>

	<form class="txtcenter fullwidth nosel">
	<fieldset data-role="controlgroup" data-type="horizontal" id="tworow-stun-cg">
		<a href="#" data-role="button" data-icon="minus" data-iconpos="left" data-target="Stun" data-value="-1" class="btn-out monitor-btn"></a>
		<a href="#" id="stun-monitor" data-role="button" data-target="Stun" data-value="0" class="btn-in monitor-btn">
			<xsl:text>Loading ...</xsl:text>
		</a>
		<a href="#" data-role="button" data-icon="plus" data-iconpos="right" data-target="Stun" data-value="1" class="btn-out monitor-btn"></a>
	</fieldset>
	
	<fieldset data-role="controlgroup" data-type="horizontal" id="tworow-phy-cg">
		<a href="#" data-role="button" data-icon="minus" data-iconpos="left" data-target="Phy" data-value="-1" class="btn-out monitor-btn"></a>
		<a href="#" id="phy-monitor" data-role="button" data-target="Phy" data-value="0" class="btn-in monitor-btn">
			<xsl:text>Loading ...</xsl:text>
		</a>
		<a href="#" data-role="button" data-icon="plus" data-iconpos="right" data-target="Phy" data-value="1" class="btn-out monitor-btn"></a>
	</fieldset>

	<fieldset data-role="controlgroup" data-type="horizontal" id="tworow-misc-cg">
		<a href="#" data-role="button" data-icon="minus" data-iconpos="left" data-target="Misc" data-value="-1" class="btn-out monitor-btn"></a>
		<a href="#" id="misc-monitor" data-role="button" data-target="Misc" data-value="0" class="btn-in monitor-btn">
			<xsl:text>Loading ...</xsl:text>
		</a>
		<a href="#" data-role="button" data-icon="plus" data-iconpos="right" data-target="Misc" data-value="1" class="btn-out monitor-btn"></a>
	</fieldset>
	</form>

	<h3 class="txtcenter"><xsl:text>Combat Utilities</xsl:text></h3>

	<div data-role="collapsible" data-collapsed="false" class="nosel">
		<h2><xsl:text>Combat Test Quicklinks</xsl:text></h2>

		<ul data-role="listview">
			<li data-icon="refresh">
				<a href="#" id="roll-initiative" data-stat_a="Attrib_REA" data-stat_b="Attrib_INT" data-offset="8"
					onClick="$('#curr-Initiative').html(Test.asString('Attrib_REA', 'Attrib_INT', SR4.currChar.stats.Attrib_REA + SR4.currChar.stats.Attrib_INT));">
					<xsl:text>Roll Initiative </xsl:text>
					<span class="test-label info"><xsl:text>(0 dice)</xsl:text></span>
					<span class="ui-li-count test-res" id="curr-Initiative">--</span>
				</a>
			</li>
		</ul>
	</div>

</xsl:template>

</xsl:stylesheet>
