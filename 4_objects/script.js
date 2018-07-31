function run() {
    var container = document.getElementById('container');

    render(container, [
        _title('Objects'),
        _text(`Real Life Objects, Properties, and Methods`),
        _text(`In real life, a car is an object.
A car has properties like weight and color, and methods like start and stop:`),
        _block(`Properties              Methods

car.name = Fiat         car.start()
car.model = 500         car.drive()
car.weight = 850kg      car.brake()
car.color = white       car.stop()`),
        _text(`All cars have the same properties, but the property values differ from car to car.
All cars have the same methods, but the methods are performed at different times.`),
        _text(`Objects are variables too. But objects can contain many values.
This code assigns many values (Fiat, 500, white) to a variable named car:`),
        _block('var car = {type:"Fiat", model:"500", color:"white"};'),
    ])

    render(container, [
        _title('Object Definition'),
        _text('You define (and create) a JavaScript object with an object literal'),
        _interactionBox(`var person = {firstName:"John", lastName:"Doe", age:50, eyeColor:"blue"};

print(person);`),
        _text('Spaces and line breaks are not important. An object definition can span multiple lines:'),
        _interactionBox(`var person = {
    firstName:"John",
    lastName:"Doe",
    age:50,
    eyeColor:"blue"
};

print(person);`)
    ])

    render(container, [
        _title('Accessing Object Properties'),
        _text('You can access object properties in two ways'),
        _block(`objectName.propertyName`),
        _block(`objectName["propertyName"]`),
        _interactionBox(`var person = {firstName:"John", lastName:"Doe", age:50, eyeColor:"blue"};
var lastName1 = person.lastName;
var lastName2 = person["lastName"];

print(lastName1);
print(lastName2);`),
    ])

    render(container, [
        _title('Example 1'),
        _text(`Add the following property and value to the person object: country: USA`),
        _interactionBox(`var person = {firstName:"John", lastName:"Doe"};

print(person.country)`, `var person = {firstName:"John", lastName:"Doe", country: "USA"};

print(person.country)`),
    ]);

    render(container, [
        _title('Test 1'),
        _text(`Create an object called person with name = John, age = 50.
Then, access the object to display "John is 50 years old".
`),
        _interactionBox(`// Create the object here`),
    ]);

}





