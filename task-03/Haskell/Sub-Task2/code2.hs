import System.IO

main :: IO ()
main = do
    -- Open input.txt for reading
    inputHandle <- openFile "input.txt" ReadMode
    -- Read the entire content of input.txt and keep it in content
    content <- hGetContents inputHandle
    -- Close the input file
    hClose inputHandle

    -- Open output.txt for writing (creates the file if it doesn't exist, overwrites if it does)
    outputHandle <- openFile "output.txt" WriteMode
    -- Write the content to output.txt
    hPutStr outputHandle content
    -- Close the output file
    hClose outputHandle

    putStrLn "Content has been copied from input.txt to output.txt"

