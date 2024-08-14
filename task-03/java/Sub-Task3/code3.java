import java.util.Scanner;

public class DiamondPattern {
    public static void printDiamond(int n) {
        // Upper half of the diamond
        for (int i = 1; i <= n; i++) {
            // Print leading spaces
            for (int j = i; j < n; j++) {
                System.out.print(" ");
            }
            // Print asterisks
            for (int j = 1; j <= (2 * i - 1); j++) {
                System.out.print("*");
            }
            // Move to the next line
            System.out.println();
        }

        // Lower half of the diamond
        for (int i = n - 1; i >= 1; i--) {
            // Print leading spaces
            for (int j = n; j > i; j--) {
                System.out.print(" ");
            }
            // Print asterisks
            for (int j = 1; j <= (2 * i - 1); j++) {
                System.out.print("*");
            }
            // Move to the next line
            System.out.println();
        }
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Prompt user for input
        System.out.print("Enter the number of rows for the diamond pattern: ");
        int n = scanner.nextInt();

        // Validate input
        if (n <= 0) {
            System.out.println("The number of rows must be greater than 0.");
        } else {
            // Print the diamond pattern
            printDiamond(n);
        }

        scanner.close();
    }
}

