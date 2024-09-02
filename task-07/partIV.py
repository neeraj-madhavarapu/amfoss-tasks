import requests
import bs4

root_url = "https://www.opensubtitles.org"
headers = {'User-Agent': "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:129.0) Gecko/20100101 Firefox/129.0"}

def search_subtitle(imdb_id):
    """
    Search for subtitles by IMDb ID on OpenSubtitles.
    """
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
    soup = bs4.BeautifulSoup(content, 'lxml')
    return soup

def extract_links(soup):
    """
    Extract subtitle download links from the parsed HTML.
    """
    for a_tag in soup.findAll('a'):
        link = a_tag.get('href')
        text = a_tag.text
        if link:
            print(f"{text}: {root_url}{link}")

# Main script
imdb_id = "0393162"  # Example IMDb ID
content = search_subtitle(imdb_id)
if content:
    soup = parse_html(content)
    extract_links(soup)

