// Global arrays
var grid = new Array(21)	// 1 based array -- two dimensional
var color = new Array(8)	// 0 based array -- just some colors
var p = new Array(8)		// 1 based array -- p(8, 5, 5, 3) -- four dimensional

var orientation
var row
var col
var shape
var timeoutHandle

function Start() {
	Init()
	Main()
}
function Init() {
	InitVars()
	InitPlayingFieldColors()
	InitGrid()
	InitColors()
	InitP() // the loooong function.

	document.onkeydown = KeyPressed
	document.onkeydown = KeyPressed
}
function Main() {

	if (CheckDown()) {
		UpdateGridAndScreen(0)
		row++
	}
	else {
		document.all.score.value = parseInt(document.all.score.value) + 1
		CheckRows()
		InitVars()
		if (CheckGameOver()) {
			alert("Game Over")
			clearTimeout(timeoutHandle)
			return
		}
	}

	UpdateGridAndScreen(shape)

	timeoutHandle = setTimeout('Main()',200)

}
function InitVars() {
	orientation = 0
	row = 2
	col = 5
	shape = GetShape()
	if (shape == 3)
		row = 1
}

function InitPlayingFieldColors() {
	var i, j
	for (i=1; i<21; i++) {
		for (j=1; j<11; j++) {
			td = eval("td_" + i + "_" + j + ".style")
			td.backgroundColor = 0	//black
		}
	}
}
function InitGrid() {
	var i, j
	for (i=1; i<21; i++) {
		grid[i] = new Array(11)
		for (j=1; j<11; j++)
			grid[i][j] = 0
		}
}
function InitColors() {
	color[0] = "black"
	color[1] = "blue"
	color[2] = "red"
	color[3] = "yellow"
	color[4] = "orange"
	color[5] = "pink"
	color[6] = "cyan"
	color[7] = "magenta"
}
function GetShape() {
	return Math.floor(Math.random() * 7) + 1
}
function KeyPressed() {
	// respond to arrow keys
	switch (event.keyCode) {
		case 37:
			MoveLeft()
			break
		case 39:
			MoveRight()
			break
		case 38:
			Rotate()
			break
		case 40:
			DropAllTheWay()
			break
	}

/*
	if (event.keyCode == 37)
		MoveLeft()
	if (event.keyCode == 39)
		MoveRight()
	if (event.keyCode == 38)
		Rotate()
*/
}

function CheckDown()
{
	var newcol, newrow, oldsquare, oldcol, oldrow;
	var onbelow, newsquare;
	for(newsquare = 1; newsquare < 5; newsquare++)
	{
		newrow = row + p[shape][orientation + 1][newsquare][2] + 1;
		if(newrow>20)
			return false;

		newcol = col + p[shape][orientation + 1][newsquare][1];
		if(grid[newrow][newcol])
		{
			onbelow = true;
			for(oldsquare = 1; oldsquare < 5; oldsquare++)
			{
				oldrow = row + p[shape][orientation+1][oldsquare][2];
				oldcol = col + p[shape][orientation+1][oldsquare][1];
				onbelow = onbelow && ((newcol != oldcol) || (newrow != oldrow));
			}
			if(onbelow)
				return false;
		}
	}
	return true;
}
function CheckLeft()
{
	var newcol, newrow, oldsquare, oldcol, oldrow;
	var onleft, newsquare;
	for(newsquare = 1; newsquare < 5; newsquare++)
	{
		newcol = col + p[shape][orientation + 1][newsquare][1]-1;
		if(newcol < 1)
			return false;

		newrow = row + p[shape][orientation + 1][newsquare][2];
		if(grid[newrow][newcol])
		{
			onleft = true;
			for(oldsquare = 1; oldsquare < 5; oldsquare++)
			{
				oldcol = col + p[shape][orientation+1][oldsquare][1];
				oldrow = row + p[shape][orientation+1][oldsquare][2];
				onleft = onleft && ((newcol !=oldcol)||(newrow !=oldrow));
			}
			if(onleft)
				return false;
		}
	}
	return true;
}
function CheckRight()
{
	var newcol, newrow, oldsquare, oldcol, oldrow;
	var onleft, newsquare;
	for(newsquare = 1; newsquare < 5; newsquare++)
	{
		newcol = col + p[shape][orientation + 1][newsquare][1] + 1;
		if(newcol > 10)
			return false;

		newrow = row + p[shape][orientation + 1][newsquare][2];
		if(grid[newrow][newcol])
		{
			onleft = true;
			for(oldsquare = 1; oldsquare < 5; oldsquare++)
			{
				oldcol = col + p[shape][orientation+1][oldsquare][1];
				oldrow = row + p[shape][orientation+1][oldsquare][2];
				onleft = onleft && ((newcol !=oldcol)||(newrow !=oldrow));
			}
			if(onleft)
				return false;
		}
	}
	return true;
}
function CheckRotate()
{
	/* Return True if player can rotate, false otherwise:
	Loop four times for each square of the piece
	Do a "move" of the piece to the left to where its new position would be.
	For each square in its "new" position
	if any column or row position is out of bounds, checkrotate = false
	otherwise,
	      check every square of the new position for color,
	          if any of them has color and is not on an old square,
	              checkrotate stays false.
	*/

	var neworientation, newcol, newrow, notonold , oldcol, oldrow;
	var newsquare, oldsquare

	for(newsquare = 1; newsquare < 5; newsquare++)
	{
	    neworientation = (orientation + 1) % 4;
	    newrow = row + p[shape][neworientation + 1][newsquare][2];
	    newcol = col + p[shape][neworientation + 1][newsquare][1];
	    if((newcol < 1) || (newcol > 10))
			return false;
	    if((newrow < 1) || (newrow > 20))
			return false;
	    if(grid[newrow][newcol])
	    {
	        notonold = true;
	        for (oldsquare = 1; oldsquare < 5; oldsquare++)
	        {
	            oldrow = row + p[shape][orientation + 1][oldsquare][2];
	            oldcol = col + p[shape][orientation + 1][oldsquare][1];
	            notonold = notonold && (newcol != oldcol || newrow != oldrow);
	        }
	        if(notonold)
	            return false;
	    }
	}
	return true;
}
function MoveLeft()
{
	if(CheckLeft())	{
		UpdateGridAndScreen(0);
		col--;
		UpdateGridAndScreen(shape);
	}
}
function MoveRight()
{
	if(CheckRight())	{
		UpdateGridAndScreen(0);
		col++;
		UpdateGridAndScreen(shape);
	}
}
function Rotate()
{
	if(CheckRotate())
	{
		UpdateGridAndScreen(0);
		orientation = (orientation + 1)%4;
		UpdateGridAndScreen(shape);
	}
}
function CheckRows()
{
	var r, c
	for(r = 1; r<21 ; r++)
	{
		for(c = 1; c < 11; c++)
		{
			if(!grid[r][c])
				break;
			else if(c == 10)
				BringItDown(r);
		}
	}
}
function BringItDown(FullRow)
{
	var r, c, td_style
	for(r = FullRow; r > 1; r--)
	{
		for(c = 1; c < 11; c++)	{
			grid[r][c] = grid[r-1][c];
			td_style = eval("td_" + r + "_" + c + ".style")
			td_style.backgroundColor = color[grid[r-1][c]]
		}
	}
	document.all.score.value = parseInt(document.all.score.value) + 10
}
function CheckGameOver()
{
	var newcol, newrow, oldsquare, oldcol, oldrow;
	var ongameover, newsquare;
	for(newsquare = 1; newsquare < 5; newsquare++)
	{
		newrow = row + p[shape][orientation + 1][newsquare][2];
		newcol = col + p[shape][orientation + 1][newsquare][1];
		if(grid[newrow][newcol])
		{
			return true;
		}
	}
	return false;
}
function DropAllTheWay() {
	while (CheckDown()) {
		UpdateGridAndScreen(0)
		row++
		UpdateGridAndScreen(shape)
	}
}
function UpdateGridAndScreen(thecolor)
{
	var square, r, c, td_style
	for(square=1; square<5; square++)
	{
		r = row + p[shape][orientation+1][square][2];
		c = col + p[shape][orientation+1][square][1];
		if (r > 0) {
			grid[r][c] = thecolor;
			td_style = eval("td_" + r + "_" + c + ".style")
			td_style.backgroundColor = color[thecolor]
		}
	}
}
function InitP() {
	var i,j,k
	for (i=1; i<8; i++) {
		p[i] = new Array(5)
		for (j=1; j<5; j++) {
			p[i][j] = new Array(5)
			for (k=1; k<5; k++) {
				p[i][j][k] = new Array(3)
			}
		}
	}
	p[1][1][1][1] = 0;
	p[1][1][1][2] = -1;
	p[1][1][2][1] = 0;
	p[1][1][2][2] = 0;
	p[1][1][3][1] = 0;
	p[1][1][3][2] = 1;
	p[1][1][4][1] = 1;
	p[1][1][4][2] = 1;
	p[1][2][1][1] = -1;
	p[1][2][1][2] = 0;
	p[1][2][2][1] = 0;
	p[1][2][2][2] = 0;
	p[1][2][3][1] = 1;
	p[1][2][3][2] = 0;
	p[1][2][4][1] = -1;
	p[1][2][4][2] = 1;
	p[1][3][1][1] = -1;
	p[1][3][1][2] = -1;
	p[1][3][2][1] = 0;
	p[1][3][2][2] = -1;
	p[1][3][3][1] = 0;
	p[1][3][3][2] = 0;
	p[1][3][4][1] = 0;
	p[1][3][4][2] = 1;
	p[1][4][1][1] = 1;
	p[1][4][1][2] = -1;
	p[1][4][2][1] = -1;
	p[1][4][2][2] = 0;
	p[1][4][3][1] = 0;
	p[1][4][3][2] = 0;
	p[1][4][4][1] = 1;
	p[1][4][4][2] = 0;
	p[2][1][1][1] = 0;
	p[2][1][1][2] = -1;
	p[2][1][2][1] = 0;
	p[2][1][2][2] = 0;
	p[2][1][3][1] = 0;
	p[2][1][3][2] = 1;
	p[2][1][4][1] = -1;
	p[2][1][4][2] = 1;
	p[2][2][1][1] = -1;
	p[2][2][1][2] = -1;
	p[2][2][2][1] = -1;
	p[2][2][2][2] = 0;
	p[2][2][3][1] = 0;
	p[2][2][3][2] = 0;
	p[2][2][4][1] = 1;
	p[2][2][4][2] = 0;
	p[2][3][1][1] = 0;
	p[2][3][1][2] = -1;
	p[2][3][2][1] = 1;
	p[2][3][2][2] = -1;
	p[2][3][3][1] = 0;
	p[2][3][3][2] = 0;
	p[2][3][4][1] = 0;
	p[2][3][4][2] = 1;
	p[2][4][1][1] = -1;
	p[2][4][1][2] = 0;
	p[2][4][2][1] = 0;
	p[2][4][2][2] = 0;
	p[2][4][3][1] = 1;
	p[2][4][3][2] = 0;
	p[2][4][4][1] = 1;
	p[2][4][4][2] = 1;
	p[3][1][1][1] = 0;
	p[3][1][1][2] = 0;
	p[3][1][2][1] = 1;
	p[3][1][2][2] = 0;
	p[3][1][3][1] = 0;
	p[3][1][3][2] = 1;
	p[3][1][4][1] = 1;
	p[3][1][4][2] = 1;
	p[3][2][1][1] = 0;
	p[3][2][1][2] = 0;
	p[3][2][2][1] = 1;
	p[3][2][2][2] = 0;
	p[3][2][3][1] = 0;
	p[3][2][3][2] = 1;
	p[3][2][4][1] = 1;
	p[3][2][4][2] = 1;
	p[3][3][1][1] = 0;
	p[3][3][1][2] = 0;
	p[3][3][2][1] = 1;
	p[3][3][2][2] = 0;
	p[3][3][3][1] = 0;
	p[3][3][3][2] = 1;
	p[3][3][4][1] = 1;
	p[3][3][4][2] = 1;
	p[3][4][1][1] = 0;
	p[3][4][1][2] = 0;
	p[3][4][2][1] = 1;
	p[3][4][2][2] = 0;
	p[3][4][3][1] = 0;
	p[3][4][3][2] = 1;
	p[3][4][4][1] = 1;
	p[3][4][4][2] = 1;
	p[4][1][1][1] = 0;
	p[4][1][1][2] = -1;
	p[4][1][2][1] = 0;
	p[4][1][2][2] = 0;
	p[4][1][3][1] = 0;
	p[4][1][3][2] = 1;
	p[4][1][4][1] = 0;
	p[4][1][4][2] = 2;
	p[4][2][1][1] = -2;
	p[4][2][1][2] = 0;
	p[4][2][2][1] = -1;
	p[4][2][2][2] = 0;
	p[4][2][3][1] = 0;
	p[4][2][3][2] = 0;
	p[4][2][4][1] = 1;
	p[4][2][4][2] = 0;
	p[4][3][1][1] = 0;
	p[4][3][1][2] = -2;
	p[4][3][2][1] = 0;
	p[4][3][2][2] = -1;
	p[4][3][3][1] = 0;
	p[4][3][3][2] = 0;
	p[4][3][4][1] = 0;
	p[4][3][4][2] = 1;
	p[4][4][1][1] = -1;
	p[4][4][1][2] = 0;
	p[4][4][2][1] = 0;
	p[4][4][2][2] = 0;
	p[4][4][3][1] = 1;
	p[4][4][3][2] = 0;
	p[4][4][4][1] = 2;
	p[4][4][4][2] = 0;
	p[5][1][1][1] = 0;
	p[5][1][1][2] = -1;
	p[5][1][2][1] = 0;
	p[5][1][2][2] = 0;
	p[5][1][3][1] = 1;
	p[5][1][3][2] = 0;
	p[5][1][4][1] = 0;
	p[5][1][4][2] = 1;
	p[5][2][1][1] = -1;
	p[5][2][1][2] = 0;
	p[5][2][2][1] = 0;
	p[5][2][2][2] = 0;
	p[5][2][3][1] = 1;
	p[5][2][3][2] = 0;
	p[5][2][4][1] = 0;
	p[5][2][4][2] = 1;
	p[5][3][1][1] = 0;
	p[5][3][1][2] = -1;
	p[5][3][2][1] = -1;
	p[5][3][2][2] = 0;
	p[5][3][3][1] = 0;
	p[5][3][3][2] = 0;
	p[5][3][4][1] = 0;
	p[5][3][4][2] = 1;
	p[5][4][1][1] = 0;
	p[5][4][1][2] = -1;
	p[5][4][2][1] = -1;
	p[5][4][2][2] = 0;
	p[5][4][3][1] = 0;
	p[5][4][3][2] = 0;
	p[5][4][4][1] = 1;
	p[5][4][4][2] = 0;
	p[6][1][1][1] = 0;
	p[6][1][1][2] = -1;
	p[6][1][2][1] = 0;
	p[6][1][2][2] = 0;
	p[6][1][3][1] = 1;
	p[6][1][3][2] = 0;
	p[6][1][4][1] = 1;
	p[6][1][4][2] = 1;
	p[6][2][1][1] = 0;
	p[6][2][1][2] = 0;
	p[6][2][2][1] = 1;
	p[6][2][2][2] = 0;
	p[6][2][3][1] = -1;
	p[6][2][3][2] = 1;
	p[6][2][4][1] = 0;
	p[6][2][4][2] = 1;
	p[6][3][1][1] = -1;
	p[6][3][1][2] = -1;
	p[6][3][2][1] = -1;
	p[6][3][2][2] = 0;
	p[6][3][3][1] = 0;
	p[6][3][3][2] = 0;
	p[6][3][4][1] = 0;
	p[6][3][4][2] = 1;
	p[6][4][1][1] = 0;
	p[6][4][1][2] = -1;
	p[6][4][2][1] = 1;
	p[6][4][2][2] = -1;
	p[6][4][3][1] = -1;
	p[6][4][3][2] = 0;
	p[6][4][4][1] = 0;
	p[6][4][4][2] = 0;
	p[7][1][1][1] = 1;
	p[7][1][1][2] = -1;
	p[7][1][2][1] = 0;
	p[7][1][2][2] = 0;
	p[7][1][3][1] = 1;
	p[7][1][3][2] = 0;
	p[7][1][4][1] = 0;
	p[7][1][4][2] = 1;
	p[7][2][1][1] = -1;
	p[7][2][1][2] = 0;
	p[7][2][2][1] = 0;
	p[7][2][2][2] = 0;
	p[7][2][3][1] = 0;
	p[7][2][3][2] = 1;
	p[7][2][4][1] = 1;
	p[7][2][4][2] = 1;
	p[7][3][1][1] = 0;
	p[7][3][1][2] = -1;
	p[7][3][2][1] = -1;
	p[7][3][2][2] = 0;
	p[7][3][3][1] = 0;
	p[7][3][3][2] = 0;
	p[7][3][4][1] = -1;
	p[7][3][4][2] = 1;
	p[7][4][1][1] = -1;
	p[7][4][1][2] = -1;
	p[7][4][2][1] = 0;
	p[7][4][2][2] = -1;
	p[7][4][3][1] = 0;
	p[7][4][3][2] = 0;
	p[7][4][4][1] = 1;
	p[7][4][4][2] = 0;
}
