# Variation II — verification receipt

Verified locally on 4 September 2026 in the in-app Chromium browser.

## Checked

- Desktop visual review at 1440 × 1000: opening, withdrawn curtains, split-shell reveal, open bird, expanding aperture, mechanism notes, all three material compositions, and recital.
- Phone-sized visual review at 390 × 844: opening, circular aperture, expanded mechanism, all three materials, and recital. No horizontal page overflow was detected.
- Product images load successfully; the new open product preserves transparent spaces around the bird and frame. Original closed product also has an alpha channel.
- Scrolling forward changes the opening; Page Up reverses it. Observed theatre progress returned from 0.564 to 0.282, with opening returning to zero.
- Material controls navigate to the corresponding composition; the counter updates to 02 / 03 and 03 / 03.
- Chapter links navigate to the expected sections.
- Reduce motion changes pinned stages to ordinary relative-positioned sections and removes the horizontal track transform. Material panels stack vertically. Enabling full motion restores the choreography.
- Audio controls enter the playing state after a click, can be stopped, and return to the idle state after the twelve-second sketch. This verifies browser state and timing, not a calibrated listening assessment.
- Browser warning/error log was empty during the tested flows.
- JavaScript syntax check passed. Every local image, stylesheet, script and original-design link resolves to an existing file.

## Original preserved

The original design's main files match the SHA-256 values recorded before this work:

- index.html: ACB0CF99972639A4844F21AD972B13FE4CE8A3C4FEF70D25BBBAC0B1D661332F
- styles.css: 63AA4D3CACC2D90C9B5271115452250A35831A12E5DEDFE201ABD2F2CCE329FF
- script.js: 02B8A6A167E76DCDD5F17878A7EBC475C8650FE3448C214F21B07E26151ACC76

No original-design file was edited. No commit, push or deployment was performed for this variation.

## Boundaries

This is a locally tested concept website, not a production storefront or a physically accurate mechanical simulation. The generated imagery and split-shell animation are illustrative. Mobile testing used viewport emulation, not a physical phone. Safari, Firefox, screen-reader behavior, operating-system motion-preference changes, no-JavaScript mode and performance benchmarks were not independently tested; fallback handling for motion preference and disabled JavaScript is implemented.
