import pathlib
import re
import urllib.request
import ssl
from urllib.error import URLError, HTTPError

root = pathlib.Path(__file__).resolve().parent.parent
schemes_file = root / 'src' / 'data' / 'schemes.js'
how_file = root / 'src' / 'data' / 'howToApply.js'

text = schemes_file.read_text(encoding='utf-8', errors='replace')
how_text = how_file.read_text(encoding='utf-8', errors='replace')

# Parse HOW_TO_APPLY steps: capture key -> list of (step, detail)
how_steps = {}
# Find entries like "key": { ... steps: [ ... ] }
for m in re.finditer(r'"([^"]+)"\s*:\s*\{(.*?)\n\s*\}', how_text, re.S):
    key = m.group(1)
    block = m.group(2)
    steps_block_match = re.search(r'steps\s*:\s*\[(.*?)\]\s*,', block, re.S)
    if not steps_block_match:
        continue
    steps_block = steps_block_match.group(1)
    steps = []
    for s in re.finditer(r'\{\s*step\s*:\s*"([^"]+)"\s*,\s*detail\s*:\s*"([^"]+)"\s*\}', steps_block, re.S):
        steps.append((s.group(1).strip(), s.group(2).strip()))
    if steps:
        how_steps[key] = steps

# Helper to build JS applicationSteps array from HOW_TO_APPLY format
def build_app_steps(steps):
    lines = ['    applicationSteps: [']
    for idx, (title, desc) in enumerate(steps, start=1):
        title_js = title.replace('"', '\\"')
        desc_js = desc.replace('"', '\\"')
        lines.append(f'      {{ stepNumber: {idx}, title: "{title_js}", description: "{desc_js}" }},')
    lines.append('    ],')
    return '\n'.join(lines)

# Insert applicationSteps for any scheme id present in HOW_TO_APPLY but missing in schemes.js
changes = []
for key, steps in how_steps.items():
    # find id: "key"
    pat = re.compile(r'(id:\s*"' + re.escape(key) + r'"\s*,.*?applyUrl:\s*"([^"]*)"\s*,\n)', re.S)
    m = pat.search(text)
    if m:
        # check if applicationSteps already present within the scheme object (search shortly after m.start())
        start_pos = m.end()
        snippet = text[start_pos:start_pos+800]
        if 'applicationSteps' in snippet:
            continue
        insert = build_app_steps(steps) + '\n'
        text = text[:start_pos] + insert + text[start_pos:]
        changes.append((key, 'inserted applicationSteps'))

# Validate and fix applyUrl values
# Extract KNOWN_URLS mapping from file
known = {}
for m in re.finditer(r'"([^"]+)"\s*:\s*"([^"]+)"\s*,', text):
    k, v = m.group(1), m.group(2)
    known[k] = v

# Collect all applyUrl occurrences and their surrounding id (if any)
apply_entries = []
for m in re.finditer(r'id:\s*"([^"]+)"\s*,(.*?)(applyUrl:\s*"([^"]+)")', text, re.S):
    sid = m.group(1)
    apply_url = m.group(4)
    apply_entries.append((sid, apply_url, m.start(3), m.end(3)))

ssl_ctx = ssl.create_default_context()
ssl_ctx.check_hostname = False
ssl_ctx.verify_mode = ssl.CERT_NONE

def check_url(url, timeout=8):
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=timeout, context=ssl_ctx) as resp:
            return resp.getcode()
    except HTTPError as e:
        return e.code
    except URLError as e:
        return None
    except Exception:
        return None

repairs = []
for sid, url, s_pos, e_pos in apply_entries:
    status = check_url(url)
    if status == 200:
        continue
    # try to find candidate in known by sid or keywords
    candidate = None
    if sid in known:
        candidate = known[sid]
    else:
        # try simple keyword matches
        lower = sid.lower()
        for k, v in known.items():
            if k in lower or lower in k:
                candidate = v
                break
    if candidate and check_url(candidate) == 200:
        # replace the applyUrl in text between s_pos and e_pos
        new_segment = re.sub(r'applyUrl:\s*"[^"]+"', f'applyUrl: "{candidate}"', text[s_pos:e_pos])
        text = text[:s_pos] + new_segment + text[e_pos:]
        repairs.append((sid, url, candidate))
    else:
        repairs.append((sid, url, None))

# Write back if changes
if changes or repairs:
    schemes_file.write_text(text, encoding='utf-8')

# Print summary
print('Inserted applicationSteps for:', [c[0] for c in changes])
print('URL repairs (sid, old, new or None if no repair):')
for r in repairs:
    print(r)
print('Done')
