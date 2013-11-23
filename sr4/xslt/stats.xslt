<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0" xmlns="http://www.w3.org/1999/xhtml" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<!-- Templates for the stats page -->

<xsl:template match="stats">
	<!-- autogen the stats list from the <attribs> element tree in sr4.xml -->
	<div data-role="collapsible-set" data-inset="true" data-iconpos="right" data-collapsed-icon="arrow-d" data-expanded-icon="arrow-u">

		<div data-role="collapsible">
			<h2><xsl:text>Attributes</xsl:text></h2>
			<ul data-role="listview" id="stats-attr-lv">
				<xsl:for-each select="/app/attribs/attr">
					<li data-icon="false">
						<a href="#stats-popup" class="stats-attr-btn" data-rel="popup" data-name="{name}" data-stat="Attrib_{id}">
							<xsl:value-of select="name"/>
							<span class="ui-li-count" id="Attrib_{id}"></span>
						</a>
					</li>
				</xsl:for-each>
			</ul>
		</div>
		
		<xsl:for-each select="/app/skills/category">
			<div data-role="collapsible" class="{@type}">
				<h2><xsl:value-of select="@name"/></h2>
				<ul data-role="listview" class="stats-skill-lv">
					<xsl:for-each select="./skill">
						<li data-icon="false">
							<a href="#stats-popup" class="stats-skill-btn" data-rel="popup" data-name="{name}" data-stat="Skill_{id}">
								<xsl:value-of select="name"/>
								<span class="info"><xsl:text> (</xsl:text><xsl:value-of select="attribute"/><xsl:text>) </xsl:text></span>
								<span class="ui-li-count" id="Skill_{id}"></span>
							</a>
						</li>
					</xsl:for-each>	        
				</ul>
			</div>
		</xsl:for-each>
	</div>

	<!-- the popup to change character stats values, it is reused for all stats and automatically filled refreshed by sr4.js/SR4.updateStatsPopup() -->
	<div data-role="popup" id="stats-popup" class="ui-content" data-transition="pop" data-position-to="window">
		<h3 id="stats-poptext" class="ui-title"><xsl:text>AUTOFILLED</xsl:text></h3>
		
		<form style="width:320px;">
			<input type="range" id="stats-slider" data-highlight="true" min="0" max="9" value="7" data-target="autofilled"/>

			<div class="ui-grid-a">
				<div class="ui-block-a">
					<a href="#" data-role="button" data-rel="back" id="stats-set-btn"><xsl:text>Set</xsl:text></a>
				</div>
				<div class="ui-block-b">
					<a href="#" data-role="button" data-icon="plus" data-iconpos="left" id="stats-max-btn"><xsl:text>Max</xsl:text></a>
				</div>
			</div>
		</form>
	</div>
</xsl:template>

</xsl:stylesheet>
