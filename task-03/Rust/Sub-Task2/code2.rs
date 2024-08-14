use std::fs;
use std::io::prelude::*;

fn main() -> std::io::Result<()> {
    // File paths
    let input_file = "input.txt";
    let output_file = "output.txt";

    // Read the content from input.txt
    let content = fs::read_to_string(input_file)?;

    // Write the content to output.txt
    fs::write(output_file, content)?;

    println!("Content has been copied from {} to {}", input_file, output_file);

    Ok(())
}

