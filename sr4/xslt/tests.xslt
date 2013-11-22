<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0" xmlns="http://www.w3.org/1999/xhtml" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	
<!-- Templates for the roll tests page -->

<xsl:template match="tests">

	<form class="txtcenter fullwidth nosel">
	<fieldset data-role="controlgroup" data-type="horizontal" id="tworow-test-cg">
		<a href="#" data-role="button" data-icon="minus" data-iconpos="left" class="btn-out"
			onClick="Test.incMod(-1);">
		</a>
		<!-- Autofilled by tests.js/Test.refresh() -->
		<a href="#" id="test-mod-label" data-role="button" class="btn-in"
			onClick="Test.resetMod();">
			<xsl:text>AUTOFILLED</xsl:text>
		</a>
		<a href="#" data-role="button" data-icon="plus" data-iconpos="right" class="btn-out"
			onClick="Test.incMod(1);">
		</a>
	</fieldset>
	</form>

	<div data-role="collapsible" data-iconpos="right" data-collapsed="false" data-collapsed-icon="arrow-d" data-expanded-icon="arrow-u">
		<h2><xsl:text>Recently Used Skills</xsl:text></h2>

		<ul data-role="listview" id="recent-skill-lv" data-icon="false" data-split-icon="edit" data-split-theme="c">
			<!-- Autofilled by tests.js/Test.recentlyUsed() -->
		</ul>
	</div>

	<h3 class="txtcenter nosel"><xsl:text>Browse Tests</xsl:text></h3>

	<ul data-role="listview" data-filter="true" data-filter-reveal="true" id="search-skill-lv" class="nosel"  data-split-icon="edit" data-split-theme="c"
		data-filter-placeholder="Search skill to roll ..." data-inset="true" data-icon="false">
		<xsl:for-each select="/app/skills/category/skill">
			<li data-icon="false" class="{../@type}">
				<a href="#tests-popup" data-rel="popup" class="roll-{id}"
					data-stat_a="Skill_{id}" data-stat_b="Attrib_{attribute}" data-offset="0"
					onClick="$('.count-{id}').html(Test.asString('Skill_{id}', 'Attrib_{attribute}', 0)); Test.recentlyUsed('roll-{id}');">

					<xsl:value-of select="name"/>
					<span class="info"><xsl:text> (</xsl:text><xsl:value-of select="attribute"/><xsl:text>) </xsl:text></span>
					<!-- Autofilled by tests.js/Test.refresh() -->
					<span class="test-label info"><xsl:text>(x dice)</xsl:text></span>
					<!-- Autofilled by #tests-popup -->
					<span class="ui-li-count test-res count-{id}">--</span>
				</a>
				<a href="#">Options</a>
			</li>
		</xsl:for-each>
	</ul>

	<!-- The popups -->
	<div data-role="popup" id="tests-popup" class="ui-content dice-popup" data-transition="pop" data-position-to="window">
		<!-- Autofilled by dice.js/Dice.updateDicePopup() -->
		<h3 class="ui-title dice-poptext"><xsl:text>AUTOFILLED</xsl:text></h3>
	</div>

</xsl:template>

</xsl:stylesheet>
