<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0" xmlns="http://www.w3.org/1999/xhtml" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html" indent="yes"/>

<!-- Page-specific code is now in separate files -->
<xsl:include href="stats.xslt"/>
<xsl:include href="dice.xslt"/>


<!-- Root template, generate HTML header and body -->
<xsl:template match="/">
	<xsl:text disable-output-escaping='yes'>&lt;!DOCTYPE html></xsl:text>
	<html>

	<!-- the HTML header is kept in a separate file -->
	<xsl:copy-of select="document('htmlheader.xml')/*"/>

	<body>
		<xsl:apply-templates/>
	</body>

	</html>
</xsl:template>


<!-- generic page markup -->
<xsl:template match="page">
	<div data-role="page" id="{@id}">
		<xsl:copy-of select="document('panel.xml')/*"/>

		<div data-role="header" id="theheader" data-position="fixed" data-theme="b">
			<h1><xsl:text>Shadowrun 4 App</xsl:text></h1>
			<a href="#mypanel" data-icon="bars"><xsl:text>Nav</xsl:text></a>
			<a href="#" data-rel="back" data-iconpos="right" data-icon="arrow-l"><xsl:text>Back</xsl:text></a>
		</div><!-- /header -->

		<!-- <xsl:copy-of select="document('jQheader.xml')/*"/> -->

		<div data-role="content">
			<xsl:apply-templates/>
		</div>
	</div>
</xsl:template>



<!-- Markup elements that should not appear later ... -->

<!-- copy over a elements verbatim -->
<xsl:template match="a|p">
    <xsl:copy-of select="."/>
</xsl:template>

<xsl:template match="chummer/*"/>

</xsl:stylesheet>
