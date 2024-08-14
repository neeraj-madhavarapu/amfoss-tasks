const fs = require('fs');

// File paths
const inputFile = 'input.txt';
const outputFile = 'output.txt';

// Read from input.txt
fs.readFile(inputFile, 'utf8', (err, data) => 
{
    if (err) 
    {
        console.error(`Error reading ${inputFile}: ${err.message}`);
        return;
    }

    // Write to output.txt
    fs.writeFile(outputFile, data, 'utf8', (err) => 
    {
        if (err) 
        {
            console.error(`Error writing ${outputFile}: ${err.message}`);
            return;
        }

        console.log(`Content has been copied from ${inputFile} to ${outputFile}`);
    });
});

