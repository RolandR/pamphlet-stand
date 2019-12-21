

function main(){
	
	// all dimensions in mm
	
	var insideWidth = 148; // width of brochures
	var widthMargin = 2; // how much space on each side of brochures
	var insideThickness = 20; // maximum thickness of stack of brochures, so to speak
	var wallThickness = 1.5;
	var standHeight = 60;
	
	var cutoutMargin = 10;
	
	var angle = 20;
	
	var totalWidth = insideWidth + 2*widthMargin + 2*wallThickness;
	var totalThickness = insideThickness + 2*wallThickness;
	
	
	var solidStand = cube({
		 size: [totalWidth, totalThickness, standHeight]
		,center: [true, true, false]
	});
	
	var hollowCutout = cube({
		 size: [insideWidth + 2*widthMargin, insideThickness, standHeight]
		,center: [true, true, false]
	}).translate([0, 0, 0]);
	
	var sideCutout = cube({
		 size: [totalWidth - 2*cutoutMargin, wallThickness, standHeight]
		,center: [true, false, false]
	}).translate([0, -totalThickness/2, cutoutMargin]);
	
	stand = difference(
		 solidStand
		,hollowCutout
		,sideCutout
	);
	
	stand = stand.translate([0, totalThickness/2, 0]);
	stand = stand.rotateX(-angle);
	stand = stand.translate([0, -totalThickness/2, 0]);
	
	solidStand = solidStand.translate([0, totalThickness/2, 0]);
	solidStand = solidStand.rotateX(-angle);
	solidStand = solidStand.translate([0, -totalThickness/2, 0]);
	
	var bottom = cube({
		 size: [totalWidth, standHeight*2, wallThickness]
		,center: [true, true, false]
	});
	
	bottom = intersection(
		 bottom
		,solidStand
	);
	
	stand = union(
		bottom,
		stand
	);
	
	stand = difference(
		 stand
		,cube({
			 size: [totalWidth, standHeight*2, standHeight]
			,center: [true, true, false]
		}).translate([0, 0, -standHeight])
	);
	
	return stand;
	
}