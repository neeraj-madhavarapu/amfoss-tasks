import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

public class FileCopy 
{
    public static void main(String[] args) 
    {
        String inputFile = "input.txt";
        String outputFile = "output.txt";

        // Use try-with-resources to ensure resources are closed properly
        try (
            BufferedReader reader = new BufferedReader(new FileReader(inputFile));
            BufferedWriter writer = new BufferedWriter(new FileWriter(outputFile))
        ) {
            String line;
            // Read from input file and write to output file
            while ((line = reader.readLine()) != null) {
                writer.write(line);
                writer.newLine(); // Write a newline character
            }
            System.out.println("Content copied from " + inputFile + " to " + outputFile);
        } catch (IOException e) {
            System.err.println("An error occurred: " + e.getMessage());
        }
    }
}

