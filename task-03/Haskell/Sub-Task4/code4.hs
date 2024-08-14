import System.IO
import Control.Monad (forM_)

generateDiamond :: Int -> [String]
generateDiamond n = upperPart ++ lowerPart
  where
    upperPart = [replicate (n - i) ' ' ++ replicate (2 * i - 1) '*' | i <- [1..n]]
    lowerPart = [replicate (n - i) ' ' ++ replicate (2 * i - 1) '*' | i <- reverse [1..(n - 1)]]

writeToFile :: Int -> IO ()
writeToFile n = do
    let diamond = generateDiamond(n)
    withFile "output.txt" WriteMode $ \h -> do
        forM_ diamond $ \line -> hPutStrLn h line

main :: IO ()
main = do
    contents <- readFile "input.txt"
    let n = read (head (lines contents)) :: Int
    writeToFile(n)
    putStrLn "Diamond pattern generated in output.txt"

