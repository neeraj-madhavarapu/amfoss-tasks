#include <iostream>
using namespace std;

void printDiamond(int n) 
{
    int i, j;

    // Upper half of the diamond
    for (i = 1; i <= n; i++) {
        // Print leading spaces
        for (j = i; j < n; j++) {
            cout << " ";
        }
        // Print asterisks
        for (j = 1; j <= (2 * i - 1); j++) {
            cout << "*";
        }
        // Move to the next line
        cout << endl;
    }

    // Lower half of the diamond
    for (i = n - 1; i >= 1; i--) {
        // Print leading spaces
        for (j = n; j > i; j--) {
            cout << " ";
        }
        // Print asterisks
        for (j = 1; j <= (2 * i - 1); j++) {
            cout << "*";
        }
        // Move to the next line
        cout << endl;
    }
}

int main() {
    int n;

    // Prompt user for input
    cout << "Enter the number of rows for the diamond pattern: ";
    cin >> n;

    // Validate input
    if (n <= 0) {
        cout << "The number of rows must be greater than 0." << endl;
        return 1;
    }

    // Print the diamond pattern
    printDiamond(n);

    return 0;
}

