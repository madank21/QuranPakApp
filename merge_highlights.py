import json
import re

# Read and parse the text file to extract page-box-highlight mappings
with open(r'c:\Users\mehun\OneDrive\Desktop\300---609.txt', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract all entries: Page XXX\nBox XXX_Y H highlight_ids
page_boxes = {}

# Find all "Page" entries
lines = content.split('\n')
current_page = None

for i, line in enumerate(lines):
    line = line.strip()
    if line.startswith('Page '):
        match = re.match(r'Page\s+(\d+)', line)
        if match:
            current_page = int(match.group(1))
            if current_page not in page_boxes:
                page_boxes[current_page] = {}
    elif line.startswith('Box ') and current_page is not None:
        # Parse Box entry
        match = re.match(r'Box\s+(\d+_\d+)\s+H\s+(.*)', line)
        if match:
            box_id = match.group(1)
            highlights_str = match.group(2).strip()
            
            # Parse highlights
            if highlights_str.lower() == 'no highlights':
                highlights = []
            else:
                highlights = [h.strip() for h in highlights_str.split('&') if h.strip()]
            
            page_boxes[current_page][box_id] = highlights

# Now update pageData.json
with open(r'c:\Pro\QuranPakApp\src\assets\pageData.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

updated = 0
for page_entry in data:
    page_id = page_entry['id']
    if page_id in page_boxes:
        for box in page_entry.get('boxes', []):
            box_id = box['id']
            if box_id in page_boxes[page_id]:
                box['highlightIds'] = page_boxes[page_id][box_id]
                updated += 1

with open(r'c:\Pro\QuranPakApp\src\assets\pageData.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"Updated {updated} boxes with highlight data")
print("Pages found:", sorted(page_boxes.keys()))
