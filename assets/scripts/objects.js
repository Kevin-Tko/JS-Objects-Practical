//Every DOM node is an object
//JS has primitive values and reference values. All reference values are objects
//primitive values => numbers,strings,booleans,null,undefined & symbol
//reference values => the rest are objects
//Positive numbers can be use as keys in an object

//--------------------------------------------------//
// Creating an object with properties and a method
//--------------------------------------------------//
const person = {
    name: "Kevin", //property
    age: 29,
    prof: "banker",
    hobbies: ["Codding", "Watching"], //property including an object withion an object
    greet: function () {
        console.log("Hi there!!");
    }, //method
    "last name": "Njogu",
    1.5: "Hello",
};

console.log(person.age); //using dot notation to access properties of an object
person.greet();
console.log(person["last name"]); //using square bracket notation to access propertis of an object
console.log(person[1.5]);

//--------------------------------------------------//
// Adding, Modifying and deleting an object property
//--------------------------------------------------//
//Adding
person.isAdmin = true;
console.log(person);

//deleting
delete person.prof;
console.log(person);

//modify
person.age = 35;
console.log(person);
//----------------------------------------------------------------------//
// Accessing properties dynamically and adding properties dynamically
//----------------------------------------------------------------------//
const keyName = "last name";
console.log(person[keyName]);

// const firstName = prompt(`enter your first name`);

// const person1 = {
//     [firstName]: "",
//     middleName: "mike",
//     lastName: "elves",
// };
// console.log(person1);

//--------------------------------------------------//
// Spread Operator
//--------------------------------------------------//
//allows copying of objects
const employee = { name: "bob", age: 40 };

const emloyee1 = { ...employee };
console.log(emloyee1);

const employee2 = { ...employee, age: 65 };
console.log(employee2);

//--------------------------------------------------//
// Object Destructuring
//--------------------------------------------------//
const stockPrice = { company: "aapl", price: 55 };
const { company } = stockPrice; //you have to pull out the data by existing key name
console.log(company);

const { company: apple } = stockPrice; //use colon to rename the pulled out value
console.log(apple);

//------------------------------------------------------//
// Checking existence of a propery in an object using in
//-------------------------------------------------------//
if ("company" in stockPrice) {
    console.log(`property present`);
}

//-------------//
//this keyword
//-------------//
//this represents the object that is before the method ie stockPrice is this for below example
//arrow function does not bind this to anything hence this in an arroe function will refer to the window
stockPrice.formatCompany = function () {
    return this.company.toUpperCase();
};

let kampuni = stockPrice.formatCompany();
console.log(kampuni);

//---------------------//
//Getters abd Setters
//---------------------//

//------------------------------------------------------------------------------------------------------//
//Working on the APP Code
//-------------------------------------------------------------------------------------------------------//
const addMovieBtn = document.getElementById("add-movie-btn");
const searchMovieBtn = document.getElementById("search-btn");

const movies = []; //will hold all newMovies objects

//Function for rendering movie elemnt on the DOM
const renderMovieHandler = (filterKey = "") => {
    const unorderedListElement = document.getElementById("movie-list");
    if (movies.length === 0) {
        unorderedListElement.classList.remove("visible");
        return;
    } else {
        unorderedListElement.classList.add("visible");
    }
    unorderedListElement.innerHTML = "";

    //----Logic for Search Functionality-----//
    const filteredMovie = !filterKey
        ? movies
        : movies.filter((movie) => {
              return movie.info.title.includes(filterKey);
          });
    filteredMovie.forEach((movie) => {
        const listElement = document.createElement("li");
        const { info } = movie; //object destructuring => movie.info
        // let text = info.title;
        let text = movie.getFormattedTitle();
        for (const key in info) {
            if (key !== "title") {
                text = text + ` - ${key}` + ` - ${info[key]}`;
            }
        }
        listElement.textContent = text; //will set the text content
        unorderedListElement.append(listElement); //will add the list node for each movie added to the ul element
    });
    //----Logic for Search Functionality-----//
};

//creting new movie element with a callback function for the add btn
const addMovieHandler = () => {
    const title = document.getElementById("title").value;
    const extraName = document.getElementById("extra-name").value;
    const extraValue = document.getElementById("extra-value").value;

    //validating user input
    if (
        title.trim() === "" ||
        extraName.trim() === "" ||
        extraValue.trim() == ""
    ) {
        return; //this will end function execution
    }

    //creting new movie object
    const newMovie = {
        info: {
            // title: title,
            title, //shorthand for above => if key and value have same name you just write the name once
            [extraName]: extraValue,
        },
        id: Math.random(),
        getFormattedTitle: function () {
            return this.info.title.toUpperCase(); //this keyword
        },
    };
    movies.push(newMovie); //push the newMovie object to the movies array
    renderMovieHandler();
    document.getElementById("title").value = "";
    document.getElementById("extra-name").value = "";
    document.getElementById("extra-value").value = "";
};

addMovieBtn.addEventListener("click", addMovieHandler);

//Creating search functionalities
const searchMovieHandler = () => {
    const searchKey = document.getElementById("filter-title").value;
    renderMovieHandler(searchKey);
};

searchMovieBtn.addEventListener("click", searchMovieHandler);
