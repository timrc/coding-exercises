function run() {
	var container = document.getElementById('container');

	renderBulletPoints(container, [
		'A "variable" is like a box that holds a value',
		'x = 7;',
		'This stores the value 7 into the variable (i.e. box) x',
		'Later x in the code retrieve the value from the box',
		'x becomes a shorthand for 7 (whatever is in the box)',
		'Using = in this way is called "variable assignment"',
	], 'Code Variables', '')
	

	renderRunnable(container, 'ex-1', `x = 7;
print(x);
print("lucky", x);
print("x is", x);`, '', 'Variables', 'Variables work as a shorthand -- we = assign a value into a variable, and then use that variable on later lines to retrieve that value. In the simplest case, this just works to avoid repeating a value: we store the value once, and then can use it many times. All computer languages have some form of variable like this -- storing and retrieving values.');

	renderTest(container, 'test-1', `print(1, 2, "hi");`, `Alice Alice Alice
I had a crush on Alice`, `x = "Alice";
print(x, x, x);
print("I had a crush on", x);`, 'Code Example', `Change the code below so it produces the following output. Use a variable to store the string "Alice" in a variable on the first line like
x = "Alice";
then use the variable x on the later lines. In this way, changing just the first line to use the value "Bob" or "Zoe" or whatever changes the output of the whole program.`);



	renderTest(container, 'test-2', `x = "hi";
print(x);
print(x, x);
print(x, x, x);`, `xyz123
xyz123 xyz123
xyz123 xyz123 xyz123`, '', 'Test 1', 'Change just one line of the code below so it produces the following output when run.');

}





