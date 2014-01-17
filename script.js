var pieceCoordinatesArray = [ [ [1, 0], [1, 0], [1, 0],[1, 1] ],[ [1, 0],[1, 1],[1, 1] ],[ [1, 0],[1, 0],[1, 1] ],[ [0, 1, 0],[0, 1, 1],[1, 1, 0] ],[ [0, 1, 0],[1, 1, 1] ],[ [1, 0],[1, 0],[1, 0],[1, 1] ],[ [1, 0],[1, 1] ],[ [1, 0, 0],[1, 0, 0],[1, 1, 1],[0, 0, 1] ],[ [1, 0],[1, 0],[1, 1],[0, 1] ],[ [1, 0, 0],[1, 1, 1],[0, 1, 0],[0, 1, 0] ],[ [1, 1],[1, 1] ],[ [0, 1, 0],[1, 1, 1],[0, 1, 1] ],[ [1, 1, 1],[1, 1, 0],[1, 0, 0] ] ];
var logicalPieceArray = [];
var lastClickedBlockId = "";

$(setUp);

function setUp() {
	for (i = 0; i < 64; i++) {
		$('#board').append("<div class=\"dropbox\"></div>");
	};
	for (i = 0; i < 13; i++) {
		$("#blockDock").append("<div id=\"piece" + i + "\" class = \"piece\"></div>");
		logicalPieceArray[i] = new piece(pieceCoordinatesArray[i], i);
	};
	
	$("#blockDock").droppable();
	$(".dropbox").droppable();
	$(".piece").draggable({
		snap: ".dropbox",
		grid: [56, 56],
		revert: "invalid",
		scroll: "false"
	});
}

function board() {
	this.statusArray = [[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]];
	
	function getArray() {
		return this.statusArray;
	}
	
	function setArray(xCoord, yCoord, shapeArray) {
		for (x = 0; x < shapeArray[0].length; x++) {
			for (y = 0; y < shapeArray.length; y++) {
				if(shapeArray[y][x]){
					this.statusArray[yCoord+y][xCoord+x] = shapeArray[y][x];
				}
			}
		}
		checkWin();
	}
	
	function checkWin(){
		for (x = 0; x < 8; x++){
			for (y = 0; y < 8; y++){
				if (!this.statusArray[y][x]){
					return;
				}
			}
		}
		gameOver();
	}
}

function piece (shapeArray, pieceId) {
	this.shapeArray = shapeArray;
	this.id = pieceId;
	for (y = 0; y < shapeArray.length; y++) {
		for (x = 0; x < shapeArray[y].length; x++) {
			if (shapeArray[y][x]){
				$("#piece" + this.id).append("<div class=\"block\"></div>");
			}
		}
	}

}

$(".block").mousedown(function(){
	lastClickedBlockId = $(this).attr('id');
});
$(".dropbox").on("drop", function(event, ui){
	// get which block mouse is over from lastClickedPieceId, get coordinates,
	// extrapolate full piece shape, compare to available spaces for validation
});

function gameOver(){
	$("#board").prepend("<h1>You Win!</h1>");
}