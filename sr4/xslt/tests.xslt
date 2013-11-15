<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0" xmlns="http://www.w3.org/1999/xhtml" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	
<!-- Templates for the roll tests page -->

<xsl:template match="tests">
	<h3 class="txtcenter"><xsl:text>Tests</xsl:text></h3>

	<div data-role="collapsible" data-collapsed="false">
	    <h2><xsl:text>Test Tests</xsl:text></h2>

        <ul data-role="listview">
        	<li data-icon="refresh">
    			<a href="#" id="roll-PA_Inf" 
    				onClick="$('#curr_PA_Inf').html(Test.asString('Attrib_INT', 'Skill_PA_Inf', SR4.currChar.stats['Attrib_INT'] + SR4.currChar.stats['Attrib_PA_Inf']));">
    				<xsl:text>Roll Infiltration</xsl:text>
    				<span class="ui-li-count med test" id="curr_PA_Inf">--</span>
    			</a>
    		</li>
    	</ul>
    </div>

</xsl:template>

</xsl:stylesheet>
