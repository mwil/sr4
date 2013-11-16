<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0" xmlns="http://www.w3.org/1999/xhtml" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	
<!-- Templates for the roll tests page -->

<xsl:template match="tests">
	<form class="txtcenter fullwidth">
	<fieldset data-role="controlgroup" data-type="horizontal" id="tworow-test-cg">
		<a href="#" data-role="button" data-icon="minus" data-iconpos="left" class="btn-out"
			onClick="Test.incMod(-1);">
		</a>
	    <a href="#" id="test-mod-label" data-role="button" class="btn-in"
	    	onClick="Test.resetMod();">
	    	<xsl:text>AUTOFILLED</xsl:text>
	    </a>
	    <a href="#" data-role="button" data-icon="plus" data-iconpos="right" class="btn-out"
	    	onClick="Test.incMod(1);">
	    </a>
	</fieldset>
	</form>

	<h3 class="txtcenter"><xsl:text>Recently Used</xsl:text></h3>

	<div data-role="collapsible" data-iconpos="right">
	    <h2><xsl:text>TODO: 5 recently used skills.</xsl:text></h2>

		<ul data-role="listview">
		</ul>
    </div>

	<h3 class="txtcenter"><xsl:text>All Tests</xsl:text></h3>

	<ul data-role="listview" data-filter="true" data-filter-reveal="true" data-filter-placeholder="Search skill to roll ..." data-inset="true" data-iconpos="right">
    	<xsl:for-each select="/app/skills/category/skill">
        	<li data-icon="refresh" class="{../@type}">
    			<a href="#tests-popup" data-rel="popup"
    				id="roll-{id}" stat_a="Skill_{id}" stat_b="Attrib_{attribute}" offset="0"
    				onClick="$('#curr-{id}').html(Test.asString('Skill_{id}', 'Attrib_{attribute}', 0));">

    				<xsl:value-of select="name"/><xsl:text> </xsl:text>
    				<span class="test-label info"><xsl:text>(x dice)</xsl:text></span>
    				<span class="ui-li-count test-res med" id="curr-{id}">--</span>
    			</a>
    		</li>
    	</xsl:for-each>
	</ul>

	<!-- The popups -->
	<div data-role="popup" id="tests-popup" class="ui-content dice-popup" data-transition="pop" data-position-to="window">
		<h3 class="ui-title dice-poptext"><xsl:text>AUTOFILLED</xsl:text></h3>
	</div>

</xsl:template>

</xsl:stylesheet>
