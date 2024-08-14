#include <iostream>
#include <fstream>

void generateDiamond(int n, std::ofstream &fout) {
    // Upper part of the diamond
    for (int i = 1; i <= n; ++i) {
        for (int j = i; j < n; ++j) {
            fout << " ";
        }
        for (int j = 1; j <= (2 * i - 1); ++j) {
            fout << "*";
        }
        fout << "\n";
    }

    // Lower part of the diamond
    for (int i = n - 1; i >= 1; --i) {
        for (int j = n; j > i; --j) {
            fout << " ";
        }
        for (int j = 1; j <= (2 * i - 1); ++j) {
            fout << "*";
        }
        fout << "\n";
    }
}

int main() {
    int n;
    std::ifstream fin("input.txt");
    std::ofstream fout("output.txt");

    if (!fin.is_open()) {
        std::cerr << "Error opening input file!\n";
        return 1;
    }

    fin >> n;
    fin.close();

    generateDiamond(n, fout);
    fout.close();

    std::cout << "Diamond pattern generated in output.txt\n";
    return 0;
}

