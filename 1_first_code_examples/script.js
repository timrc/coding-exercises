function run() {
	var container = document.getElementById('container');

	renderBulletPoints(container, [
		'Run executes each line once, running from top to bottom',
		'print is a function -- like a verb in the code',
		'Numbers within the parenthesis ( ... ) are passed in to the print function',
		'Multiple values separated by commas'
	], 'First Code Example - Print', 'Here is code which calls the "print" function. Click the Run button below, and your computer will run this code, and the output of the code will appear to the right.')
	

	renderRunnable(container, 'ex-1', `print(6);
print(1, 2);`);

	renderBulletPoints(container, [
		'Thus far we have numbers, e.g. 6',
		`A string is a sequence of letters written within quotes to be used as data within the code,
&nbsp;&nbsp;&nbsp;&nbsp;- e.g. "hello"
&nbsp;&nbsp;&nbsp;&nbsp;- Strings work with the print function, in addition to numbers
&nbsp;&nbsp;&nbsp;&nbsp;- Strings in the computer store text, such as urls or the text of paragraphs, etc.`,
		'A comment begins with // and extends through the end of the line. A way to write notes about the code, ignored by the computer.',
		`Experiments:,
&nbsp;&nbsp;&nbsp;&nbsp;- Edit the text within a string
&nbsp;&nbsp;&nbsp;&nbsp;- Add more strings separated by commas
&nbsp;&nbsp;&nbsp;&nbsp;- Add the string "print" - inside of string is just data, not treated as code`,
		`Code vs. Data
&nbsp;&nbsp;&nbsp;&nbsp;- Code = instructions that are Run
&nbsp;&nbsp;&nbsp;&nbsp;- Data = passive numbers, strings, handled by the code`
	], 'Print String');
	

	renderRunnable(container, 'ex-2', `// The line below prints one number and one string
print(6, "hi");
print("hello", 2, "bye");`);

	renderRunnable(container, 'code-1', `print("a");
prlnt("b", "b");
print("c", "c", "c");`, `a
b b
c c c`, 'Syntax Error', 'The code examples below should print, but they all have syntax errors. Please fix them.');
	renderRunnable(container, 'code-2', `print("a");
print("b", "b);
print("c", "c", "c");`);
	renderRunnable(container, 'code-3', `print("a");
print("b", "b");
print("c", "c", "c";`);
	renderRunnable(container, 'code-4', `print("a");
print("b" "b");
print("c", "c", "c");`);
	renderRunnable(container, 'code-5', `// This one has two syntax errors
print("a");
pront("b", "b");
print("c", "c", "c";`);
	renderRunnable(container, 'code-6', `print("a");
print(, "b");
print("c", "c", "c");`);

	renderTest(container, 'test-1', `print(1, "hi");`, `1 2 buckle
3 4 knock`, `print(1, 2, "buckle");
print(3, 4, "knock");`, 'Example Test', 'Change the code below so, when run, it produces the following output');

	renderTest(container, 'test-2', `print(1, "hi");`, `1 2 hello`, '', 'Test 1', 'Change the "print" code below so it produces the following output when run');
	renderTest(container, 'test-3', `print(1);`, `1
1 2
1 2 3

print(1);
 
`, '', 'Test 2', 'Change the "print" code below so it produces the following output when run');

}





