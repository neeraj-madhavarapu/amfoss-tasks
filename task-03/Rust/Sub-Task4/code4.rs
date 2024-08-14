use std::fs::File;
use std::io::{self, BufRead, Write};
use std::path::Path;

fn generate_diamond(n: usize) -> Vec<String> {
    let mut diamond = Vec::new();

    // Upper part of the diamond
    for i in 1..=n {
        let spaces = " ".repeat(n - i);
        let stars = "*".repeat(2 * i - 1);
        diamond.push(spaces + &stars);
    }

    // Lower part of the diamond
    for i in (1..n).rev() {
        let spaces = " ".repeat(n - i);
        let stars = "*".repeat(2 * i - 1);
        diamond.push(spaces + &stars);
    }

    diamond
}

fn write_to_file(diamond: Vec<String>, filename: &str) -> io::Result<()> {
    let mut file = File::create(filename)?;
    for line in diamond {
        writeln!(file, "{}", line)?;
    }
    Ok(())
}

fn main() -> io::Result<()> {
    // Read the number from input.txt
    let path = Path::new("input.txt");
    let file = File::open(&path)?;
    let mut lines = io::BufReader::new(file).lines();
    let n = lines.next().unwrap()?.trim().parse::<usize>().expect("Invalid number in input.txt");

    // Generate the diamond pattern
    let diamond = generate_diamond(n);

    // Write the diamond pattern to output.txt
    write_to_file(diamond, "output.txt")?;

    println!("Diamond pattern generated in output.txt");
    Ok(())
}

