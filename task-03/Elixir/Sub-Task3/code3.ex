defmodule DiamondPattern do
  def print_diamond(n) when n > 0 do
    # Upper half of the diamond
    for i <- 1..n do
      # Print leading spaces
      IO.write(String.duplicate(" ", n - i))
      # Print asterisks
      IO.write(String.duplicate("*", 2 * i - 1))
      IO.puts()
    end

    # Lower half of the diamond
    for i <- n - 1..1 do
      # Print leading spaces
      IO.write(String.duplicate(" ", n - i))
      # Print asterisks
      IO.write(String.duplicate("*", 2 * i - 1))
      IO.puts()
    end
  end

  def main do
    IO.write("Enter the number of rows for the diamond pattern: ")
    n = IO.gets("") |> String.trim() |> String.to_integer()

    if n <= 0 do
      IO.puts("The number of rows must be greater than 0.")
    else
      print_diamond(n)
    end
  end
end

DiamondPattern.main()

