#include <stdio.h>

void generateDiamond(int n, FILE *fout) {
    int i, j;

    // Upper part of the diamond
    for (i = 1; i <= n; i++) {
        for (j = i; j < n; j++) {
            fprintf(fout, " ");
        }
        for (j = 1; j <= (2 * i - 1); j++) {
            fprintf(fout, "*");
        }
        fprintf(fout, "\n");
    }

    // Lower part of the diamond
    for (i = n - 1; i >= 1; i--) {
        for (j = n; j > i; j--) {
            fprintf(fout, " ");
        }
        for (j = 1; j <= (2 * i - 1); j++) {
            fprintf(fout, "*");
        }
        fprintf(fout, "\n");
    }
}

int main() {
    int n;
    FILE *fin = fopen("input.txt", "r");
    FILE *fout = fopen("output.txt", "w");

    if (fin == NULL) {
        printf("Error opening input file!\n");
        return 1;
    }

    fscanf(fin, "%d", &n);
    fclose(fin);

    generateDiamond(n, fout);
    fclose(fout);

    printf("Diamond pattern generated in output.txt\n");
    return 0;
}

