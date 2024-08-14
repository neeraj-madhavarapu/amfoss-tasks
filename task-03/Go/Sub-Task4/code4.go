package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func generateDiamond(n int) []string {
	var diamond []string

	// Upper part of the diamond
	for i := 1; i <= n; i++ {
		spaces := strings.Repeat(" ", n-i)
		stars := strings.Repeat("*", 2*i-1)
		diamond = append(diamond, spaces+stars)
	}

	// Lower part of the diamond
	for i := n - 1; i >= 1; i-- {
		spaces := strings.Repeat(" ", n-i)
		stars := strings.Repeat("*", 2*i-1)
		diamond = append(diamond, spaces+stars)
	}

	return diamond
}

func writeToFile(n int) {
	diamond := generateDiamond(n)
	file, err := os.Create("output.txt")
	if err != nil {
		fmt.Println("Error creating file:", err)
		return
	}
	defer file.Close()

	writer := bufio.NewWriter(file)
	for _, line := range diamond {
		_, err := writer.WriteString(line + "\n")
		if err != nil {
			fmt.Println("Error writing to file:", err)
			return
		}
	}
	writer.Flush()
}

func main() {
	file, err := os.Open("input.txt")
	if err != nil {
		fmt.Println("Error opening input file:", err)
		return
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	scanner.Scan()
	n, err := strconv.Atoi(scanner.Text())
	if err != nil {
		fmt.Println("Error converting input to integer:", err)
		return
	}

	writeToFile(n)
	fmt.Println("Diamond pattern generated in output.txt")
}

