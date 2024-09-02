import re
import requests
import click
import os

OMDB_API_KEY = '8c906058'  # Replace with your OMDb API key

def extract_movie_title(filename):
    """
    Extract the movie title from the filename.
    """
    # Remove file extension
    filename = os.path.splitext(filename)[0]
    # Replace hyphens and underscores with spaces
    filename = filename.replace('-', ' ').replace('_', ' ')
    # Remove common patterns like year, resolution, etc.
    filename = re.sub(r'\b(19|20)\d{2}\b', '', filename)  # Remove years like 1999, 2021, etc.
    filename = re.sub(r'\b(720p|1080p|2160p|480p|HDRip|BluRay|BRRip|DVDRip|x264|x265|WEBRip|HDTV|HDR)\b', '', filename, flags=re.IGNORECASE)
    filename = re.sub(r'\s+', ' ', filename)  # Replace multiple spaces with a single space
    return filename.strip()

def find_imdb_id(movie_title):
    """
    Find the IMDb ID of the movie using the OMDb API.
    """
    url = f"http://www.omdbapi.com/?t={movie_title}&apikey={OMDB_API_KEY}"
    response = requests.get(url)
    data = response.json()

    if data['Response'] == 'True':
        return data['Title'], data['imdbID']
    else:
        raise ValueError(f"Movie not found: {movie_title}")

@click.command()
@click.argument('mp4_file', type=click.Path(exists=True))
def get_movie_info(mp4_file):
    """
    Takes an MP4 file, extracts the movie name, and returns the movie name and IMDb ID.
    """
    # Ensure the file is an MP4
    if not mp4_file.lower().endswith('.mp4'):
        click.echo("Error: The file must be an MP4.")
        return

    movie_title = extract_movie_title(os.path.basename(mp4_file))
    click.echo(f"Extracted Movie Title: {movie_title}")

    try:
        movie_name, imdb_id = find_imdb_id(movie_title)
        click.echo(f"Movie Name: {movie_name}")
        click.echo(f"IMDb ID: {imdb_id}")
    except ValueError as e:
        click.echo(f"Error: {e}")

if __name__ == '__main__':
    get_movie_info()
