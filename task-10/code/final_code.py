import cv2 as cv
import numpy as np
import os
import re
from PIL import Image, ImageDraw

def sort_images(image_folder):
    images = os.listdir(image_folder)
    images.sort(key=lambda x: int(re.search(r'\d+', x).group()))
    return images

def detect_dot_and_get_properties(image_path):
    # Load the image
    image = cv.imread(image_path)

    # Convert the image to grayscale
    gray_image = cv.cvtColor(image, cv.COLOR_BGR2GRAY)

    # Apply a binary threshold to the grayscale image
    _, thresholded_image = cv.threshold(gray_image, 200, 255, cv.THRESH_BINARY_INV)

    # Find contours in the thresholded image
    contours, _ = cv.findContours(thresholded_image, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE)

    if not contours:
        return None, None, None  # No dot found, equivalent to 'w' command
    
    # Get the first contour's bounding box coordinates (assuming only one dot)
    contour = contours[0]
    x, y, w, h = cv.boundingRect(contour)
    
    # Calculate the center of the dot
    center_x = x + w // 2
    center_y = y + h // 2
    
    # Create a mask for the contour
    mask = np.zeros(image.shape[:2], dtype=np.uint8)
    cv.drawContours(mask, [contour], -1, color=255, thickness=-1)
    
    # Calculate the average color within the contour
    mean_val = cv.mean(image, mask=mask)[:3]
    mean_color = tuple(map(int, mean_val))  # Convert the mean color to integer values
    
    return (center_x, center_y), mean_color, image_path

def main():
    image_folder = 'Operation-Pixel-Merge/assets'  # Ensure this path points to your assets folder
    images = sort_images(image_folder)

    # Create a white background image to draw lines on
    final_image = Image.new('RGB', (512, 512), color='white')
    draw = ImageDraw.Draw(final_image)

    last_coords = None
    last_color = None

    for image_name in images:
        image_path = os.path.join(image_folder, image_name)

        # Detect dot and get properties
        coords, color, img_name = detect_dot_and_get_properties(image_path)

        if coords is None:
            # If no dot detected, skip drawing
            last_coords = None
            last_color = None
            print(f"{image_name}: No dot detected, skipping")
            continue

        print(f"Dot found in {image_name} at (X: {coords[0]}, Y: {coords[1]}), Color (BGR): {color}")

        if last_coords is None:
            last_coords = coords
            last_color = color
        else:
            # Draw the line from the last detected dot to the current one
            draw.line([last_coords, coords], fill=last_color, width=2)
            last_coords = coords
            last_color = color

    # Display the final image with the drawn lines
    final_image.show()

if __name__ == "__main__":
    main()
