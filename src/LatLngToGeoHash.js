export default function LatLngToGeoHash(name, latLonList) {
return `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2" xmlns:gx="http://www.google.com/kml/ext/2.2" xmlns:kml="http://www.opengis.net/kml/2.2" xmlns:atom="http://www.w3.org/2005/Atom">
<Document>
	<name>${name}</name>
	<Style id="poly-000000-1200-77-nodesc-highlight">
		<LineStyle>
			<color>ff000000</color>
			<width>1.8</width>
		</LineStyle>
		<PolyStyle>
			<color>4d000000</color>
		</PolyStyle>
		<BalloonStyle>
			<text><![CDATA[<h3>$[name]</h3>]]></text>
		</BalloonStyle>
	</Style>
	<Style id="poly-000000-1200-77-nodesc-normal">
		<LineStyle>
			<color>ff000000</color>
			<width>1.2</width>
		</LineStyle>
		<PolyStyle>
			<color>4d000000</color>
		</PolyStyle>
		<BalloonStyle>
			<text><![CDATA[<h3>$[name]</h3>]]></text>
		</BalloonStyle>
	</Style>
	<StyleMap id="poly-000000-1200-77-nodesc">
		<Pair>
			<key>normal</key>
			<styleUrl>#poly-000000-1200-77-nodesc-normal</styleUrl>
		</Pair>
		<Pair>
			<key>highlight</key>
			<styleUrl>#poly-000000-1200-77-nodesc-highlight</styleUrl>
		</Pair>
	</StyleMap>
	<Placemark>
		<name>${name}</name>
		<styleUrl>#poly-000000-1200-77-nodesc</styleUrl>
		<Polygon>
			<outerBoundaryIs>
				<LinearRing>
					<tessellate>1</tessellate>
          <coordinates>
            ${latLonList.map(({lat, lon}) => `${lon},${lat},0`).join(' ')}
					</coordinates>
				</LinearRing>
			</outerBoundaryIs>
		</Polygon>
	</Placemark>
</Document>
</kml>
`;
}
