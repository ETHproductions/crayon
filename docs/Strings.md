#### Spec
- [Data types](https://github.com/ETHproductions/Crayon/blob/master/docs/Data%20types.md)
  - [**Strings**](https://github.com/ETHproductions/Crayon/blob/master/docs/Strings.md)
  - [Regexes](https://github.com/ETHproductions/Crayon/blob/master/docs/Regexes.md)
- [Operators](https://github.com/ETHproductions/Crayon/blob/master/docs/Operators.md)
- [Encoding](https://github.com/ETHproductions/Crayon/blob/master/docs/Encoding.md)

**Please note:** This spec is a draft; any detail may change without warning.

### Strings

Strings in Crayon are a lot like strings in many other languages. A string literal is formed with double quotation marks, like `"Hello, World!"`.

#### Patterns

Patterns are stored as ordinary strings. However, when drawing them on the canvas, there are a few specific changes made:

\- Newlines are not drawn onto the canvas as newlines; instead, the next line of the pattern is drawn direcly below the current one. For example:

    Drawing   on      at     becomes
    abc       #####   x:1    #####
    def       #####   y:1    #abc#
              #####   d:E    #def#
    
\- Spaces are not drawn onto the canvas, either:

    Drawing   on      at     becomes
    ab        #####   x:1    #####
     cd       #####   y:1    #ab##
              #####   d:E    ##cd#
    
However, if you use a non-breaking space (`\x1F` or `¶`), it will overwrite the character underneath it.

\- Patterns are drawn in the direction of the cursor. For example:

    Drawing   on      at     becomes
    abcd      ####    x:0    ###d
              ####    y:3    ##c#
              ####    d:NE   #b##
              ####           a###

The crayon is then moved one space past the end of the pattern, to (x:4, y:-1).

\- If the pattern goes off the edge of the canvas (even into negative coordinates), the canvas is extended in that direction. The origin stays where it was previously.
