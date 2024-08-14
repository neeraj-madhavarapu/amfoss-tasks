def print_diamond(n):
    # Upper half of the diamond
    for i in range(1, n + 1):
        spaces = ' ' * (n - i)
        stars = '*' * (2 * i - 1)
        print(spaces + stars)

    # Lower half of the diamond
    for i in range(n - 1, 0, -1):
        spaces = ' ' * (n - i)
        stars = '*' * (2 * i - 1)
        print(spaces + stars)

def main():
    # Prompt user for input
    n = int(input("Enter the number of rows for the diamond pattern: "))

    # Validate input
    if n <= 0:
        print("The number of rows must be greater than 0.")
    else:
        # Print the diamond pattern
        print_diamond(n)

if __name__ == "__main__":
    main()

