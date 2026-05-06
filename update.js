const fs = require('fs');

// Read the text file with page-box-highlight mappings
const textContent = fs.readFileSync('c:\\\\Users\\\\mehun\\\\OneDrive\\\\Desktop\\\\300---609.txt', 'utf-8');

// Parse page-box-highlight data
const pageBoxMap = {};
const lines = textContent.split('\n');

let currentPage = null;
for (let line of lines) {
  line = line.trim();
  
  // Match "Page XXX" 
  const pageMatch = line.match(/^Page\s+(\d+)/);
  if (pageMatch) {
    currentPage = parseInt(pageMatch[1]);
    if (!pageBoxMap[currentPage]) {
      pageBoxMap[currentPage] = {};
    }
    continue;
  }
  
  // Match "Box XXX_Y H highlights"
  if (currentPage && line.match(/^Box\s+\d+_\d+/)) {
    const boxMatch = line.match(/^Box\s+(\d+_\d+)\s+H\s+(.+)$/);
    if (boxMatch) {
      const boxId = boxMatch[1];
      let highlightsStr = boxMatch[2].trim();
      
      // Parse highlights
      let highlights = [];
      if (highlightsStr.toLowerCase() !== 'no highlights') {
        highlights = highlightsStr.split('&').map(h => h.trim()).filter(h => h);
      }
      
      pageBoxMap[currentPage][boxId] = highlights;
    }
  }
}

// Load pageData.json
const pageData = JSON.parse(fs.readFileSync('c:\\\\Pro\\\\QuranPakApp\\\\src\\\\assets\\\\pageData.json', 'utf-8'));

// Update pageData with highlights
let updatedCount = 0;
for (let pageEntry of pageData) {
  const pageId = pageEntry.id;
  
  if (pageBoxMap[pageId]) {
    for (let box of (pageEntry.boxes || [])) {
      const boxId = box.id;
      
      if (pageBoxMap[pageId][boxId]) {
        box.highlightIds = pageBoxMap[pageId][boxId];
        updatedCount++;
      }
    }
  }
}

// Write updated data
fs.writeFileSync('c:\\\\Pro\\\\QuranPakApp\\\\src\\\\assets\\\\pageData.json', JSON.stringify(pageData, null, 2), 'utf-8');

console.log(`Updated ${updatedCount} boxes`);
console.log(`Pages found: ${Object.keys(pageBoxMap).sort((a, b) => a - b).join(', ')}`);
