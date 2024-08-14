#include <iostream>
#include <fstream>
#include <string>

int main() 
{
    // File streams
    std::ifstream infile("input.txt"); // Open input file in read mode
    std::ofstream outfile("output.txt"); // Open output file in write mode

    // Check if files are open
    if (!infile.is_open()) 
    {
        std::cerr << "Error" << std::endl;
        return 1;
    }
    if (!outfile.is_open()) 
    {
        std::cerr << "Error" << std::endl;
        return 1;
    }

    // Read from input.txt and write to output.txt
    std::string line;
    while (std::getline(infile, line)) 
    {
        outfile << line << std::endl;
    }

    // Close the files
    infile.close();
    outfile.close();

    std::cout << "Content copied from input.txt to output.txt" << std::endl;

    return 0;
}

