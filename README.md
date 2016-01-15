# Crayon

Crayon is a stack-based programming language based on a 2-dimensional output canvas. More spec will come soon, then an interpreter sometime later.

## Spec

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

<<<<<<< HEAD
### [Operators](https://github.com/ETHproductions/Crayon/blob/master/docs/Operators.md)
### [Encoding](https://github.com/ETHproductions/Crayon/blob/master/docs/Encoding.md)
=======
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
| `L` | turn crayon 90° counter-clockwise
| `R` | turn crayon 90° clockwise
| `U` | turn crayon 180°
| `l` | turn crayon 45° counter-clockwise
| `r` | turn crayon 45° clockwise
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

#### Control flow

A conditional expression is used like so:

    =nq{sq+}
    
Let's break that down:

    =         If the top two items are equal,
     nq        move the crayon one position north and draw the top item.
       {      Otherwise,
        sq+    move the crayon one position south, draw the top item, and perform +.
           }  Endif.

You can also skip the else:

    =nq}

Or even skip the truthy case:

    ={sq+}
    
If some actions need to be run regardless of the condition, you can use the delayed conditional `?`:

    =;;nq{;;sq+}
    is the same as
    =;;?nq{sp+}

You can chain conditionals to create AND and OR gates:

    <!nq}}
    <        If the first item is less than the second item,
     !        If the first item is truthy,
      nq       move the crayon one position north and draw the top item.
        }}   End both ifs.

    <nq{!nq}
    <         If the first item is less than the second item,
     nq        move the crayon one position north and draw the top item.
       {!     Otherwise, if the first item is truthy,
         nq    do the same thing.
           }  End if. Note that a { followed by a conditional is parsed
               as "}else if(){" instead of "}else{if(){".

Of course, sometimes this can be cumbersome, as the action must be repeated in both truthy cases of the OR. To get around this, just use an empty conditional:

    <!}nq}
    <       If the first item is less than the second item,
     !}     OR the first item is truthy,
       nq    do this thingy again.
         }  End if.

| Char | Action
| --- | ---
| `=` | equal
| `≠` | not equal
| `<` | lesser
| `>` | greater
| `≤` | lesser-equal
| `≥` | greater-equal
| `!` | top item is truthy
| `¡` | top item is falsy
| `?` | delayed conditional
| `{` | else
| `}` | end-if, end-loop
| `h` | pop `X`, loop through each item `I` and index `i` in `X`*

*If a loop is entered inside another loop, `J` and `j` are used instead.

#### Stack manipulation

| Char | Action
| --- | ---
| `[` | push empty array, stack operations enter this array
| `@` | stack operations enter top array
| `]` | wrap the current stack in an array and push it back onto the main stack
| `\` | swap top two items
| `,` | pop `X`, bring `X`th item to top
| `:` | duplicate top item
| `;` | pop top item

#### Literals

| Char | Action
| --- | ---
| `0-9` | number literals
| `.` | decimal literal, extra functions
| `"` | begin/end string literal
| `'` | char literal
| `#` | byte literal

#### Unary operators

| Char | Type | Action
| --- | --- | ---
| `(` | `N` | decrement
| `(` | `S` | split off first char
| `(` | `A` | split off first item
| `)` | `N` | increment
| `)` | `S` | split off last char
| `)` | `A` | split off last item
| `~` | `N` | binary NOT
| `~` | `A` | keep one of each item
| `_` | `N` | negate
| `_` | `S` | split string into chars
| `_` | `A` | join array with empty strings
| `±` | `N` | no-op
| `±` | `S` | parse string as number
| `±` | `A` | sum

#### Binary operators

| Char | Types | Action
| --- | --- | ---
| `+` | `NN` | add numbers
| `+` | `NS` | concat number to string
| `+` | `NA` | push number to array
| `+` | `SS` | concat strings
| `+` | `SA` | push string to array
| `+` | `AA` | concat arrays
| `-` | `NN` | subtract numbers
| `-` | `NS` | slice string
| `-` | `NA` | slice array
| `-` | `SS` | remove instances of `Y` from `X`
| `-` | `SA` | remove instances of `S` from `A`?
| `-` | `AA` | setwise subtraction; remove items in `B` from `A`
| `*` | `NN` | multiply numbers
| `*` | `NS` | repeat `S` `N` times
| `*` | `AA` | setwise addition; concat arrays, sort, remove duplicates
| `/` | `NN` | divide numbers
| `/` | `NS` | split `S` into groups of `N` chars
| `/` | `NA` | split `A` into groups of `N` items
| `/` | `SS` | split `X` at occurances of `Y`
| `%` | `NN` | take modulo of numbers
| `%` | `NS` | unriffle `S` into `N` groups (`"hweolrllod"2% => ["hello","world"]`)
| `%` | `NA` | unriffle `A` into `N` groups
| `%` | `SS` | index of `Y` in `X`
| `^` | `NN` | binary XOR
| `^` | `AA` | setwise XOR; keep one of each item that exists in one array but not the other
| `&` | `NN` | binary AND
| `&` | `AA` | setwise AND; keep one of each item that exists in both arrays
| `|` | `NN` | binary OR
| `|` | `AA` | setwise OR; keep one of each item that exists in either array
>>>>>>> origin/master

More spec to come.... Suggestions are welcome for anything!
