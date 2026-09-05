# Publication and preservation record

Prepared on 4 September 2026, Pacific time.

## Scope

Destination: `az9713/astra-web-design`. Created using the GitHub CLI with private visibility, confirmed through the GitHub API. This is a new, isolated repository, not a new remote or branch in the source workspace's existing repository. No source-workspace history is exported.

The export contains both complete original site folders, the root README and prompt record, this receipt, and a separate HTML/CSS/JavaScript comparison desk. The video, downloaded subtitles, reference frames, raw task logs, browser data, unrelated reports and credentials are excluded. The model attribution in the README was checked against local task metadata; only the relevant model names and observable design history are published.

## Preservation

All **21 original files** across the two project directories were compared with their source copies using SHA-256. Every file matched. No site code, asset, original README, design note or earlier QA receipt was changed for the export. The comparison controls operate through a separate same-origin wrapper rather than modifying either site.

## Checks for this publication

- JavaScript syntax checks passed for both sites and the comparison desk.
- The two sites loaded within the side-by-side viewer.
- Opening and mechanism progress controls worked, including movement back from the end of a scene.
- Making/materials and listening buttons navigated to the corresponding sections.
- Both frame canvases used the selected dimensions: 1200 × 800 for desktop or 390 × 844 for phone. Phone canvases fit within their columns without upscaling.
- No horizontal overflow was detected in the comparison desk at the tested desktop viewport.
- A fresh browser load and subsequent opening/mechanism interactions produced no warning/error entries. One earlier automation session logged a MutationObserver error after reload; it did not reproduce on the fresh page. None of the exported source files calls MutationObserver; the error's origin was not established.
- Text scans found no local absolute paths or matching credential/private-key patterns in the exported HTML, CSS, JavaScript and Markdown. This is a focused export audit, not a comprehensive security assessment.
- PNG chunk inspection found no tEXt, iTXt, zTXt or eXIf metadata chunks.

The original sites' earlier test claims and limitations remain in their accompanying notes; they are not represented as newly repeated exhaustive tests. This publication did not include physical-phone testing, cross-browser certification, accessibility certification or performance benchmarking.

## Running and hosting

Serve this directory over localhost as described in the README. Individual websites can also be opened directly; the cross-frame scene controls require a same-origin HTTP server. Source hosting on GitHub is not website deployment. This upload does not create GitHub Pages or make either design public.

The commit and remote branch are verified after pushing; the handoff message supplies the resulting commit identifier. No commit identifier is embedded in this file, avoiding a self-referential content hash.
