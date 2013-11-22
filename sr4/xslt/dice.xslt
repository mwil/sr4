<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0" xmlns="http://www.w3.org/1999/xhtml" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<!-- Templates for the dice page -->

<!-- Checkbox for dice modes -->
<xsl:template match="dicemode-cb">
	<form class="txtcenter nosel">
	<fieldset data-role="controlgroup" data-type="horizontal">
		<input type="checkbox" name="dicemode-cb-condi" id="dicemode-cb-condi" checked="checked"/>
		<label for="dicemode-cb-condi" style="width:110px;"><xsl:text>Monitor</xsl:text></label>

		<input type="checkbox" name="dicemode-cb-edge" id="dicemode-cb-edge"/>
		<label for="dicemode-cb-edge" style="width:110px;"><xsl:text>Edge</xsl:text></label>
		
		<input type="checkbox" name="dicemode-cb-add" id="dicemode-cb-add"/>
		<label for="dicemode-cb-add" style="width:110px;"><xsl:text>+</xsl:text></label>
	</fieldset>
	</form>
</xsl:template>

<!-- Dice number select buttons and the corresponding popup -->
<xsl:template match="dice-buttons">
	<div class="ui-grid-c">
		<xsl:call-template name="button-row">
			<xsl:with-param name="rowcount" select="6"/>
		</xsl:call-template>
	</div>

	<div data-role="popup" id="dice-popup" class="ui-content dice-popup" data-transition="pop" data-position-to="window">
		<!-- Autofilled by Dice.updateDicePopup() -->
		<h3 class="ui-title dice-poptext"><xsl:text>AUTOFILLED</xsl:text></h3>
		<div data-role="controlgroup" data-type="horizontal">
			<a href="#" data-role="button" id="dice-add-edge-btn" data-icon="plus" data-iconpos="right" class="pop-edge-btn">
				<xsl:text>Edge</xsl:text>
			</a>
			<a href="#" data-role="button" id="dice-reroll-edge-btn" data-icon="refresh" data-iconpos="right" class="pop-edge-btn">
				<xsl:text>Edge</xsl:text>
			</a>
		</div>
	</div>
</xsl:template>

<!-- Generate the dice grid (semi-)automatically, rowcount can be adapted to fit different screen sizes -->
<!-- Adapted from http://www.ibm.com/developerworks/xml/library/x-tiploop/index.html -->
<!-- Dice buttons labels are later autofilled by Dice.refresh() -->
<xsl:template name="button-row">
	<xsl:param name="rowcount" select="1"/>
	<xsl:param name="dicelabel" select="1"/>

	<xsl:if test="$rowcount > 0">
		<!-- content to put ... -->
		<div class="ui-block-a">
			<a href="#dice-popup" class="dice-btn" data-rel="popup" data-role="button"	id="dice-btn-{$dicelabel}"
			   data-baseval="{$dicelabel}" data-currval="{$dicelabel}" data-offset="0">
			   <xsl:value-of select="$dicelabel"/>
			</a>
		</div>
		<div class="ui-block-b">
			<a href="#dice-popup" class="dice-btn" data-rel="popup" data-role="button" id="dice-btn-{$dicelabel + 1}"
			   data-baseval="{$dicelabel + 1}" data-currval="{$dicelabel + 1}" data-offset="0">
			   <xsl:value-of select="$dicelabel + 1"/>
			</a>
		</div>
		<div class="ui-block-c">
			<a href="#dice-popup" class="dice-btn" data-rel="popup" data-role="button" id="dice-btn-{$dicelabel + 2}"
			   data-baseval="{$dicelabel + 2}" data-currval="{$dicelabel + 2}" data-offset="0">
			   <xsl:value-of select="$dicelabel + 2"/>
			</a>
		</div>
		<div class="ui-block-d">
			<a href="#dice-popup" class="dice-btn" data-rel="popup" data-role="button" id="dice-btn-{$dicelabel + 3}"
			   data-baseval="{$dicelabel + 3}" data-currval="{$dicelabel + 3}" data-offset="0">
			   <xsl:value-of select="$dicelabel + 3"/>
			</a>
		</div>
		<!-- -->

		<!-- ... the recursion ... -->
		<xsl:call-template name="button-row">
			<xsl:with-param name="rowcount" select="$rowcount - 1"/>
			<xsl:with-param name="dicelabel" select="$dicelabel + 4"/>
		</xsl:call-template>
		<!-- -->
	</xsl:if>
</xsl:template>

</xsl:stylesheet>
