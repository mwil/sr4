<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0" xmlns="http://www.w3.org/1999/xhtml" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<!-- Templates for the dice page -->

<!-- Checkbox for dice modes -->
<xsl:template match="dicemode-cb">
	<form style="text-align:center;">
	<fieldset data-role="controlgroup" data-type="horizontal">
 		<input type="checkbox" name="dicemode-cb-condi" id="dicemode-cb-condi" 
	    	onClick="Dice.useCharMods($('#dicemode-cb-condi')[0].checked);"/>
	    <label for="dicemode-cb-condi" style="width:110px;"><xsl:text>Monitor</xsl:text></label>

	    <input type="checkbox" name="dicemode-cb-edge" id="dicemode-cb-edge" 
	    	onClick="Dice.changeOffset(SR4, 'currChar.stats.Attrib_EDG', !$('#dicemode-cb-edge')[0].checked);"/>
	    <label for="dicemode-cb-edge" style="width:110px;"><xsl:text>Edge</xsl:text></label>
		
		<input type="checkbox" name="dicemode-cb-add" id="dicemode-cb-add"
	    	onClick="Dice.rebaseDiceButtons(24, !$('#dicemode-cb-add')[0].checked);"/>
	    <label for="dicemode-cb-add" style="width:110px;"><xsl:text>+</xsl:text></label>
	</fieldset>
	</form>
</xsl:template>

<!-- Dice number select buttons and the corresponing popup -->
<xsl:template match="dice-buttons">
	<div class="ui-grid-c">
		<xsl:call-template name="button-row">
      		<xsl:with-param name="rowcount" select="6"/>
    	</xsl:call-template>
	</div>

	<div data-role="popup" id="dice-popup" class="ui-content" data-transition="pop" data-position-to="window">
	    <h3 class="ui-title" id="dice-poptext"><xsl:text>JavaScript not working?</xsl:text></h3>
	    <div data-role="controlgroup" data-type="horizontal" data-theme="c">
	    	<a href="#" data-role="button" 
	    		onClick="Dice.addEdge(SR4.currChar.stats['Attrib_EDG']); $('.pop-edge').toggleClass('ui-disabled');"
	    		data-icon="plus" data-iconpos="right" class="pop-edge">
	    		<xsl:text>Edge</xsl:text>
	    	</a>
	    	<a href="#" data-role="button" onClick="Dice.rerollToPopup(); $('.pop-edge').toggleClass('ui-disabled');"
	    		data-icon="refresh" data-iconpos="right" class="pop-edge">
	    		<xsl:text>Edge</xsl:text>
	    	</a>
	    </div>
	</div>
</xsl:template>

<!-- Generate the dice grid (semi-)automatically, rowcount can be adapted to fit different screen sizes -->
<!-- Adapted from http://www.ibm.com/developerworks/xml/library/x-tiploop/index.html -->
<xsl:template name="button-row">
	<xsl:param name="rowcount" select="1"/>
	<xsl:param name="dicelabel" select="1"/>

	<xsl:if test="$rowcount > 0">
		<!-- content to put ... -->
		<div class="ui-block-a">
	    	<a href="#dice-popup" class="dicebutton" data-rel="popup" data-role="button"
	    	   baseval="{$dicelabel}" currval="{$dicelabel}" valoffset="0" id="b{$dicelabel}"
	    	   onClick="Dice.rollToPopup(parseInt($('#b{$dicelabel}').attr('currval')), $('#dicemode-cb-edge')[0].checked); $('.pop-edge').toggleClass('ui-disabled', $('#dicemode-cb-edge')[0].checked);">
	    	   <xsl:value-of select="$dicelabel"/>
	    	</a>
	    </div>
	    <div class="ui-block-b">
	    	<a href="#dice-popup" class="dicebutton" data-rel="popup" data-role="button"
	    	   baseval="{$dicelabel + 1}" currval="{$dicelabel + 1}" id="b{$dicelabel + 1}"
	    	   onClick="Dice.rollToPopup(parseInt($('#b{$dicelabel+1}').attr('currval')), $('#dicemode-cb-edge')[0].checked); $('.pop-edge').toggleClass('ui-disabled', $('#dicemode-cb-edge')[0].checked);">
	    	   <xsl:value-of select="$dicelabel + 1"/>
	    	</a>
	    </div>
	    <div class="ui-block-c">
	    	<a href="#dice-popup" class="dicebutton" data-rel="popup" data-role="button" 
	    	   baseval="{$dicelabel + 2}" currval="{$dicelabel + 2}" id="b{$dicelabel + 2}"
	    	   onClick="Dice.rollToPopup(parseInt($('#b{$dicelabel+2}').attr('currval')), $('#dicemode-cb-edge')[0].checked); $('.pop-edge').toggleClass('ui-disabled', $('#dicemode-cb-edge')[0].checked);">
	    	   <xsl:value-of select="$dicelabel + 2"/>
	    	</a>
	    </div>
	    <div class="ui-block-d">
	    	<a href="#dice-popup" class="dicebutton" data-rel="popup" data-role="button"
	    	   baseval="{$dicelabel + 3}" currval="{$dicelabel + 3}" id="b{$dicelabel + 3}"
	    	   onClick="Dice.rollToPopup(parseInt($('#b{$dicelabel+3}').attr('currval')), $('#dicemode-cb-edge')[0].checked); $('.pop-edge').toggleClass('ui-disabled', $('#dicemode-cb-edge')[0].checked);">
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
