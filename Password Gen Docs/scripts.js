// Assignment Code


//define constants


const alphabet = [
    'q', 'w', 'e', 'r', 't',
    'y', 'u', 'i', 'o', 'p',
    'a', 's', 'd', 'f', 'g',
    'h', 'j', 'k', 'l', 'z',
    'x', 'c', 'v', 'b', 'n',
    'm', ' ', '1', '2', '3',
    '4', '5', '6', '7', '8',
    '9', '0', '!', '@', '#',
    '$', '%', '^', '&', '*',
    '(', ')', '-', '+', '=',
    '?', '<', '>', '.', ','
];

//alphabet indexes in array length
const englishAlphaI = 26;
const spaceIndex = 27;
const numberAlphaI = 37;
const specialAlphaI = alphabet.length;


const minLength = 8;
const maxLength = 124;


//declare and initialize global variables
let generateBtn = document.querySelector("#generate");

let passwordLength = 8;
let requiresCapitals = false;
let requiresSpecialChars = false;
let requiresNumbers = false;
let password = "        "; //8 blank spaces


// Step 2 start algorithm
function generatePasswordAlgorithm() {


    //Step 3 receive user input
    promptUser();
    //Step 4 generate password
    password = generatePassword(passwordLength, requiresCapitals, requiresSpecialChars, requiresNumbers);
    //Step 5 display password to user 
    writePassword(password);

}

function promptUser() { //3
    do {
        passwordLength = parseInt(window.prompt("Please enter the length of the password to be generated", ""));
    }
    while (isNaN(passwordLength) || passwordLength > maxLength || passwordLength < minLength);
    requiresCapitals = window.confirm("Would you like your password to contain capital letters?");
    requiresSpecialChars = window.confirm("Would you like your password to contain special characters?");
    requiresNumbers = window.confirm("Would you like your password to contain numbers?");

}

function generatePassword(_pL, _rC, _rSC, _rN) { //4
    let result = "        ";
    let passwordArr = new Array(_pL);
    let symbol = ' ';
    let indexA = 0; //index for alphabet array
    //4.1
    passwordArr = mandatoryCharacters(_pL, _rC, _rSC, _rN);

    for (i = 0; i < _pL; i++) {
        if (passwordArr[i] == null) {
            do {
                indexA = Math.floor(Math.random() * alphabet.length)
            }
            //Complicated logic
            while (!(_rSC && indexA >= numberAlphaI || _rN && indexA >= spaceIndex && indexA <= specialAlphaI || indexA < spaceIndex));

            symbol = alphabet[indexA];

            if (_rC && indexA < englishAlphaI) {
                if (Math.random() < 0.5) {
                    symbol = symbol.toUpperCase();
                }
            }
            passwordArr[i] = symbol;
            console.log("Inserting Symbols: " + passwordArr);
        }
    }

    result = passwordArr.join("");

    return result;
}

//4.1
function mandatoryCharacters(_pL, _rC, _rSC, _rN) {
    let result = new Array(_pL);
    let indexR = 0; //index for result array
    let indexA = 0; //index for alphabet array
    if (_rC) {
        indexR = Math.floor(Math.random() * result.length);
        indexA = Math.floor(Math.random() * englishAlphaI);
        result[indexR] = alphabet[indexA].toUpperCase();
        console.log("Generating Uppercase: " + result);
    }

    if (_rSC) {
        do {
            indexR = Math.floor(Math.random() * result.length);
        }
        while (result[indexR] != null);
        indexA = Math.floor(Math.random() * (specialAlphaI - numberAlphaI)) + numberAlphaI;
        result[indexR] = alphabet[indexA];
        console.log("Generating Special Character: " + result);
    }

    if (_rN) {
        do {
            indexR = Math.floor(Math.random() * result.length);
        }
        while (result[indexR] != null);
        indexA = Math.floor(Math.random() * (numberAlphaI - spaceIndex)) + spaceIndex;
        result[indexR] = alphabet[indexA];
        console.log("Generating Number: " + result);
    }

    return result;

}


// Write password to the #password input
//5
function writePassword(password) {
    let passwordText = document.querySelector("#password");
    passwordText.value = password;

}

// Add event listener to generate button
// Step 1 User clicks button calls generate password
generateBtn.addEventListener("click", generatePasswordAlgorithm); 
