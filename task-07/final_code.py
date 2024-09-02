import re
import struct
import os
import requests
import tempfile
import click
from bs4 import BeautifulSoup

OMDB_API_KEY = '8c906058'  # Replace with your OMDb API key
__64k = 65536
__longlong_format_char = 'q'
__byte_size = struct.calcsize(__longlong_format_char)

root_url = "https://www.opensubtitles.org"
headers = {'User-Agent': "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:129.0) Gecko/20100101 Firefox/129.0"}

def extract_movie_title(filename):
    """
    Extract the movie title from the filename.
    """
    filename = os.path.splitext(filename)[0]
    filename = filename.replace('-', ' ').replace('_', ' ')
    filename = re.sub(r'\b(19|20)\d{2}\b', '', filename)
    filename = re.sub(r'\b(720p|1080p|2160p|480p|HDRip|BluRay|BRRip|DVDRip|x264|x265|WEBRip|HDTV|HDR)\b', '', filename, flags=re.IGNORECASE)
    filename = re.sub(r'\s+', ' ', filename)
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

def temp_file():
    """Create a temporary file."""
    file = tempfile.NamedTemporaryFile(delete=False)
    filename = file.name
    file.close()  # Close the file so we can reopen it for reading
    return filename

def is_local(path):
    """Check if the path is local or remote."""
    from urllib.parse import urlparse
    return os.path.exists(path) or urlparse(path).scheme in ['', 'file']

def hash_size_file_url(filepath):
    """Calculate hash and size of the file, either local or remote."""
    if is_local(filepath):
        local_file = True
    else:
        local_file = False

    if not local_file:
        temp_first_64kb = temp_file()
        temp_last_64kb = temp_file()
        url = filepath

        response = requests.head(url)
        filesize = int(response.headers.get('content-length', 0))

        if filesize < __64k * 2:
            try:
                filesize = int(str(response.headers.get('content-range', '0')).split('/')[1])
            except:
                pass

        headers = {"Range": f'bytes=0-{__64k - 1}'}
        r = requests.get(url, headers=headers)
        with open(temp_first_64kb, 'wb') as f:
            f.write(r.content)

        headers = {"Range": f'bytes={filesize - __64k}-{filesize - 1}'}
        r = requests.get(url, headers=headers)
        with open(temp_last_64kb, 'wb') as f:
            f.write(r.content)

        f = open(temp_first_64kb, 'rb')
    else:
        f = open(filepath, "rb")
        filesize = os.path.getsize(filepath)

    try:
        longlongformat = '<q'  # little-endian long long
        bytesize = struct.calcsize(longlongformat)
        hash_value = filesize

        if filesize < __64k * 2:
            f.close()
            if not local_file:
                os.remove(temp_last_64kb)
                os.remove(temp_first_64kb)
            return "SizeError", 0

        range_value = __64k // __byte_size

        for _ in range(range_value):
            buffer = f.read(bytesize)
            if len(buffer) < bytesize:
                break
            l_value, = struct.unpack(longlongformat, buffer)
            hash_value += l_value
            hash_value &= 0xFFFFFFFFFFFFFFFF  # to remain as 64bit number

        if local_file:
            f.seek(max(0, filesize - __64k), 0)
        else:
            f.close()
            f = open(temp_last_64kb, 'rb')

        for _ in range(range_value):
            buffer = f.read(bytesize)
            if len(buffer) < bytesize:
                break
            l_value, = struct.unpack(longlongformat, buffer)
            hash_value += l_value
            hash_value &= 0xFFFFFFFFFFFFFFFF  # to remain as 64bit number

        f.close()

        if not local_file:
            os.remove(temp_last_64kb)
            os.remove(temp_first_64kb)

        returned_hash = "%016x" % hash_value
        return returned_hash, filesize

    except IOError:
        if not local_file:
            os.remove(temp_last_64kb)
            os.remove(temp_first_64kb)
        return 'IOError', 0

def search_subtitle(imdb_id):
    """
    Search for subtitles by IMDb ID on OpenSubtitles.
    """
    imdb_id = re.sub(r'[^\d]', '', imdb_id)  # Remove any non-digit characters
    url = f"{root_url}/en/search2/sublanguageid-all/idmovie-{imdb_id}"
    r = requests.get(url, headers=headers)
    if r.status_code == 200:
        return r.content
    else:
        print(f"Failed to retrieve subtitles for IMDb ID {imdb_id}")
        return None

def parse_html(content):
    """
    Parse the HTML content using BeautifulSoup.
    """
    soup = BeautifulSoup(content, 'lxml')
    return soup

def extract_links(soup, output_file):
    """
    Extract subtitle download links from the parsed HTML and save to a file.
    """
    with open(output_file, 'w') as f:
        for a_tag in soup.findAll('a'):
            link = a_tag.get('href')
            text = a_tag.text
            if link:
                full_link = f"{root_url}{link}"
                f.write(f"{text}: {full_link}\n")

@click.command()
@click.argument('mp4_file', type=click.Path(exists=True))
@click.option('-l', '--language', type=str, help='Filter subtitles by language.')
@click.option('-o', '--output', type=click.Path(), default='subs', show_default=True, help='Specify the output folder for the subtitles.')
@click.option('-s', '--file-size', type=int, help='Filter subtitles by movie file size (in bytes).')
@click.option('-h', '--match-by-hash', is_flag=True, help='Match subtitles by movie hash.')
def download_subtitles(mp4_file, language, output, file_size, match_by_hash):
    """
    CLI app to download subtitles for a movie file.
    """
    if not os.path.exists(output):
        os.makedirs(output)
        click.echo(f"Created output directory: {output}")

    movie_title = extract_movie_title(os.path.basename(mp4_file))
    click.echo(f"Extracted Movie Title: {movie_title}")

    try:
        movie_name, imdb_id = find_imdb_id(movie_title)
        click.echo(f"Movie Name: {movie_name}")
        click.echo(f"IMDb ID: {imdb_id}")
    except ValueError as e:
        click.echo(f"Error: {e}")
        return

    hash_value, actual_file_size = hash_size_file_url(mp4_file)
    if hash_value == 'IOError':
        click.echo("Error processing file.")
        return

    click.echo(f"File Size: {actual_file_size} bytes")
    click.echo(f"File Hash: {hash_value}")

    content = search_subtitle(imdb_id)
    if content:
        soup = parse_html(content)
        output_file = os.path.join(output, f"{movie_title}_subtitles.txt")
        extract_links(soup, output_file)
        click.echo(f"Subtitle links saved to: {output_file}")

if __name__ == '__main__':
    download_subtitles()
