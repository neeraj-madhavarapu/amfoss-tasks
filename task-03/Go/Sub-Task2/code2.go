package main

import 
(
    "fmt"
    "io/ioutil"
    "os"
)

func main() 
{
    // Read from input.txt
    inputFile := "input.txt"
    content, err := ioutil.ReadFile(inputFile)
    if err != nil 
    {
        fmt.Printf("Error reading %s: %v\n", inputFile, err)
        return
    }

    // Write to output.txt
    outputFile := "output.txt"
    err = ioutil.WriteFile(outputFile, content, 0644)
    if err != nil 
    {
        fmt.Printf("Error writing %s: %v\n", outputFile, err)
        return
    }

    fmt.Printf("Content copied from %s to %s\n", inputFile, outputFile)
}

