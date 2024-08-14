import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Scanner;

public class DiamondPattern {

    public static void main(String[] args) {
        try {
            // Read the number from input.txt
            File inputFile = new File("input.txt");
            Scanner scanner = new Scanner(inputFile);
            int n = scanner.nextInt();
            scanner.close();

            // Generate the diamond pattern and write it to output.txt
            FileWriter writer = new FileWriter("output.txt");
            generateDiamond(n, writer);
            writer.close();

            System.out.println("Diamond pattern generated in output.txt");
        } catch (IOException e) {
            System.out.println("An error occurred while processing the file.");
            e.printStackTrace();
        }
    }

    public static void generateDiamond(int n, FileWriter writer) throws IOException {
        // Upper part of the diamond
        for (int i = 1; i <= n; i++) {
            writeLine(writer, n - i, 2 * i - 1);
        }

        // Lower part of the diamond
        for (int i = n - 1; i >= 1; i--) {
            writeLine(writer, n - i, 2 * i - 1);
        }
    }

    private static void writeLine(FileWriter writer, int spaces, int stars) throws IOException {
        // Write spaces
        for (int j = 0; j < spaces; j++) {
            writer.write(' ');
        }

        // Write stars
        for (int j = 0; j < stars; j++) {
            writer.write('*');
        }

        // Move to the next line
        writer.write('\n');
    }
}

