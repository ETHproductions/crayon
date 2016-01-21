#### Spec
- [Main page](https://github.com/ETHproductions/Crayon/blob/master/README.md)
- Operators
- [Encoding](https://github.com/ETHproductions/Crayon/blob/master/docs/Encoding.md)

### Output manipulation

| Char* | Action
| --- | ---
| dn  | point crayon N
| ds  | point crayon S
| de  | point crayon E
| dw  | point crayon W
| `n` | move crayon N by 1
| `s` | move crayon S by 1
| `e` | move crayon E by 1
| `w` | move crayon W by 1
| tl1 | turn crayon 45° counter-clockwise
| tl2 | turn crayon 90° counter-clockwise
| tl3 | turn crayon 135° counter-clockwise
| tu4 | turn crayon 180°
| tr3 | turn crayon 135° clockwise
| tr2 | turn crayon 90° clockwise
| tr1 | turn crayon 45° clockwise
| xnl | start next line
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

*For more information on positional and directional control chars, see [Encoding](https://github.com/ETHproductions/Crayon/blob/master/docs/Encoding)

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
			  The latter can be forced by adding a space between the items.

Of course, sometimes this can be cumbersome, as the action must be repeated in both truthy cases of the OR. To get around this, just use an empty conditional:

    <!}nq}
    <       If the first item is less than the second item,
     !}     OR the first item is truthy,
       nq    do this thingy again.
         }  End if.

| Char | Action
| --- | ---
| `=` | equal
| `$=` | not equal
| `<` | lesser
| `>` | greater
| `$<` | lesser-equal
| `$>` | greater-equal
| `!` | top item is truthy
| `$!` | top item is falsy
| `?` | delayed conditional
| `{` | else
| `}` | end-if, end-loop
| `o` | pop `X`, loop through each item `I` and index `i` in `X`*
| `O` | perform `o`, but push `I` onto the stack before each iteration*

*If a loop is entered inside another loop, `J` and `j` are used instead.

#### Meta-operators

| Char | Types | Action
| --- | --- | ---
| TBA | `N` | map next char over `0..N`
| TBA | `S` | map next char over each char in `S`
| TBA | `A` | map next char over all items in `A`

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
| `#` | byte literal?
| `$p` | pi (3.141592...)
| `$q` | golden ratio (1.618034...)

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
| `~` | `S` | TBA
| `~` | `A` | uniquify; keep one of each item
| `_` | `N` | negate
| `_` | `S` | split string into chars
| `_` | `A` | join array with empty strings
| `$+` | `N` | no-op
| `$+` | `S` | parse string as number
| `$+` | `A` | sum
| `$d` | `N` | convert from degrees to radians (`π*180/`)

#### Binary operators

| Char | Types | Action
| --- | --- | ---
| `+` | `NN` | add numbers
| `+` | `NS` | increment each char code in `S` by `N`
| `+` | `NA` | perform `N+` on each item in `A`
| `+` | `SS` | concat strings
| `+` | `SA` | TBA
| `+` | `AA` | concat arrays
| `-` | `NN` | subtract numbers
| `-` | `NS` | decrement each char code in `S` by `N`
| `-` | `NA` | perform `N-` on each item in `A`
| `-` | `SS` | remove instances of `Y` from `X`
| `-` | `SA` | remove instances of `S` from `A`?
| `-` | `AA` | setwise subtraction; remove items in `B` from `A`
| `*` | `NN` | multiply numbers
| `*` | `NS` | repeat `S` `N` times
| `*` | `NA` | repeat `A` `N` times
| `*` | `AA` | setwise addition; concat arrays, sort, remove duplicates
| `/` | `NN` | divide numbers
| `/` | `NS` | split `S` into groups of `N` chars
| `/` | `NA` | split `A` into groups of `N` items
| `/` | `SS` | split `X` at occurances of `Y`
| `/` | `SA` | join `A` with `S`?
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
| TBA | `NN` | bit-shift `A` left by `B` bits
| TBA | `NN` | bit-shift `A` right by `B` bits
| TBA | `AO` | append `O` to `A`
| TBA | `AO` | prepend `O` to `A`
| TBA | `NS` | slice string
| TBA | `NA` | slice array

More spec to come.... Suggestions are welcome for operator tasks (or anything else)!
