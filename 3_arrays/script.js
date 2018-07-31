function run() {
    var container = document.getElementById('container');

    render(container, [
        _title('Arrays'),
        _text(`An array is a special variable, which can hold more than one value at a time.
If you have a list of items (a list of car names, for example), storing the cars in single variables could look like this:`),
        _block(`var car1 = "Saab";
var car2 = "Volvo";
var car3 = "BMW";`),
        _text(`However, what if you want to loop through the cars and find a specific one? And what if you had not 3 cars, but 300?
The solution is an array!
An array can hold many values under a single name, and you can access the values by referring to an index number.`),
    ])

    render(container, [
        _title('Creating an Array'),
        _text('Using an array literal is the easiest way to create a JavaScript Array.'),
        _block('var array_name = [item1, item2, ...];'),
        _spacer(),
        _interactionBox(`var cars = ["Saab", "Volvo", "BMW"];
print(cars);`),
        _text('Spaces and line breaks are not important. A declaration can span multiple lines:'),
        _interactionBox(`var cars = [
    "Saab",
    "Volvo",
    "BMW"
];
print(cars);`)
    ])

    render(container, [
        _title('Using the JavaScript Keyword new'),
        _text('The following example also creates an Array, and assigns values to it:'),
        _interactionBox(`var cars = new Array("Saab", "Volvo", "BMW");
print(cars);`),
        _text(`Avoid new Array()

There is no need to use the JavaScript's built-in array constructor new Array().

Use [] instead.

These two different statements both create a new empty array named points:
`),
        _block(`var points = new Array();         // Bad
var points = [];                  // Good `),
        _text('These two different statements both create a new array containing 6 numbers:'),
        _block(`var points = new Array(40, 100, 1, 5, 25, 10); // Bad
var points = [40, 100, 1, 5, 25, 10];          // Good`),

        _warning('The new keyword only complicates the code. It can also produce some unexpected results:'),
        _interactionBox(`// Creates an array with two elements (10 and 20)
var points = new Array(10, 20);

print(points);`),
        _text('What if I remove one of the elements?'),
        _interactionBox(`// Creates an array with 10 undefined elements !!!!!
var points = new Array(10);

print(points);`),

    ])

    render(container, [
        _title('Access the Elements of an Array'),
        _text(`You refer to an array element by referring to the index number.
This statement accesses the value of the first element in cars:
`),
        _block('var name = cars[0];'),
        _spacer(),
        _interactionBox(`var cars = ["Saab", "Volvo", "BMW"];
var name = cars[0];
print(name);`),
        _text('This statement modifies the first element in cars:'),
        _blockWrapped('cars[0] = "Opel";'),
        _interactionBox(`var cars = ["Saab", "Volvo", "BMW"];
cars[0] = "Audi";
var name = cars[0];
print(name);`),
    ])

    render(container, [
        _title('Array Properties and Methods'),
        _text('The real strength of JavaScript arrays are the built-in array properties and methods:'),
        _interactionBox(`var cars = ["Saab", "Volvo", "BMW"];
// The length property returns the number of elements
var x = cars.length;
print(x);

// The sort() method sorts arrays
var y = cars.sort();   
print(y);`),

        _title('The length Property'),
        _text('The length property of an array returns the length of an array (the number of array elements).'),
        _interactionBox(`var fruits = ["Banana", "Orange", "Apple", "Mango"];
// the length of fruits is 4
var length = fruits.length;

print(length);`),

        _title('Adding Array Elements'),
        _text('The easiest way to add a new element to an array is using the push method:'),
        _interactionBox(`var fruits = ["Banana", "Orange", "Apple", "Mango"];
print(fruits);

// adds a new element (Lemon) to fruits
fruits.push("Lemon");
print(fruits);`),

        _text('New element can also be added to an array using the length property:'),
        _interactionBox(`var fruits = ["Banana", "Orange", "Apple", "Mango"];
print(fruits);

// adds a new element (Lemon) to fruits
fruits[fruits.length] = "Lemon";
print(fruits);`),

        _warning('Adding elements with high indexes can create undefined "holes" in an array:'),
        _interactionBox(`var fruits = ["Banana", "Orange", "Apple", "Mango"];
// adds a new element (Lemon) to fruits
fruits[6] = "Lemon";

print(fruits);`)
    ])


    render(container, [
        _title('Associative Arrays'),
        _text(`Many programming languages support arrays with named indexes.
Arrays with named indexes are called associative arrays (or hashes).
JavaScript does not support arrays with named indexes.
In JavaScript, arrays always use numbered indexes.`),
        _interactionBox(`var person = [];
person[0] = "John";
person[1] = "Doe";
person[2] = 46;
// person.length will return 3
var x = person.length;
print(x)

// person[0] will return "John"
var y = person[0];
print(y)`),
    ]);

    render(container, [
        _title('Example 1'),
        _text(`Display the "Volvo" item of the cars array.`),
        _interactionBox(`var cars = ["Saab", "Volvo", "BMW"];`, `var cars = ["Saab", "Volvo", "BMW"];

print(cars[1])`),
    ]);

    render(container, [
        _title('Test 1'),
        _text(`Change the first item of cars to "Opel" by referring to the index number, and display the whole array.`),
        _interactionBox(`var cars = ["Saab", "Volvo", "BMW"];`),
    ]);

    render(container, [
        _title('Test 2'),
        _text(`Create an array named cars, assign the values "Saab", "Volvo" and "BMW" to it, and display it.".`),
        _interactionBox(`// Create the object here`),
    ]);

    render(container, [
        _title('Test 3'),
        _text(`Use the length property to display the number of array items in cars.`),
        _interactionBox(`var cars = ["Saab", "Volvo", "BMW"];`),
    ]);

    render(container, [
        _title('Test 4'),
        _text(`Use the length property to add a new item to cars: Mercedes.`),
        _interactionBox(`var cars = ["Saab", "Volvo", "BMW"];`),
    ]);
}





