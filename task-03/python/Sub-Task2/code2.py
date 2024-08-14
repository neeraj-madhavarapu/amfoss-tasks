# Open the input file in read mode
with open('input.txt', 'r') as infile:
    data = infile.read()

# Open the output file in write mode
with open('output.txt', 'w') as outfile:
    outfile.write(data)

