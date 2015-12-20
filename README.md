# Crayon

Crayon is a stack-based programming language based on a 2-dimensional output canvas. More spec will come soon, then an interpreter sometime later.

## Spec

#### Encoding

Crayon uses a custom encoding which is currently unfinished. Here is the table so far: (`?` denotes unassigned code point)

        x0  x1  x2  x3  x4  x5  x6  x7  x8  x9  xA  xB  xC  xD  xE  xF
    0x  ?   ?   ?   ?   ?   ?   ?   ?   ?   ?   nl  ?   ?   ?   ?   ?
    1x  ?   ?   ?   ?   ?   ?   ?   ?   ?   ?   ?   ?   ?   ?   ?   ?
    2x  sp  !   "   #   $   %   &   '   (   )   *   +   ,   -   .   /
    3x  0   1   2   3   4   5   6   7   8   9   :   ;   <   =   >   question mark
    4x  @   A   B   C   D   E   F   G   H   I   J   K   L   M   N   O
    5x  P   Q   R   S   T   U   V   W   X   Y   Z   [   \   ]   ^   _
    6x  `   a   b   c   d   e   f   g   h   i   j   k   l   m   n   o
    7x  p   q   r   s   t   u   v   w   x   y   z   {   |   }   ~   ?
    8x  ?   ?   ?   ?   ?   ?   ?   ?   ?   ?   ?   ?   ?   ?   ?   ?
    9x  ?   ?   ?   ?   ?   ?   ?   ?   ?   ?   ?   ?   ?   ?   ?   ?
    Ax nbsp ?   ?   ?   ?   ?   ?   ?   ?   ?   ?   ?   ?   ?   ?   ?
    Bx  ?   ?   ?   ?   ?   ?   ?   ?   ?   ?   ?   ?   ?   ?   ?   ?
    Cx  ?   ?   ?   ?   ?   ?   ?   ?   ?   ?   ?   ?   ?   ?   ?   ?
    Dx  ?   ?   ?   ?   ?   ?   ?   ?   ?   ?   ?   ?   ?   ?   ?   ?
    Ex  ?   ?   ?   ?   ?   ?   ?   ?   ?   ?   ?   ?   ?   ?   ?   ?
    Fx  ?   ?   ?   ?   ?   ?   ?   ?   ?   ?   ?   ?   ?   ?   ?   ?

#### Data types

There are three main data types in Crayon:

- String/Pattern: Used like strings in most other languages, but have special properties when drawn to the canvas.
- Number: Floating-point numbers, handled as in JS.
- Array: An array of strings, numbers, and/or arrays. The stack is an array of sorts.

#### Patterns

Patterns are stored as ordinary strings. However, when drawing them on the canvas, there are a few specific changes made:

\- Newlines are not drawn onto the canvas as newlines; instead, the next line of the pattern is drawn direcly below the current one. For example, drawing the pattern

    abc
    def

on the canvas

    12345
    23456
    34567
    
at (x:1, y:1) results in:

    12345
    2abc6
    3def7
    
\- Spaces are not drawn onto the canvas, either. Drawing

    ab 
     cd

on the canvas

    12345
    23456
    34567
    
at (x:1, y:1) results in:

    12345
    2ab56
    34cd7
    
However, if you use a non-breaking space (`\xA0`), it will overwrite the character underneath it.

\- Patterns are drawn in the direction of the cursor. For example, if you draw

    abcd
    
onto the canvas

    1234
    2345
    3456
    4567

while the crayon is at (x:0, y:3) and pointing NE, the result will be:

    123d
    23c5
    3b56
    a567
    
The crayon is then moved one space past the end of the pattern, to (x:4, y:-1).

#### Output manipulation

| Char | Action
| --- | ---
| `N` | point crayon N
| `S` | point crayon S
| `E` | point crayon E
| `W` | point crayon W
| `n` | move crayon N by 1
| `s` | move crayon S by 1
| `e` | move crayon E by 1
| `w` | move crayon W by 1
| `L` | turn crayon 90° counter|clockwise
| `R` | turn crayon 90° clockwise
| `U` | turn crayon 180°
| `l` | turn crayon 45° counter|clockwise
| `r` | turn crayon 45° counter|clockwise
| `u` | start next line
| `f` | move crayon forward by 1
| `F` | pop `X`, move crayon forward by `X`
| `m` | pop `X`, pop `Y`, move crayon by (x: `X`, y: `Y`)
| `M` | pop `X`, pop `Y`, move crayon to (x: `X`, y: `Y`)
| `x` | pop `X`, move crayon by (x: `X`)
| `y` | pop `Y`, move crayon by (y: `Y`)
| `X` | pop `X`, set crayon X to `X`
| `Y` | pop `Y`, set crayon Y to `Y`
| `q` | pop `X`, draw pattern `X` at crayon, push `X`
| `Q` | pop `X`, fill canvas with pattern `X`, push `X`
| `k` | push canvas as pattern
| `K` | pop `X`, set canvas to pattern `X`
| `P` | pretend the top item is the canvas
| `p` | quit pretending

More spec to come...
