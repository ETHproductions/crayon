#### Spec
- [Data types](https://github.com/ETHproductions/Crayon/blob/master/docs/Data%20types.md)
  - [Strings](https://github.com/ETHproductions/Crayon/blob/master/docs/Strings.md)
  - [**Regexes**](https://github.com/ETHproductions/Crayon/blob/master/docs/Regexes.md)
- [Operators](https://github.com/ETHproductions/Crayon/blob/master/docs/Operators.md)
- [Encoding](https://github.com/ETHproductions/Crayon/blob/master/docs/Encoding.md)

**Please note:** This spec is a draft; any detail may change without warning.

### Regexes

Regexes in Crayon are, for the most part, like regexes in most other languages. A regex literal is formed with backticks, like ``'g'abc'``. However, Crayon also has a bunch of 2d-ish features which will be written up in more detail soon.

#### Syntax

A regex literal is created in the format ``'g'abc'``. The first section is the **flags** to use in the regex, and the second is the regex itself. The first apostrophe can be omitted entirely if there are no necessary flags and the regex contains at least one non-flag character.

So that backslashes can be used without escaping, backticks are used instead. A literal left parenthesis would be `` `(``, and a literal backtick would be ``` `` ```.

##### Normal flags

- `g` - Make regex _un_-global. Global is the default.
- `i` - Make regex case-insensitive.
- `m` - Instead of matching a string with newlines in two dimensions, treat newlines as normal characters.

##### Directional flags

- `t` - Match the regex starting in any horizontal or vertical direction.
- `x` - Match the regex starting in any diagonal direction.
- `d` - Match the regex starting in any direction.
- (directional char) - Match the regex starting in this direction.
- (none of these) - Match the regex starting to the east.

##### Match counter

Wrapping a section of the regex in `<>` results in the interpreter remembering the number of times this section is matched. This can then be accessed with `%n` to match the previous group that many times. For example, ``` 'g'<a>+b%1' ``` matches one or more `a`s, then the same number of `b`s.

### Examples

To match any diamond made of slashes, e.g.

    /\  /\    /\
    \/ /  \  /  \
       \  / /    \
        \/  \    /
             \  /
              \/

You could use this regex:

    'gA'(<\>+B/%1B)`1'

where `A` is the `0x02` char (south-east directional), and `B` is the `0x13` char (90-degree clockwise turn).

    'gA'      Match this regex globally, and start with the cursor pointed south-east.
    <\>+      Match multiple backslashes and keep track of how many we've found in %1.
    B         Turn 90 degrees clockwise.
    /%1       Match as many forward-slashes as backslashes we found earlier.
    B         Turn 90 degrees clockwise again.
    (    )    Capture all of this in group `1.
    `1        Match group `1 a second time.

To match any rectangle of this format:

    +----+
    |    |
    +----+

You could use this regex:

    'g'(-+`+B`|+`+B)`1'

where again, `B` is the `0x13` char (90-degree clockwise turn).

    'g'       Match this regex globally.
    -+`+      Match at least one dash, then a plus sign.
    B         Turn 90 degrees clockwise.
    `|+`+     Match at least one vertical line, then a plus sign.
    B         Turn 90 degrees clockwise again.
    (     )   Capture all this in group `1.
    `1        Match group `1 a second time.

More spec to come; suggestions are welcome for anything.
