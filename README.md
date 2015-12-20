# Crayon

Crayon is a stack-based programming language based on a 2-dimensional output canvas. More spec will come soon, then an interpreter sometime later.

## Spec

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

#### Output manipulation

| Char | Action
| --- | ---
| `N` | point cursor N
| `S` | point cursor S
| `E` | point cursor E
| `W` | point cursor W
| `n` | move cursor N by 1
| `s` | move cursor S by 1
| `e` | move cursor E by 1
| `w` | move cursor W by 1
| `L` | turn cursor 90° counter|clockwise
| `R` | turn cursor 90° clockwise
| `U` | turn cursor 180°
| `l` | turn cursor 45° counter|clockwise
| `r` | turn cursor 45° counter|clockwise
| `u` | start next line
| `f` | move cursor forward by 1
| `F` | pop `X`, move cursor forward by `X`
| `m` | pop `X`, pop `Y`, move cursor by (x: `X`, y: `Y`)
| `M` | pop `X`, pop `Y`, move cursor to (x: `X`, y: `Y`)
| `x` | pop `X`, move cursor by (x: `X`)
| `y` | pop `Y`, move cursor by (y: `Y`)
| `X` | pop `X`, set cursor X to `X`
| `Y` | pop `Y`, set cursor Y to `Y`
| `q` | pop `X`, draw pattern `X` at cursor, push `X`
| `Q` | pop `X`, fill canvas with pattern `X`, push `X`
| `k` | push canvas as pattern
| `K` | pop `X`, set canvas to pattern `X`
| `P` | pop `X`, pretend `X` is the canvas, push `X`
| `p` | quit pretending

More spec to come...
