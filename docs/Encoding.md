#### Spec
- [Main page](https://github.com/ETHproductions/Crayon/blob/master/README.md)
- [Operators](https://github.com/ETHproductions/Crayon/blob/master/docs/Operators.md)
- Encoding

### Encoding

Crayon uses custom positional and directional chars in the range 00-1F:

    Hex Name  Task (r-down means down relative to the cursor, i.e. at a 90 degree angle.)
    00  rst   Reset all directional and positional changes made to the cursor.
	01  de    Point the cursor east (to the right).
	02  dse   Point the cursor south-east.
	03  ds    Point the cursor south.
	04  dsw   Point the cursor south-west.
	05  dw    Point the cursor west.
	06  dnw   Point the cursor north-west.
	07  dn    Point the cursor north.
	08  dne   Point the cursor north-east.
	09  anc   This is the "anchor" (or "origin") of a pattern when drawn onto the canvas. If not specified, the default is 0,0 (the top left corner).
	0A  nl    Move r-down one line, with respect to the direction of the cursor, and to the beginning of the line.
	0B  tab   Move the cursor forward to the nearest tab marker. This is, by default, every 4th char.
	0C  vtb   Move the cursor r-down to the nearest vertical tab marker. Almost the same as tab.
	0D  cr    Move the cursor back to the beginning of the line.
	0E  rnl   Same as nl, but move r-up instead of r-down.
	0F  xnl   Reset the cursor completely and move to the beginning of the next line.
	10  sd    Slide the cursor r-down by one row.
	11  su    Slide the cursor r-up by one row.
	12  tr1   Turn the cursor to the right by 45 degrees.
	13  tr2   Turn the cursor to the right by 90 degrees.
	14  tr3   Turn the cursor to the right by 135 degrees.
	15  tu4   Turn the cursor around (by 180 degrees).
	16  tl3   Turn the cursor to the left by 135 degrees.
	17  tl2   Turn the cursor to the left by 90 degrees.
	18  tl1   Turn the cursor to the right by 45 degrees.
	1F  nbsp  When the pattern is drawn onto the canvas, overwrite the character underneath with a space.
	20  sp    When the pattern is drawn onto the canvas, leave the character underneath untouched.

Each of these chars will probably have a visual equivalent (except newline, tab, and/or nbsp). The rest of the encoding abides with the ISO-8859-1 format, but only chars in the range 00-7E are used (except in compressed strings).

Characters currently not assigned to a task:

    AaCcDdEGgHhLlNRrSTtUuVvWZz`