#!/usr/bin/env python3
"""
Generates roadmap.json from docs/features/*.md.

Usage: python3 generate_roadmap.py [repo_path]
  repo_path — root of the target repo (default: current directory)

Status logic:
  - "done"        — all TODO items checked, or no TODO section
  - "in-progress" — at least one unchecked item
  - "not-started" — no checked items
"""

import json
import re
import sys
from pathlib import Path

root = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(".")
docs_dir = root / "docs/features"
roadmap = []

for md_file in sorted(docs_dir.glob("*.md")):
    content = md_file.read_text(encoding="utf-8")
    h1 = re.search(r"^#\s+(.+)$", content, re.MULTILINE)
    name = h1.group(1).strip() if h1 else md_file.stem.replace("-", " ").replace("_", " ").title()

    todo_match = re.search(r"## TODO\s*(.*?)(?=\n## |\Z)", content, re.DOTALL)

    if not todo_match:
        status = "done"
    else:
        section = todo_match.group(1)
        done_count = len(re.findall(r"- \[x\]", section, re.IGNORECASE))
        pending_count = len(re.findall(r"- \[ \]", section))
        total = done_count + pending_count

        if total == 0 or pending_count == 0:
            status = "done"
        elif done_count == 0:
            status = "not-started"
        else:
            status = "in-progress"

    roadmap.append({"name": name, "status": status})

output = root / "roadmap.json"
output.write_text(json.dumps(roadmap, indent=2, ensure_ascii=False) + "\n")
print(f"Roadmap generat: {len(roadmap)} feature-uri")
for item in roadmap:
    print(f"  {item['name']}: {item['status']}")
