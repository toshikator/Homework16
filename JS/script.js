const database = [
    {name:"John", country:"Israel", age:19, isMarried:true},
    {name:"Mary", country:"Israel", age:29, isMarried:false},
    {name:"Bill", country:"Belgium", age:10, isMarried:false},
    {name:"Jane", country:"France", age:30, isMarried:true},
    {name:"Hanna", country:"France", age:9, isMarried:false},
    {name:"George", country:"Israel", age:80, isMarried:false},
];
/*
1. Select and print all marrie person.(filter)
2. Print database sorted by age asc.(min -> max) (sort)
3. Calculate average age (reduce)
4.Print statistic by country
    {"Israel":3....}
5. Print married person sorted ASC by name, not married DESC by age and average age of married person
6. Remove user by position

 */

// First block
function btn1() {
    console.log('List of married persons:');
    printArrayToConsole( filterMarried(database, true));
}
//Second block
function btn2() {
    console.log('database sorted by age:');
    printArrayToConsole( database.sort((value1, value2)=>{
        if (value1.age > value2.age){
            return 1;
        } else if (value1.age === value2.age){
            return 0;
        } else return -1;
    }));
}
//third block
function btn3() {
    printAverageAge(database);
}

//fourth block
function btn4() {
    console.log('country statistics:')
    const res = ((database.reduce((acc,val)=>{
        if (acc[val.country] === undefined){
            acc[val.country] = 1;
        }else {
            acc[val.country]++;
        }
        return acc;
    },{})));
    Object.entries(res).forEach(value => {
        console.log(value[0],'->', value[1]);
    })
}
//sixth block
const itemForRemove = document.getElementById('itemForRemove');

function btn6() {
    deleteElementFromArray(database,getNumber(itemForRemove));
    // printArrayToConsole(database);
}

// fifth block
// Print married person sorted ASC by name, not married DESC by age and average age of married person
function btn5() {

    console.log('married person sorted ASC by name:');
    printArrayToConsole(
        filterMarried(database,true).sort((value1, value2)=>{
            // console.log('name 1 ',value1[name],'name 2 ',value2[name]);
            if (value1["name"]>value2["name"]) return 1;
            else if(value1["name"]<value2["name"]) return -1;
            else return 0;
        })
    );
    console.log('unmarried person sorted DESC by age:');
    const tempArr =filterMarried(database,false).sort((value1, value2)=>{
        // console.log('name 1 ',value1[name],'name 2 ',value2[name]);
        if (value1["age"]>value2["age"]) return -1;
        else if(value1["age"]<value2["age"]) return 1;
        else return 0;
    })
    printArrayToConsole(tempArr);
    console.log(`only for married person:`);
    printAverageAge(tempArr);
}

// functions block
function deleteElementFromArray(array, numberOfElement) {
    if (array.length<1) alert('array is empty');
    else if (!isNumber(+numberOfElement)) alert('incorrect number of element to remove');
    else {
        array.splice(numberOfElement,1);
    }
}


function getNumber(input) {
    switch (typeof input) {
        case "string": if (isNumber(+input)) return +input;
        else alert('incorrect value of string');
        break;
        case "number": if (isNumber(input)) return input;
        else alert('incorrect value of number');
        break;
        case "object": if (isNumber(input.value)) return input.value;
        else alert('incorrect value of object');
        break;
        default: alert('incorrect input type');
    }
}


function isNumber(value) {
    return !(isNaN(value) || value === '' || value === undefined);
}



function printArrayToConsole(array) {
    if (array === undefined || array.length < 1){
        alert('wrong array for print');
    } else {
        array.forEach(value =>{
            console.log(value);
        });
    }
}

function filterMarried(array,isMarried) {
    if (isMarried) {
        return array.filter((value) => {
            return value.isMarried;
        });
    } else {
        return array.filter((value) => {
            return !value.isMarried;
        });
    }
}


function printAverageAge(array) {
    const res = array.reduce((accumulator, value)=>{
        accumulator.amountOfPerson++;
        accumulator.summary_age += value.age;
        return accumulator;
    },{summary_age:0, amountOfPerson:0})
    console.log('average Age: ',res.summary_age/res.amountOfPerson);
}