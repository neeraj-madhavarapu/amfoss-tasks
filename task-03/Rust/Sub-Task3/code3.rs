use std::io;

fn print_diamond(n: usize) {
    // Upper half of the diamond
    for i in 1..=n {
        let spaces = " ".repeat(n - i);
        let stars = "*".repeat(2 * i - 1);
        println!("{}{}", spaces, stars);
    }

    // Lower half of the diamond
    for i in (1..n).rev() {
        let spaces = " ".repeat(n - i);
        let stars = "*".repeat(2 * i - 1);
        println!("{}{}", spaces, stars);
    }
}

fn main() {
    // Prompt user for input
    println!("Enter the number of rows for the diamond pattern:");

    let mut input = String::new();
    io::stdin()
        .read_line(&mut input)
        .expect("Failed to read input");

    // Convert input to a usize (unsigned integer)
    let n: usize = match input.trim().parse() {
        Ok(num) => num,
        Err(_) => {
            println!("Please enter a valid positive integer.");
            return;
        }
    };

    // Validate input
    if n > 0 {
        // Print the diamond pattern
        print_diamond(n);
    } else {
        println!("The number of rows must be greater than 0.");
    }
}

