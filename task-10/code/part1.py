import cv2 as cv
import numpy as np
import os
import re

def sort_images(image_folder):
    images = os.listdir(image_folder)
    images.sort(key=lambda x: int(re.search(r'\d+', x).group()))
    return images

def main():
    image_folder = 'Operation-Pixel-Merge/assets'  # Ensure this path points to your assets folder
    images = sort_images(image_folder)

    for image_name in images:
        image_path = os.path.join(image_folder, image_name)

        # Load the image
        image = cv.imread(image_path)

        # Convert the image to grayscale
        gray_image = cv.cvtColor(image, cv.COLOR_BGR2GRAY)

        # Apply a binary threshold to the grayscale image
        _, thresholded_image = cv.threshold(gray_image, 200, 255, cv.THRESH_BINARY_INV)

        # Find contours in the thresholded image
        contours, _ = cv.findContours(thresholded_image, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE)

        if not contours:
            # If no contours are detected, print a message indicating a white end
            print(f"{image_name}: This is a white end")
        else:
            # Loop over the contours to find the dot
            for contour in contours:
                # Get the bounding box coordinates for the contour
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

                # Print or store the coordinates and color
                print(f"Dot found in {image_name} at (X: {center_x}, Y: {center_y}), Average Color (BGR): {mean_color}")

                # Optionally, draw the detected dot and its center on the image
                cv.circle(image, (center_x, center_y), radius=5, color=(0, 255, 0), thickness=-1)
                cv.rectangle(image, (x, y), (x+w, y+h), (255, 0, 0), 2)

        # Optionally, show the result
        # cv.imshow('Detected Dot', image)
        # cv.waitKey(0)
        # cv.destroyAllWindows()

if __name__ == "__main__":
    main()
