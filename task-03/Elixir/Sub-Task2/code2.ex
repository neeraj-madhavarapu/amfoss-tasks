defmodule FileCopy do
  def copy_file do
    case File.read("input.txt") do
      {:ok, content} ->
        case File.write("output.txt", content) do
          :ok -> IO.puts("Content copied from input.txt to output.txt")
          {:error, reason} -> IO.puts("Error writing to output.txt: #{reason}")
        end
      {:error, reason} ->
        IO.puts("Error reading input.txt: #{reason}")
    end
  end
end

FileCopy.copy_file()

