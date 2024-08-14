const fs = require('fs');

// Function to generate the diamond pattern
function generateDiamond(n) {
    let diamond = '';

    // Upper part of the diamond
    for (let i = 1; i <= n; i++) {
        let spaces = ' '.repeat(n - i);
        let stars = '*'.repeat(2 * i - 1);
        diamond += spaces + stars + '\n';
    }

    // Lower part of the diamond
    for (let i = n - 1; i >= 1; i--) {
        let spaces = ' '.repeat(n - i);
        let stars = '*'.repeat(2 * i - 1);
        diamond += spaces + stars + '\n';
    }

    return diamond;
}

// Function to read input from file, generate the diamond, and write to output file
function createDiamondFromFile() {
    // Read the number from input.txt
    fs.readFile('input.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading input file:', err);
            return;
        }

        const n = parseInt(data.trim(), 10);
        if (isNaN(n) || n <= 0) {
            console.error('Invalid input. Please provide a positive integer.');
            return;
        }

        // Generate the diamond pattern
        const diamond = generateDiamond(n);

        // Write the diamond pattern to output.txt
        fs.writeFile('output.txt', diamond, (err) => {
            if (err) {
                console.error('Error writing to output file:', err);
                return;
            }

            console.log('Diamond pattern generated in output.txt');
        });
    });
}

// Run the function to create the diamond pattern
createDiamondFromFile();

