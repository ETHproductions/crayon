#### Spec
- [Data types](https://github.com/ETHproductions/Crayon/blob/master/docs/Data%20types.md)
- [**Operators**](https://github.com/ETHproductions/Crayon/blob/master/docs/Operators.md)
- [Encoding](https://github.com/ETHproductions/Crayon/blob/master/docs/Encoding.md)

**Please note:** This spec is a draft; any detail may change without warning.

### Canvas manipulation

    Char  Action
    dn*   Point crayon N.
    ds*   Point crayon S.
    de*   Point crayon E.
    dw*   Point crayon W.
    n     Move crayon N by 1.
    s     Move crayon S by 1.
    e     Move crayon E by 1.
    w     Move crayon W by 1.
    tl1*  Turn crayon 45° counter-clockwise.
    tl2*  Turn crayon 90° counter-clockwise.
    tl3*  Turn crayon 135° counter-clockwise.
    tu4*  Turn crayon 180°.
    tr3*  Turn crayon 135° clockwise.
    tr2*  Turn crayon 90° clockwise.
    tr1*  Turn crayon 45° clockwise.
    xnl*  Start next line.
    f     Move crayon forward by 1.
    F     Pop X, move crayon forward by X.
    m     Pop X, pop Y, move crayon by (x: X, y: Y).
    M     Pop X, pop Y, move crayon to (x: X, y: Y).
    x     Pop X, move crayon by (x: X).
    y     Pop Y, move crayon by (y: Y).
    X     Pop X, set crayon X to X.
    Y     Pop Y, set crayon Y to Y.
    q     Draw pattern X at crayon.
    Q     Fill canvas with pattern X.
    k     Push canvas as pattern.
    K     Pop X, set canvas to pattern X.
    P     Pretend the top item is the canvas.
    p     Quit pretending.
    D     Drawing commands, determined by next character.
    d     More drawing commands.

*For more information on these positional and directional control chars, see [Encoding](https://github.com/ETHproductions/Crayon/blob/master/docs/Encoding.md).

#### Control flow

A conditional expression is used like so:

    =?nq{sq+}

Let's break that down:

    =?         If the top two items are equal,
      nq        move the crayon one position north and draw the top item.
        {      Otherwise,
         sq+    move the crayon one position south, draw the top item, and perform +.
            }  Endif.

You can also skip the else:

    =?nq}

Or even skip the truthy case:

    =?{sq+}
    =!?sq+}    Equivalent to the above.

If some actions need to be run regardless of the condition, you can delay the conditional:

    =?;;nq{;;sq+}
    is the same as
    =@;;?nq{sp+}

You can chain conditionals to create AND and OR gates:

    <a?nq}
    <        Push (first item is less than the second item).
     a       Pop A, pop B, push A&&B.
      ?      If the top item is truthy:
       nq      move the crayon one position north and draw the top item.
         }   End if.

    <z?nq}
    <        Push (first item is less than the second item).
     z       Pop A, pop B, push A||B.
      ?      If the top item is truthy:
       nq      move the crayon one position north and draw the top item.
         }   End if.

The conditional and control flow chars:

    Char  Action
    =     Equal. Push 1 if the top two items are equal; 0 otherwise.
    <     Less. Push 1 if the top item is less than the second; 0 otherwise.
    >     Greater. Push 1 if the top item is greater than the second; 0 otherwise.
    TBA   Comparison. Push 1 if the top item is greater than the second; -1 if the top item is less than the second; 0 otherwise.
    !     Logical NOT. Pop A, push 0 if A is truthy, 1 otherwise.
    a     Logical AND. Pop A, pop B, push A if A is falsy, B otherwise.
    z     Logical OR. Pop A, pop B, push A if A is truthy, B otherwise.
    ?     Start conditional. Pop the top item; if truthy...
    {     Conditional else.
    }     End-if, end-loop.
    o     Pop X; loop through each item I and index i in X.*
    O     Perform o, but push I onto the stack before each iteration.*
    W     While loop; repeat until the top of the stack is falsy...

*If a loop is entered inside another loop, `J` and `j` are used instead.

#### Meta-operators

    Char  Type   Action
    TBA   <num>  Map next char over 0..A.
    TBA   <str>  Map next char over each char in A.
    TBA   <lst>  Map next char over each item in A.
    TBA   <num>  Reduce next char over 0..A?
    TBA   <str>  Reduce next char over each char in A.
    TBA   <lst>  Reduce next char over each item in A.
    TBA   <num>  Cum-reduce next char over 0..A?
    TBA   <str>  Cum-reduce next char over each char in A.
    TBA   <lst>  Cum-reduce next char over each item in A.

#### Stack manipulation

    Char  Action
    [     Push empty array. Stack operations enter this array.
    _     Stack operations enter top array.
    #     Pop A; wrap top A items in array.
    ]     Wrap the current stack in an array and push it back onto the main stack.
    \     Swap top two items.
    @     Rotate top three items.
    ,     Pop A; bring Ath item to top.
    :     Duplicate top item.
    ;     Remove top item.

#### Literals

    Char  Action
    0-9   number literals
    .     decimal literal, extra functions
    "     begin/end string literal
    `     char literal
    '     regex literal
    $p    pi (3.141592...)
    $q    golden ratio (1.618034...)
    $e    e (2.718281...)

#### Unary operators

    Char  Type   Action
    (     <num>  Decrement.
    (     <str>  Split off first char. ("abc"( => "a","bc")
    (     <lst>  Split off first item.
    )     <num>  Increment.
    )     <str>  Split off last char.
    )     <lst>  Split off last item.
    ~     <num>  Negate.
    ~     <str>  Uniquify; keep one of each char.
    ~     <lst>  Uniquify; keep one of each item.
    N     <num>  No-op.
    N     <str>  Parse string as base-10 number.
    N     <lst>  Sum.
    S     <num>  Convert number to string.
    S     <str>  No-op.
    S     <lst>  Join array with empty string.
    A     <num>  Create range 0..A.
    A     <str>  Split string into chars.
    A     <lst>  No-op.
    .d    <num>  convert from degrees to radians ($p*180/)
    .D    <num>  convert to degrees from radians ($p/180*)

#### Binary operators

Unless two distinct operations are assigned to `<X> <Y>` and `<Y> <X>`, the operands can be in either order.

    Char  Stack         Action
    +     <num> <num>   Addition. + in JS.
    +     <num> <str>   Concat str(A) to the beginning of B. + in JS.
    +     <str> <num>   Concat str(B) to the end of A. + in JS.
    +     <str> <str>   Concatenation. + in JS.
    +     <any> <lst>   Prepend A to B.
    +     <lst> <any>   Append B to A.
    +     <lst> <lst>   Concatenation.
    -     <num> <num>   Subtraction. - in JS.
    -     <num> <str>   Slice. If A is negative, remove all but the last A chars of B; otherwise, remove the first A chars of B.
    -     <str> <num>   Slice. If B is negative, remove all but the first B chars of A; otherwise, remove the last B chars of A.
    -     <num> <lst>   Slice. If A is negative, remove all but the last A items of B; otherwise, remove the first A items of B.
    -     <lst> <num>   Slice. If B is negative, remove all but the first B items of A; otherwise, remove the last B items of A.
    -     <str> <str>   Remove. Remove instances of B from A.
    -     <lst> <any>   Remove. Remove instances of B from A.
    -     <lst> <lst>   Setwise subtraction. Remove items in B from A.
    *     <num> <num>   Multiply. * in JS.
    *     <num> <str>   Repeat. Concat A copies of B.
    *     <num> <lst>   Repeat. Concat A copies of B.
    *     <str> <str>   Setwise addition. Concat, sort (?), uniquify.
    *     <lst> <lst>   Setwise addition. Concat, sort (?), uniquify.
    *     <str> <lst>   Join. Join B with A.
    /     <num> <num>   Division. / in JS.
    /     <num> <str>   Split B into groups of A chars. ("abcdefg"3/ => ["abc","def","g"])
    /     <num> <lst>   Split B into groups of A items.
    /     <str> <str>   Split A at occurances of B.
    /     <lst> <lst>   Pair lists? ([0 1 2][3 4 5]/ => [[0,3],[1,4],[2,5]])
    %     <num> <num>   Modulo. % in JS.
    %     <num> <str>   Unriffle B into A groups. ("hweolrllod"2% => ["hello","world"])
    %     <num> <lst>   Unriffle B into A groups.
    %     <str> <str>   Find the index of B in A.
    ^     <num> <num>   Binary XOR. ^ in JS.
    ^     <str> <str>   Setwise XOR. Keep one of each char that exists in one but not the other.
    ^     <lst> <lst>   Setwise XOR. Keep one of each item that exists in one but not the other.
    &     <num> <num>   Binary AND. & in JS.
    &     <str> <str>   Setwise AND. Keep one of each char that exists in both.
    &     <lst> <lst>   Setwise AND. Keep one of each item that exists in both.
    |     <num> <num>   Binary OR. | in JS.
    |     <str> <str>   Setwise OR. Keep one of each char that exists in either.
    |     <lst> <lst>   Setwise OR. Keep one of each item that exists in either.
    .*    <str> <str>   Setwise multiplication. Pair each char in A with each char in B. ("ABC""ab".* => ["Aa","Ba","Ca","Ab","Bb","Cb"])
    .*    <lst> <lst>   Setwise multiplication. Pair each item in A with each item in B. ([0 1 2][3 4].* => [[0,3],[0,4],[1,3],[1,4],[2,3],[2,4]])
    .<    <num> <num>   Bit-shift A left by B bits.
    .>    <num> <num>   Bit-shift A right by B bits.
    B     <num> <num>   Convert A to array of base-B digits.
    b     <num> <num>   Convert A to base-B string.
    B     <str> <num>   Convert A from base B to array of base-10 digits.
    b     <str> <num>   Convert A from base B to base-10 number.
    B     <lst> <num>   Convert A to base-B string.
    b     <lst> <num>   Convert A from base B to base-10 number.

Characters currently not assigned to a task:

    CcEGgHhLlTtUuVvZ

More operators to come.... Suggestions are welcome for operators, operations, or anything else.
