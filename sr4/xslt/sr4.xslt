<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0" xmlns="http://www.w3.org/1999/xhtml" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html" indent="yes"/>

<!-- Page-specific code is now in separate files -->
<xsl:include href="title.xslt"/>
<xsl:include href="dice.xslt"/>
<xsl:include href="stats.xslt"/>
<xsl:include href="monitor.xslt"/>
<xsl:include href="tests.xslt"/>


<!-- Root template, generate HTML header and body -->
<xsl:template match="/">
	<xsl:text disable-output-escaping='yes'>&lt;!DOCTYPE html></xsl:text>
	<html>

	<!-- the HTML header is kept in a separate file -->
	<xsl:copy-of select="document('../xml/htmlheader.xml')/*"/>

	<body>
		<xsl:apply-templates/>
	</body>

	</html>
</xsl:template>


<!-- generic page markup -->
<xsl:template match="page">
	<div data-role="page" id="{@id}" data-prev="{@prev}" data-next="{@next}" data-theme="c" data-content-theme="c" class="nosel">
		<xsl:copy-of select="document('../xml/panel.xml')/*"/>

		<div data-role="header" id="theheader" data-position="fixed" data-theme="b">
			<h1><xsl:text>SR4.Datajack</xsl:text></h1>
			<a href="#mypanel" data-icon="bars" class="ui-disabled nochar-disabled"><xsl:text>Nav</xsl:text></a>
			<a href="#" data-iconpos="right" data-icon="refresh" class="header-sync-btn ui-disabled remote-disabled" data-target=""
				onClick="SR4.Remote.doSyncChar($('.header-sync-btn').data('target'));">
				<xsl:text>Sync</xsl:text>
			</a>
		</div><!-- /header -->

		<div data-role="content">
			<xsl:apply-templates/>
		</div>

		<div data-role="footer" data-id="myfoot" data-position="fixed" data-theme="b">
			<div data-role="navbar">
				<ul>
					<li><a href="#title"><xsl:text>Chars</xsl:text></a></li>
					<li><a href="#stats"   class="ui-disabled nochar-disabled"><xsl:text>Stats</xsl:text></a></li>
					<li><a href="#tests"   class="ui-disabled nochar-disabled"><xsl:text>Tests</xsl:text></a></li>
					<li><a href="#dice"    class="ui-disabled nochar-disabled"><xsl:text>Dicer</xsl:text></a></li>
					<li><a href="#monitor" class="ui-disabled nochar-disabled"><xsl:text>Monitor</xsl:text></a></li>
				</ul>
			</div><!-- /navbar -->
		</div><!-- /footer -->
	</div>
</xsl:template>

<xsl:template match="about">
	<xsl:copy-of select="document('../xml/about.xml')/*"/>
</xsl:template>

<!-- Markup elements that should not appear later ... -->

<!-- copy over a elements verbatim -->
<xsl:template match="a|p">
	<xsl:copy-of select="."/>
</xsl:template>

<!-- Make the list of attributes available to the JavaScript app -->
<xsl:template match="attribs">
	<xsl:element name="div">
		<xsl:attribute name="class"><xsl:text>AttrList</xsl:text></xsl:attribute>
		<xsl:attribute name="data-stats">
			<xsl:for-each select="attr">
				<xsl:text>Attrib_</xsl:text><xsl:value-of select="id"/><xsl:text> </xsl:text>
			</xsl:for-each>
		</xsl:attribute>
	</xsl:element>
</xsl:template>

<!-- Make the list of skills available to the JavaScript app -->
<xsl:template match="skills/category">
	<xsl:element name="div">
		<xsl:attribute name="class"><xsl:text>SkillList</xsl:text></xsl:attribute>
		<xsl:attribute name="data-stats">
			<xsl:for-each select="skill">
				<xsl:text>Skill_</xsl:text><xsl:value-of select="id"/><xsl:text> </xsl:text>
			</xsl:for-each>
		</xsl:attribute>
	</xsl:element>
</xsl:template>

<!-- Ignore data xml that is used for autogenerating lists -->
<xsl:template match="attribs/*"/>
<xsl:template match="skills/*"/>

</xsl:stylesheet>
