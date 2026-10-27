import os, sys, re
from html.parser import HTMLParser

base_dir = r'C:\Users\USUARIO\Desktop\PYTHON - PROYECTOS\AURUM NOVA PROYECTO\core\02_REPOSITORIES\aurum-nova'
errors = []

class AnchorParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.anchors = set()
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if attrs.get('id'):
            self.anchors.add(attrs['id'])
        if tag.lower() == 'a' and attrs.get('name'):
            self.anchors.add(attrs['name'])

def check_file_not_empty(filepath, description):
    if not os.path.exists(filepath):
        errors.append(f"{description}: file not found at {filepath}")
        return
    size = os.path.getsize(filepath)
    if size == 0:
        errors.append(f"{description}: file is empty")

def check_html_valid(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    parser = AnchorParser()
    parser.feed(content)
    anchors = parser.anchors
    link_pattern = re.compile(r'href=["\']([^"\']+)["\']')
    for match in link_pattern.finditer(content):
        href = match.group(1)
        if href.startswith('#'):
            anchor = href[1:]
            if anchor and anchor not in anchors:
                errors.append(f"Broken anchor link: {href} in {filepath}")
        elif href.startswith('/'):
            full_path = os.path.join(base_dir, href.lstrip('/'))
            if not os.path.exists(full_path):
                errors.append(f"Missing file for link: {href} in {filepath}")

check_file_not_empty(os.path.join(base_dir, 'index.html'), 'Main HTML')
check_html_valid(os.path.join(base_dir, 'index.html'))

if errors:
    for e in errors:
        print(f"ERROR: {e}")
    sys.exit(1)
else:
    print("site structure: PASS")