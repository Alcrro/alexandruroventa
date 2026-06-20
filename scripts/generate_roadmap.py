#!/usr/bin/env python3
"""
Generates roadmap.json from docs/features/*.md.

Status logic:
  - "done"        — all TODO items checked, or no TODO section
  - "in-progress" — at least one unchecked item
  - "todo"        — no checked items at all
"""

import json
import re
from pathlib import Path

NAME_MAP = {
    "home": "Home",
    "about": "About",
    "skills": "Skills",
    "projects": "Projects",
    "certificates": "Certificates",
    "experience": "Experience",
    "performance": "Performance",
    "contact": "Contact",
}

docs_dir = Path("docs/features")
roadmap = []

for md_file in sorted(docs_dir.glob("*.md")):
    name = NAME_MAP.get(md_file.stem, md_file.stem.capitalize())
    content = md_file.read_text(encoding="utf-8")

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

output = Path("roadmap.json")
output.write_text(json.dumps(roadmap, indent=2, ensure_ascii=False) + "\n")
print(f"Roadmap generat: {len(roadmap)} feature-uri")
for item in roadmap:
    print(f"  {item['name']}: {item['status']}")
