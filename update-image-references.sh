#!/bin/bash

# Find all markdown files in the docs directory
find docs -type f -name "*.md" -print0 | while IFS= read -r -d $'\0' file; do
  echo "Processing file: $file"
  
  # Replace image references from PNG to SVG
  sed -i 's/\(\.\.\/\.\.\/static\/img\/[^)]*\)\.png/\1.svg/g' "$file"
  sed -i 's/\(\/img\/[^)]*\)\.png/\1.svg/g' "$file"
done

echo "All image references updated!"
