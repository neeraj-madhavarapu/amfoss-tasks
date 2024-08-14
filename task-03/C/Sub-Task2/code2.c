#include <stdio.h>
#include <stdlib.h>

int main() 
{
    // File pointers
    FILE *in_file, *out_file;
    char run[1024];

    // Open input file in read mode
    in_file = fopen("input.txt", "r");
    if (in_file == NULL) 
    {
        printf("Error!!\n");
        return 1;
    }

    // Open output file in write mode
    out_file = fopen("output.txt", "w");
    
    // Read from input.txt and write to output.txt
    while (fgets(run, sizeof(run), in_file) != NULL) 
    {
        fputs(run, out_file);
    }

    // Close the files
    fclose(in_file);
    fclose(out_file);

    printf("Content copied from input.txt to output.txt\n");

    return 0;
}

