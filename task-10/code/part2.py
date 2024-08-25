from PIL import Image, ImageDraw

# Create a white background image
img = Image.new('RGB', (512, 512), color='white')
draw = ImageDraw.Draw(img)

# Initial coordinates and color placeholders
last_coords = None
last_color = None

# Function to draw a line between two points with the specified color
def draw_line(coords1, coords2, color):
    draw.line([coords1, coords2], fill=color, width=2)

# Main loop to take inputs and draw lines
while True:
    input_cmd = input("Enter command (or 'd' to display, 'w' to skip): ")
    
    if input_cmd == 'd':
        # Display the final image and exit the loop
        img.show()
        break
    elif input_cmd == 'w':
        # Skip drawing, but set last_coords to be the next starting point
        last_coords = None
        last_color = None
    else:
        if last_coords is None:
            x1, y1, r, g, b = map(int, input_cmd.split(','))
            last_coords = (x1, y1)
            last_color = (r, g, b)
        else:
            x2, y2,r1,g1,b1 = map(int, input_cmd.split(','))
            draw_line(last_coords, (x2, y2), last_color)
            last_coords = (x2, y2)
            last_color=(r1,g1,b1)
