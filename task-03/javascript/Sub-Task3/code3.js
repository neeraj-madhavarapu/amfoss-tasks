function printDiamond(n) {
    // Upper half of the diamond
    for (let i = 1; i <= n; i++) {
        let spaces = ' '.repeat(n - i);
        let stars = '*'.repeat(2 * i - 1);
        console.log(spaces + stars);
    }

    // Lower half of the diamond
    for (let i = n - 1; i >= 1; i--) {
        let spaces = ' '.repeat(n - i);
        let stars = '*'.repeat(2 * i - 1);
        console.log(spaces + stars);
    }
}

// Prompt the user for input and convert it to an integer
const prompt = require('prompt-sync')();
const n = parseInt(prompt('Enter the number of rows for the diamond pattern: '));

// Validate input
if (n <= 0) {
    console.log('The number of rows must be greater than 0.');
} else {
    // Print the diamond pattern
    printDiamond(n);
}

