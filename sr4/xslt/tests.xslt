<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0" xmlns="http://www.w3.org/1999/xhtml" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	
<!-- Templates for the roll tests page -->

<xsl:template match="tests">
	<h3 class="txtcenter"><xsl:text>Tests</xsl:text></h3>

	<div data-role="collapsible" data-collapsed="false">
	    <h2><xsl:text>Tests Test</xsl:text></h2>

        <ul data-role="listview">
        	<li data-icon="refresh">
    			<a href="#" id="roll-PA_Inf" 
    				onClick="$('#curr-PA_Inf').html(Test.asString('Attrib_AGI', 'Skill_PA_Inf', 0));">
    				<xsl:text>Roll Infiltration (10 dice)</xsl:text>
    				<span class="ui-li-count med test" id="curr-PA_Inf">--</span>
    			</a>
    		</li>
    	</ul>
    </div>

</xsl:template>

</xsl:stylesheet>
