def generate_diamond(n):
    diamond = []

    # Upper part of the diamond
    for i in range(1, n + 1):
        spaces = ' ' * (n - i)
        stars = '*' * (2 * i - 1)
        diamond.append(spaces + stars)

    # Lower part of the diamond
    for i in range(n - 1, 0, -1):
        spaces = ' ' * (n - i)
        stars = '*' * (2 * i - 1)
        diamond.append(spaces + stars)

    return diamond

def write_to_file(diamond, filename='output.txt'):
    with open(filename, 'w') as f:
        f.write('\n'.join(diamond) + '\n')

def main():
    # Read the number from input.txt
    with open('input.txt', 'r') as f:
        n = int(f.read().strip())

    # Generate the diamond pattern
    diamond = generate_diamond(n)

    # Write the diamond pattern to output.txt
    write_to_file(diamond)

    print("Diamond pattern generated in output.txt")

if __name__ == "__main__":
    main()

