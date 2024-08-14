package main

import (
    "fmt"
    "strings"
)

func printDiamond(n int) {
    // Upper half of the diamond
    for i := 1; i <= n; i++ {
        // Print leading spaces
        fmt.Print(strings.Repeat(" ", n-i))
        // Print asterisks
        fmt.Println(strings.Repeat("*", 2*i-1))
    }

    // Lower half of the diamond
    for i := n - 1; i >= 1; i-- {
        // Print leading spaces
        fmt.Print(strings.Repeat(" ", n-i))
        // Print asterisks
        fmt.Println(strings.Repeat("*", 2*i-1))
    }
}

func main() {
    var n int

    // Prompt user for input
    fmt.Print("Enter the number of rows for the diamond pattern: ")
    _, err := fmt.Scanf("%d", &n)
    if err != nil {
        fmt.Println("Invalid input. Please enter an integer.")
        return
    }

    // Validate input
    if n <= 0 {
        fmt.Println("The number of rows must be greater than 0.")
        return
    }

    // Print the diamond pattern
    printDiamond(n)
}

