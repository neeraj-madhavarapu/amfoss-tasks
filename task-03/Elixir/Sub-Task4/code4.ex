defmodule DiamondPattern do
  def generate_diamond(n) do
    upper_part = for i <- 1..n do
      spaces = String.duplicate(" ", n - i)
      stars = String.duplicate("*", 2 * i - 1)
      spaces <> stars
    end

    lower_part = for i <- (n - 1)..1 do
      spaces = String.duplicate(" ", n - i)
      stars = String.duplicate("*", 2 * i - 1)
      spaces <> stars
    end

    upper_part ++ lower_part
  end

  def write_to_file(n) do
    diamond = generate_diamond(n)
    File.write!("output.txt", Enum.join(diamond, "\n") <> "\n")
  end

  def run do
    {:ok, input} = File.read("input.txt")
    n = String.trim(input) |> String.to_integer()
    write_to_file(n)
    IO.puts("Diamond pattern generated in output.txt")
  end
end

DiamondPattern.run()

