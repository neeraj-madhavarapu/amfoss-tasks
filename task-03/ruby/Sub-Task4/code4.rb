def generate_diamond(n)
  diamond = []

  # Upper part of the diamond
  (1..n).each do |i|
    spaces = ' ' * (n - i)
    stars = '*' * (2 * i - 1)
    diamond << spaces + stars
  end

  # Lower part of the diamond
  (n - 1).downto(1) do |i|
    spaces = ' ' * (n - i)
    stars = '*' * (2 * i - 1)
    diamond << spaces + stars
  end

  diamond
end

def write_to_file(diamond, filename = 'output.txt')
  File.open(filename, 'w') do |file|
    diamond.each { |line| file.puts(line) }
  end
end

def main
  # Read the number from input.txt
  n = File.read('input.txt').to_i

  # Generate the diamond pattern
  diamond = generate_diamond(n)

  # Write the diamond pattern to output.txt
  write_to_file(diamond)

  puts "Diamond pattern generated in output.txt"
end

main

