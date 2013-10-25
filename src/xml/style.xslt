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
	            <li><a href="#"><xsl:text>Edge</xsl:text><span class="ui-li-count" id="edge"></span></a></li>
	        </ul>
	    </div>
	</div>
</xsl:template>

<!-- on dice page: checkbox for dice modes -->
<xsl:template match="dicemode-cb">
	<form>
	<fieldset data-role="controlgroup" data-type="horizontal">
	    <input type="checkbox" name="dicemode-cb-sort" id="dicemode-cb-sort" checked="checked"/>
	    <label for="dicemode-cb-sort" style="width:120px;">Sort</label>
	    <input type="checkbox" name="dicemode-cb-edge" id="dicemode-cb-edge"/>
	    <label for="dicemode-cb-edge" style="width:120px;">Edge</label>
	    <input type="checkbox" name="dicemode-cb-add" id="dicemode-cb-add"/>
	    <label for="dicemode-cb-add" style="width:120px;">+</label>
	</fieldset>
	</form>
</xsl:template>

<xsl:template match="dice-buttons">
	<div class="ui-grid-c">
		<xsl:call-template name="button-row">
      		<xsl:with-param name="rowcount" select="6"/>
    	</xsl:call-template>
	</div>

	<div data-role="popup" id="dice-popup">
	    <p id="dice-poptext"><xsl:text>JavaScript not working?</xsl:text></p>
	    <a href="#" data-role="button" data-inline="true" data-rel="back" data-theme="c"><xsl:text>Whatever.</xsl:text></a>
	</div>
</xsl:template>

<xsl:template name="button-row">
	<xsl:param name="rowcount" select="1"/>
	<xsl:param name="dicelabel" select="1"/>

	<xsl:if test="$rowcount > 0">
		<!-- content to put ... -->
		<div class="ui-block-a">
	    	<a href="#dice-popup" data-rel="popup" data-role="button"
	    	   onClick="Dice.roll({$dicelabel}, $('#dicemode-cb-edge')[0].checked, $('#dicemode-cb-sort')[0].checked);"
	    	   data-inline="false" data-transition="pop" data-position-to="window">
	    	   <xsl:value-of select="$dicelabel"/>
	    	</a>
	    </div>
	    <div class="ui-block-b">
	    	<a href="#dice-popup" data-rel="popup" data-role="button" 
	    	   onClick="Dice.roll({$dicelabel + 1}, $('#dicemode-cb-edge')[0].checked, $('#dicemode-cb-sort')[0].checked);"
	    	   data-inline="false" data-transition="pop" data-position-to="window">
	    	   <xsl:value-of select="$dicelabel + 1"/>
	    	</a>
	    </div>
	    <div class="ui-block-c">
	    	<a href="#dice-popup" data-rel="popup" data-role="button" 
	    	   onClick="Dice.roll({$dicelabel + 2}, $('#dicemode-cb-edge')[0].checked, $('#dicemode-cb-sort')[0].checked);"
			   data-inline="false" data-transition="pop" data-position-to="window">
	    	   <xsl:value-of select="$dicelabel + 2"/>
	    	</a>
	    </div>
	    <div class="ui-block-d">
	    	<a href="#dice-popup" data-rel="popup" data-role="button" 
	    		onClick="Dice.roll({$dicelabel + 3}, $('#dicemode-cb-edge')[0].checked, $('#dicemode-cb-sort')[0].checked);"
	    	   data-inline="false" data-transition="pop" data-position-to="window">
	    	   <xsl:value-of select="$dicelabel + 3"/>
	    	</a>
	    </div>
	    <!-- -->

	    <!-- ... the recursion ... -->
        <xsl:call-template name="button-row">
        	<xsl:with-param name="rowcount" select="$rowcount - 1"/>
        	<xsl:with-param name="dicelabel" select="$dicelabel + 4"/>
        </xsl:call-template>
    </xsl:if>
</xsl:template>

</xsl:stylesheet>