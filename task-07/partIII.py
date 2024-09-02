import struct
import os
import requests
import tempfile
import click

__64k = 65536
__longlong_format_char = 'q'
__byte_size = struct.calcsize(__longlong_format_char)

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

        # Get file size from remote URL
        response = requests.head(url)
        filesize = int(response.headers.get('content-length', 0))

        if filesize < __64k * 2:
            try:
                filesize = int(str(response.headers.get('content-range', '0')).split('/')[1])
            except:
                pass

        # Download the first and last 64KB
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

        # Read the first 64KB
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

        # Read the last 64KB
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

@click.command()
@click.argument('file_path', type=click.Path(exists=True))
def get_file_info(file_path):
    """
    Get the file hash and size for the given file path.
    """
    hash_value, file_size = hash_size_file_url(file_path)
    if hash_value == 'IOError':
        click.echo("Error processing file.")
    else:
        click.echo(f"File Size: {file_size} bytes")
        click.echo(f"File Hash: {hash_value}")

if __name__ == '__main__':
    get_file_info()
