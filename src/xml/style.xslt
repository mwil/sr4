<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns="http://www.w3.org/1999/xhtml" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:output method="html" indent="yes"/>

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
	<xsl:element name="div">
		<xsl:attribute name="data-role">page</xsl:attribute>
        <xsl:attribute name="id"><xsl:value-of select="@id"/></xsl:attribute>
    
		<xsl:copy-of select="document('jQheader.xml')/*"/>

		<div data-role="content">
			<h3><xsl:text>I love candy! 3</xsl:text></h3>
			<xsl:apply-templates/>
		</div>
	</xsl:element>
</xsl:template>

<!-- on dice page: checkbox for dice modes -->
<xsl:template match="dicemode-cb">
	<form>
	<fieldset data-role="controlgroup" data-type="horizontal">
	    <input type="checkbox" name="dicemode-cb-sort" id="dicemode-cb-sort"/>
	    <label for="dicemode-cb-sort" style="width:160px;">Sort</label>
	    <input type="checkbox" name="dicemode-cb-edge" id="dicemode-cb-edge"/>
	    <label for="dicemode-cb-edge" style="width:160px;">Edge</label>
	</fieldset>
	</form>
</xsl:template>

</xsl:stylesheet>