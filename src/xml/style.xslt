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

<!-- copy over unknown elements -->
<xsl:template match="a">
    <xsl:copy>
        <xsl:apply-templates select="@*|node()"/>
    </xsl:copy>
</xsl:template>

<xsl:template match="page">
	<xsl:element name="div">
		<xsl:attribute name="data-role">page</xsl:attribute>
        <xsl:attribute name="id"><xsl:value-of select="@id"/></xsl:attribute>
    
		<xsl:copy-of select="document('jQheader.xml')/*"/>

		<div data-role="content">
			<h3><xsl:text>I love candy!</xsl:text></h3>
			<xsl:apply-templates select="a"/>
		</div>
	</xsl:element>
</xsl:template>

</xsl:stylesheet>