import Control.Monad (when)

-- Function to print a single line of the diamond
printLine :: Int -> Int -> IO ()
printLine n i = do
    let spaces = replicate (n - i) ' '
    let stars = replicate (2 * i - 1) '*'
    putStrLn (spaces ++ stars)

-- Function to print the diamond pattern
printDiamond :: Int -> IO ()
printDiamond n = do
    -- Upper half of the diamond
    mapM_ (printLine n) [1..n]
    -- Lower half of the diamond
    mapM_ (printLine n) [n-1,n-2..1]

main :: IO ()
main = do
    -- Prompt user for input
    putStr "Enter the number of rows for the diamond pattern: "
    input <- getLine
    let n = read input :: Int

    -- Validate input
    when (n <= 0) $ do
        putStrLn "The number of rows must be greater than 0."
        return ()

    -- Print the diamond pattern
    printDiamond n

