import re
import os

html_path = "FOUNDATIONV1.html"
js_path = "marine_specifics.js"

if not os.path.exists(js_path):
    print(f"Error: {js_path} not found.")
    exit(1)

if not os.path.exists(html_path):
    print(f"Error: {html_path} not found.")
    exit(1)

with open(js_path, "r", encoding="utf-8") as f:
    js_content = f.read()

with open(html_path, "r", encoding="utf-8") as f:
    html_content = f.read()

# Marker for the start of the specific script block
start_marker = "// BAZA WIEDZY SPECYFICZNA DLA MAREK"

# Let's locate the index of the marker
marker_idx = html_content.find(start_marker)
if marker_idx == -1:
    print("Marker not found in HTML!")
    exit(1)

# Find the opening <script> before the marker
script_start_idx = html_content.rfind("<script>", 0, marker_idx)
if script_start_idx == -1:
    print("Script start tag not found!")
    exit(1)

# Find the closing </script> after the marker
script_end_idx = html_content.find("</script>", marker_idx)
if script_end_idx == -1:
    print("Script end tag not found!")
    exit(1)

print(f"Found script block from {script_start_idx} to {script_end_idx}")

# Construct the new HTML
# We include <script> and </script> in the replacement logic to be safe/clean
new_html = (
    html_content[:script_start_idx] +
    "<script>\n" +
    js_content +
    "\n" +
    html_content[script_end_idx:]
)

with open(html_path, "w", encoding="utf-8") as f:
    f.write(new_html)

print("Update successful.")
