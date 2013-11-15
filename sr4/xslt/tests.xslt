<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0" xmlns="http://www.w3.org/1999/xhtml" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	
<!-- Templates for the roll tests page -->

<xsl:template match="tests">
	<div data-role="collapsible" data-iconpos="right">
	    <h2><xsl:text>TODO: 5 recently used skills.</xsl:text></h2>

		<ul data-role="listview">
		</ul>
    </div>

	<h3 class="txtcenter"><xsl:text>All Tests</xsl:text></h3>

	<ul data-role="listview" data-filter="true" data-filter-reveal="true" data-filter-placeholder="Search skill to roll ..." data-inset="true" data-iconpos="right">
    	<xsl:for-each select="/app/skills/category/skill">
        	<li data-icon="refresh">
    			<a href="#" id="roll-{id}" stat_a="Skill_{id}" stat_b="Attrib_{attribute}" offset="0"
    				onClick="$('#curr-{id}').html(Test.asString('Skill_{id}', 'Attrib_{attribute}', 0));">
    				<xsl:value-of select="name"/><xsl:text> </xsl:text>
    				<span class="test-label info"><xsl:text>(x dice)</xsl:text></span>
    				<span class="ui-li-count test-res med" id="curr-{id}">--</span>
    			</a>
    		</li>
    	</xsl:for-each>
	</ul>

</xsl:template>

</xsl:stylesheet>
