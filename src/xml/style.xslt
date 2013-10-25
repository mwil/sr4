<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns="http://www.w3.org/1999/xhtml" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:output method="html" />
<xsl:template match="mytext">
<h1>
<xsl:value-of select="myhead" />
</h1>
<p>
<xsl:value-of select="mypara" />
</p>
</xsl:template>
</xsl:stylesheet>