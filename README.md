# Crayon

Crayon is a stack-based programming language based on a 2-dimensional output canvas of text.

## [Spec](https://ethproductions.github.io/crayon/docs)
- [Data types](https://ethproductions.github.io/crayon/docs/types)
- [Operators](https://ethproductions.github.io/crayon/docs/operators)
- [Encoding](https://ethproductions.github.io/crayon/docs/encoding)

Nothing in the spec is finalized. Suggestions are welcome for anything.

## Installation

1. Make sure you have [Node.js](https://nodejs.org) and `npm` installed.
2. Clone this repo to your computer.
3. Using the command line, navigate to the repo folder and run `npm install -g`.

## Usage

    $ crayon <code file>[ <input file>][ <arg1>[ <arg2> ...]]
	
Examples:

	$ crayon test/hello.crayon
	$ crayon test/input.crayon test/input.txt
	$ crayon test/args.crayon 123
