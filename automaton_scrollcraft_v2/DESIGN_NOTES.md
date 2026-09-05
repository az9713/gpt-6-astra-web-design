# LARK — The Private Theatre / Variation II

This is a separate design under `automaton_scrollcraft_v2`. Variation I remains under `automaton_scrollcraft_site`.

## What changed

The opening is a theatre with explicit depth planes: distant lake and cliffs; a moon disc; huge LARK lettering; an orbital score; the product; silk curtains and a low silk foreground. The product hides parts of the lettering. The silk hides parts of the stage. Scenery, text, curtains and product have different scroll rates.

The overture first withdraws the foreground curtains. It then separates two independently clipped shell images through rotation and translation, exposing the opened automaton behind them. This is an illustrative reveal, not a physically simulated or buildable mechanism.

A circular aperture expands from a small detail view into a full-screen photograph of the musical movement. The page changes scale from object to mechanism. Text and annotations enter only after the aperture has opened.

The materials chapter travels horizontally during ordinary vertical scrolling, with three full-screen compositions. Each combines a large word, an image plane, and foreground copy. Buttons jump directly to individual materials.

The final listening room restores stillness. A button plays a twelve-second original synthesized music-box sketch. No audio starts automatically.

## Video reference and evidence boundary

Reference: https://www.youtube.com/watch?v=QhmhUgccaS0

The saved local video, subtitles and frame captures were available from the previous viewing. For this variation, the selected saved frames were reinspected; the entire video was not watched again.

- Around 2:28–2:36, the OFFGRID bicycle example explicitly separates scenery, text, bicycle and foreground rocks. This informs the depth and occlusion of the opening theatre.
- Saved frame 1:40 shows the watch collection's restrained type hierarchy and burgundy material language. This informs the quiet typography around the theatrical scenes.
- The prior viewing identified the circular product reveal and scroll reframing in the opening examples. The aperture and material journey are original adaptations of that grammar.
- Hyperframes was excluded from this exercise.

This is a reconstruction of the demonstrated design approach. Nate's actual Scrollcraft skill source was not installed or executed.

## Design decisions

Palette: ink plum #24131f, oxblood #582333, aged rose #ae8186, pearl #e7ddd9, champagne #dfc6a0, mist #b3aebf. Display type uses a Bodoni/Didot serif stack, complemented by Segoe UI for controls and captions. The landscape and silk give the product a setting with foreground and background, and supply the principal visual distinction from Variation I.

The product is fictional. No maker, provenance, edition-size, price or manufacturing specification is being represented as verified. The bronze and lacquer images are concept imagery; the shell movement is theatrical illustration. The musical-cylinder explanation describes the general principle of a cylinder music box.

## Implementation and use

Open `index.html` directly, or serve the parent workspace and visit `/automaton_scrollcraft_v2/`. All runtime assets are local; no package install, external font request, remote library, API key or build step is required. The footer links to the original sibling design when both directories are served together.

Normal scrolling remains native. All pinned scenes derive from scroll position, so the same positions reproduce the same composition when scrolling backward. No wheel interception or forced automatic journey is used. Pointer movement adds a small amount of foreground/background parallax on mouse devices.

“Reduce motion” switches to a complete, ordinary reading layout: the open object is shown, the mechanism explanation becomes static, and materials stack vertically. The operating-system reduced-motion preference enables that layout automatically. Navigation, skip link, keyboard focus and direct material buttons remain available. The page also has a basic no-JavaScript reading fallback.

The audio is synthesized in the browser, labelled as a digital sketch, starts only on a button press, can be stopped, and stops when the page becomes hidden.

## Assets and provenance

Four original concept assets were copied from Variation I without editing its files. Three additional image-generation outputs were saved in this variation's assets directory. The new open product has real alpha transparency, including the gaps around the bird and frame. The page preserves those fine edges when compositing it over the scenery and lettering. Two CSS-clipped halves of the closed product provide the illustrative shell reveal.

See `ASSET_PROMPTS.md` for the exact prompts used with the built-in image-generation tool. All images remain project-local. No material from the reference video is embedded in the delivered site.
