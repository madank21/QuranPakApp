#!/usr/bin/env python3
import json
import re

# Read the text file
with open(r'c:\Users\mehun\OneDrive\Desktop\300---609.txt', 'r', encoding='utf-8') as f:
    text_content = f.read()

# Parse the text file
# Format: Page XXX\nBox XXX_Y H highlight_ids
pattern = r'Page\s+(\d+)\s*\n.*?Box\s+(\d+_\d+)\s+H\s+(.+?)(?=\n(?:Page|Box|$))'
matches = re.findall(pattern, text_content, re.DOTALL)

# Create a dictionary to store page and box information
page_box_highlights = {}

for page_str, box_id, highlights_str in matches:
    page_num = int(page_str)
    
    if page_num not in page_box_highlights:
        page_box_highlights[page_num] = {}
    
    # Clean up highlights string
    highlights_str = highlights_str.strip()
    
    # Parse highlight IDs
    if highlights_str.lower() == 'no highlights':
        highlight_ids = []
    else:
        # Split by & and clean up
        highlight_ids = [h.strip() for h in highlights_str.split('&')]
    
    page_box_highlights[page_num][box_id] = highlight_ids

# Read the pageData.json file
with open(r'c:\Pro\QuranPakApp\src\assets\pageData.json', 'r', encoding='utf-8') as f:
    page_data = json.load(f)

# Update the pageData.json with highlight information
updated_count = 0
for page_entry in page_data:
    page_id = page_entry['id']
    
    if page_id in page_box_highlights:
        for box in page_entry['boxes']:
            box_id = box['id']
            
            if box_id in page_box_highlights[page_id]:
                # Update the highlightIds
                highlight_ids = page_box_highlights[page_id][box_id]
                box['highlightIds'] = highlight_ids
                updated_count += 1

# Write the updated data back
with open(r'c:\Pro\QuranPakApp\src\assets\pageData.json', 'w', encoding='utf-8') as f:
    json.dump(page_data, f, indent=2, ensure_ascii=False)

print(f"Updated {updated_count} boxes with highlight information")
