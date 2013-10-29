<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0" xmlns="http://www.w3.org/1999/xhtml" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<!-- Templates for the title (portal) page -->

<xsl:template match="monitor">
	<h3 class="txtcenter"><xsl:text>Stun Monitor</xsl:text></h3>

	<form class="txtcenter">
	<fieldset data-role="controlgroup" data-type="horizontal">
		<a href="#" data-role="button" data-icon="minus" data-iconpos="left">Heal</a>
	    <a href="#" id="stun-monitor" data-role="button" style="width:160px;">AUTOFILLED</a>
	    <a href="#" data-role="button" data-icon="plus" data-iconpos="right">Hit</a>
	</fieldset>
	</form>

	<h3 class="txtcenter"><xsl:text>Physical Monitor</xsl:text></h3>
	<form class="txtcenter">
	<fieldset data-role="controlgroup" data-type="horizontal">
		<a href="#" data-role="button" data-icon="minus" data-iconpos="left">Heal</a>
	    <a href="#" id="phy-monitor" data-role="button" style="width:160px;">AUTOFILLED</a>
	    <a href="#" data-role="button" data-icon="plus" data-iconpos="right">Hit</a>
	</fieldset>
	</form>

</xsl:template>

</xsl:stylesheet>
