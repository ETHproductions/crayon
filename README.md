# Crayon

Crayon is a stack-based programming language based on a 2-dimensional output canvas. More spec will come soon, then an interpreter sometime later.

## Spec
- Main page
- [Operators](https://github.com/ETHproductions/Crayon/blob/master/docs/Operators.md)
- [Encoding](https://github.com/ETHproductions/Crayon/blob/master/docs/Encoding.md)

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
    
However, if you use a non-breaking space (`\x1F`), it will overwrite the character underneath it.

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

More spec to come.... Suggestions are welcome for anything!
