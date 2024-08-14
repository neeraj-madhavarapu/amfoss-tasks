#include <stdio.h>

void printDiamond(int n) 
{
    int i, j;

    // Upper half of the diamond
    for (i = 1; i <= n; i++) 
    {
        // Print leading spaces
        for (j = i; j < n; j++) 
        {
            printf(" ");
        }
        // Print asterisks
        for (j = 1; j <= (2 * i - 1); j++) 
        {
            printf("*");
        }
        // Move to the next line
        printf("\n");
    }

    // Lower half of the diamond
    for (i = n - 1; i >= 1; i--) 
    {
        // Print leading spaces
        for (j = n; j > i; j--) 
        {
            printf(" ");
        }
        // Print asterisks
        for (j = 1; j <= (2 * i - 1); j++) 
        {
            printf("*");
        }
        // Move to the next line
        printf("\n");
    }
}

int main() 
{
    int n;

    // Prompt user for input
    printf("Enter the number of rows for the diamond pattern: ");
    scanf("%d", &n);

    // Validate input
    if (n <= 0) 
    {
        printf("The number of rows must be greater than 0.\n");
        return 1;
    }

    // Print the diamond pattern
    printDiamond(n);

    return 0;
}

