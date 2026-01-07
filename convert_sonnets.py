import json
import re

# Step 1: Read the file
with open('sonnets.txt', 'r') as f:
    content = f.read()

# Step 2: Parse structure - Split on Roman numeral headers
# Pattern matches Roman numerals followed by a period at start of line
lines = content.split('\n')
sonnets = []
current_sonnet = []
in_sonnet = False

for line in lines:
    # Check if line is a Roman numeral header
    if re.match(r'^[IVXLCDM]+\.$', line.strip()):
        # If we were building a sonnet, save it
        if current_sonnet:
            sonnets.append(current_sonnet)
        current_sonnet = []
        in_sonnet = True
    elif in_sonnet and line.strip():
        # Step 3: Extract lines - Collect non-empty lines and strip whitespace
        current_sonnet.append(line.strip())

# Don't forget the last sonnet
if current_sonnet:
    sonnets.append(current_sonnet)

# Step 4: Build array - Already have array of arrays
# Verify each sonnet has 14 lines
for i, sonnet in enumerate(sonnets):
    if len(sonnet) != 14:
        print(f"Warning: Sonnet {i+1} has {len(sonnet)} lines instead of 14")

# Step 5: Write JSON - Output to data/sonnets.json
with open('data/sonnets.json', 'w') as f:
    json.dump(sonnets, f, indent=2)

print(f"Successfully converted {len(sonnets)} sonnets to JSON")
