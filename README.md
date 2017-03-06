# Crayon

Crayon is a stack-based programming language based on a 2-dimensional output canvas of text.

## [Spec](https://ethproductions.github.io/crayon/docs)
- [Data types](https://ethproductions.github.io/crayon/docs/types)
- [Operators](https://ethproductions.github.io/crayon/docs/operators)
- [Encoding](https://ethproductions.github.io/crayon/docs/encoding)

Nothing in the spec is finalized. Suggestions are welcome for anything.

## [Reference](https://github.com/ETHproductions/crayon/blob/master/info.txt)

This contains all commands that have been implemented thus far.

## Installation

    $ npm install crayon-lang -g

## Usage

    $ crayon f <file> <inputs>
    $ crayon fi <file> <STDIN file> <inputs>
	$ crayon e <code> <inputs>
	$ crayon ei <code> <STDIN file> <inputs>
	
Examples:

	$ crayon f test/hello.crayon
	$ crayon fi test/input.crayon test/input.txt
	$ crayon f test/args.crayon Crayon
