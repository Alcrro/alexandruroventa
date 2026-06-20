#!/usr/bin/env python3
"""
Generates roadmap.json from docs/features/*.md.

Usage: python3 generate_roadmap.py [repo_path]
  repo_path — root of the target repo (default: current directory)

Supports two formats:
  1. Feature table  — one file with | Feature | Status | Progress | columns
  2. Per-feature    — one .md per feature with ## TODO checkboxes
"""

import json
import re
import sys
from pathlib import Path

TABLE_HEADER = re.compile(r"\|\s*Feature\s*\|\s*Status\s*\|\s*Progress\s*\|", re.IGNORECASE)
SEPARATOR_ROW = re.compile(r"^[-:]+$")

root = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(".")
docs_dir = root / "docs/features"
roadmap = []


def status_from_table(content):
    entries = []
    for feature, status_text, _ in re.findall(
        r"^\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|",
        content,
        re.MULTILINE,
    ):
        feature = feature.strip()
        if feature.lower() == "feature" or SEPARATOR_ROW.match(feature):
            continue
        s = status_text.strip()
        if "✅" in s or "done" in s.lower():
            status = "done"
        elif "🔄" in s or "in progress" in s.lower():
            status = "in-progress"
        elif "⬜" in s or "not started" in s.lower():
            status = "not-started"
        else:
            status = "done"
        name = feature.replace("-", " ").replace("_", " ").title()
        entries.append({"name": name, "status": status})
    return entries


def status_from_todos(content, stem):
    h1 = re.search(r"^#\s+(.+)$", content, re.MULTILINE)
    name = h1.group(1).strip() if h1 else stem.replace("-", " ").replace("_", " ").title()

    todo_match = re.search(r"## TODO\s*(.*?)(?=\n## |\Z)", content, re.DOTALL)
    if not todo_match:
        return {"name": name, "status": "done"}

    section = todo_match.group(1)
    done = len(re.findall(r"- \[x\]", section, re.IGNORECASE))
    pending = len(re.findall(r"- \[ \]", section))

    if done + pending == 0 or pending == 0:
        status = "done"
    elif done == 0:
        status = "not-started"
    else:
        status = "in-progress"

    return {"name": name, "status": status}


for md_file in sorted(docs_dir.glob("*.md")):
    content = md_file.read_text(encoding="utf-8")
    if TABLE_HEADER.search(content):
        roadmap.extend(status_from_table(content))
    else:
        roadmap.append(status_from_todos(content, md_file.stem))

output = root / "roadmap.json"
output.write_text(json.dumps(roadmap, indent=2, ensure_ascii=False) + "\n")
print(f"Roadmap generat: {len(roadmap)} feature-uri")
for item in roadmap:
    print(f"  {item['name']}: {item['status']}")
