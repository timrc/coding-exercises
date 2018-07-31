function run() {
	var container = document.getElementById('container');

    render(container, [
    	_title('First Code Example - Print'),
    	_text('Here is code which calls the "print" function. Click the Run button below, and your computer will run this code, and the output of the code will appear to the right.'),
    	_listWrapped([
			'Run executes each line once, running from top to bottom',
			'print is a function -- like a verb in the code',
			'Numbers within the parenthesis ( ... ) are passed in to the print function',
			'Multiple values separated by commas'
		]),
		_interactionBox(`print(6);
print(1, 2);`, ''),
	])

    render(container, [
    	_title('Print String'),
		_listWrapped([
			'Thus far we have numbers, e.g. 6',
			[
				'A string is a sequence of letters written within quotes to be used as data within the code',
				[
					'e.g. "hello"',
					'Strings work with the print function, in addition to numbers',
					'Strings in the computer store text, such as urls or the text of paragraphs, etc.',
				],
			],
			'A comment begins with // and extends through the end of the line. A way to write notes about the code, ignored by the computer.',
			[
				'Experiments:',
				[
					'Edit the text within a string',
					'Add more strings separated by commas',
					'Add the string "print" - inside of string is just data, not treated as code',
				],
			],
			[
				'Code vs. Data',
				[
					'Code = instructions that are Run',
					'Data = passive numbers, strings, handled by the code',
				],
			]
		]),
		_interactionBox(`// The line below prints one number and one string
print(6, "hi");
print("hello", 2, "bye");`)
    ]);

    render(container, [
    	_title('Syntax Error'),
    	_text('The code examples below should print, but they all have syntax errors. Please fix them'),
    	_block(`a
b b
c c c`),
		_interactionBox(`print("a");
prlnt("b", "b");
print("c", "c", "c");`),
		_interactionBox(`print("a");
print("b", "b);
print("c", "c", "c");`),
		_interactionBox(`print("a");
print("b", "b");
print("c", "c", "c";`),
		_interactionBox(`print("a");
print("b" "b");
print("c", "c", "c");`),
		_interactionBox(`// This one has two syntax errors
print("a");
pront("b", "b");
print("c", "c", "c";`),
		_interactionBox(`print("a");
print(, "b");
print("c", "c", "c");`),
	]);

    render(container, [
    	_title('Example Test'),
    	_text('Change the code below so, when run, it produces the following output'),
		_block(`1 2 buckle
3 4 knock`),
		_interactionBox(`print(1, "hi");`, `print(1, 2, "buckle");
print(3, 4, "knock");`)
	]);

    render(container, [
    	_title('Test 1'),
    	_text('Change the code below so, when run, it produces the following output'),
		_block('1 2 hello'),
		_interactionBox(`print(1, "hi");`),
	]);

    render(container, [
    	_title('Test 2'),
    	_text('Change the "print" code below so it produces the following output when run'),
		_block(`1
1 2
1 2 3

print(1);`),
		_interactionBox(`print(1);`),
	]);
}





