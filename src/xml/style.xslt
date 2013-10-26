<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0" xmlns="http://www.w3.org/1999/xhtml" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html" indent="yes"/>

<xsl:include href="stats.xslt"/>

<xsl:template match="/">
	<xsl:text disable-output-escaping='yes'>&lt;!DOCTYPE html></xsl:text>
	<html>

	<xsl:copy-of select="document('htmlheader.xml')/*"/>

	<body>
		<xsl:apply-templates/>
	</body>

	</html>
</xsl:template>

<!-- copy over a elements verbatim -->
<xsl:template match="a">
    <xsl:copy-of select="."/>
</xsl:template>

<!-- generic page markup -->
<xsl:template match="page">
	<div data-role="page" id="{@id}">
		<xsl:copy-of select="document('jQheader.xml')/*"/>

		<div data-role="content">
			<xsl:apply-templates/>
		</div>
	</div>
</xsl:template>

<xsl:template match="stats">
	<div data-role="collapsible-set" data-theme="c" data-content-theme="d" data-inset="true">
	    <div data-role="collapsible">
	        <h2><xsl:text>Attributes</xsl:text></h2>
	        <ul data-role="listview">
	            <li><a href="#edge-popup" data-rel="popup" data-transition="pop" data-position-to="window"><xsl:text>Edge</xsl:text><span class="ui-li-count med" id="edge"></span></a></li>
	        </ul>
	    </div>
	</div>

	<div data-role="popup" id="edge-popup" class="ui-content">
	    <p id="edge-poptext"><xsl:text>Set a new Edge value ...</xsl:text></p>
	    <form>
			<div data-role="fieldcontain">
			    <label for="select-native-1">Basic:</label>
			    <select name="select-native-1" id="select-native-1">
			        <option value="1">The 1st Option</option>
			        <option value="2">The 2nd Option</option>
			        <option value="3">The 3rd Option</option>
			        <option value="4">The 4th Option</option>
			    </select>
			</div>
			</form>
	</div>
</xsl:template>

</xsl:stylesheet>
