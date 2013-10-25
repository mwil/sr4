<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns="http://www.w3.org/1999/xhtml" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:output method="html" indent="yes"/>

<xsl:template match="/">
<!DOCTYPE html>
<html>

<head>
	<title>HTML from XML via XSLT</title>

    <meta charset="utf-8"/>
	
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="http://code.jquery.com/mobile/1.3.2/jquery.mobile-1.3.2.min.css" />

	<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
	<script src="http://code.jquery.com/mobile/1.3.2/jquery.mobile-1.3.2.min.js"></script>

	<style type="text/css">
		#med { font-size:medium; }
	</style>
</head>

<body>
	<xsl:apply-templates/>
</body>
</html>
</xsl:template>

<xsl:template match="mytext">
<h1>
<xsl:value-of select="myhead"/>
</h1>
<p>
<xsl:value-of select="mypara"/>
</p>
</xsl:template>


</xsl:stylesheet>