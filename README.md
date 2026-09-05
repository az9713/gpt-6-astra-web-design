# LARK: two models, two readings of Scrollcraft

Two complete, self-contained luxury websites for the same fictional mechanical music automaton, **Atelier Vesper — LARK No. 01**. The comparison asks a specific question: **how does a page change when layering becomes a system of moving foreground, product, type and scenery, rather than mainly a product reveal?**

Version I was built by **GPT-5.6 Sol**. Version II was built by **GPT-6 Astra**, using Version I as its starting context and responding to a request for more layering and Scrollcraft effects. Both build turns recorded high reasoning effort. These identities were verified against local task metadata; raw conversation records are not included in this repository.

**This is an iterative design comparison, not a controlled model benchmark.** The models did not receive identical inputs. Astra inherited the brand, product, four images, earlier design and video analysis, and received an explicit request to increase the effects. Differences cannot be attributed to model identity alone. The image-generation tool's underlying model identity was not established here; the model labels identify the coding/art-direction agents, not necessarily the image generator.

## View them side by side

From the repository root, run:

```sh
python -m http.server 8767 --bind 127.0.0.1
```

Then open [the comparison desk](http://127.0.0.1:8767/). Its two independent frames preserve both original websites. Choose a desktop or phone viewport, jump to corresponding chapters, or use the opening-progress slider to compare the same fraction of each opening sequence. You can also scroll each frame independently and open either site full size.

The viewer scales equal-sized browser viewports to fit the two columns. It does **not** equate an entire page's scroll percentage: the stories have different lengths. Chapter matching is approximate—Version I's making section is not the same composition as Version II's materials gallery. On narrow screens, the desk stacks the frames.

| | Version I · Sol | Version II · Astra |
|---|---|---|
| Website | [LARK No. 01](automaton_scrollcraft_site/index.html) | [The Private Theatre](automaton_scrollcraft_v2/index.html) |
| Governing idea | Silence, engineered to bloom | A small object containing a private theatre |
| Main visual metaphor | A botanical jewel awakening in darkness | Curtains opening onto a miniature performance |
| Opening | Closed and open product images crossfade; type drifts and the object gently scales | Silk withdraws; lettering splits; two clipped shell halves rotate and separate; the open bird remains |
| Depth | Atmosphere and rings → type → product → glint and interface | Landscape → moon → type → orbit → product → foreground silk → interface |
| Mechanism | A full-screen macro image slowly zooms and shifts, with timed annotations | A circular aperture grows into the macro image, followed by explanatory copy and annotations |
| Beyond the mechanism | Quiet making, listening, edition and private-viewing sections | Quiet prologue, sideways materials gallery and listening finale |
| Compositing | Screen blend and a soft radial mask integrate the open image into darkness | Transparent product cutout preserves scenery through the frame; CSS splits the closed image into shell props |
| Typography | Iowan Old Style / Baskerville / Times; Arial Narrow / Helvetica / Arial | Bodoni MT / Didot / Times; Segoe UI / Arial |
| Colour | Near-black aubergine, bronze and paper, with celadon and red accents | Ink plum, oxblood silk, champagne, pearl and misty lilac |
| Reduced motion | CSS suppresses animations and selected transforms; pinned sections and scroll-driven opacity remain | An on-page control and OS preference select a static reading layout with vertically stacked materials |
| Main strength* | Coherent product proposition and restrained editorial rhythm | Stronger visible occlusion, more distinct depth planes and greater changes of scale |
| Main tradeoff* | The opening reads chiefly as a transformation between two pictures | More pinned scrolling and more effects increase pacing and attention demands |

*Strengths and tradeoffs are editorial judgments about these artifacts, not measured model scores. Font appearance depends on installed system fonts; neither site downloads a web font.*

## The prompt that produced the designs

The user first asked for a reusable luxury-site prompt grounded in [Nate's video](https://www.youtube.com/watch?v=QhmhUgccaS0), especially its first three minutes. The emphasis was on actually examining the websites, with permission to omit the Hyperframes chapter. The earlier analysis used transcript and visual frame sampling across the relevant timeline; it was not a recovery of Nate's private skill or source code.

Sol produced a generic prompt that required a creative concept before code, explicit depth planes and occlusions, product-relevant scroll choreography, quiet editorial intervals, responsive layouts, reduced motion and a visual refinement pass. The full generated template and original user requests are preserved in [PROMPTS.md](PROMPTS.md).

The user then selected the product:

> OK Mechanical music automaton. Let us catapult ourselves to the top of the design world. Shall we ? Go !

After Version I, the user requested:

> I want a 2nd variation. more layering and scrollcraft effects. do not delete previous design. ask me if any question. refer to the video which you have watched for layering and scrollcraft

The second prompt deliberately shifts the objective toward stronger depth and choreography. It also requires preservation, which is why these remain separate projects.

## How Sol developed Version I

This account reconstructs the **observable design process** from the public progress messages, source files and assets. It is not a claim to expose a model's private internal reasoning.

Sol first invented a coherent brand and audience: Atelier Vesper, an imagined maison serving collectors of kinetic art. Its stated concept was “Silence, engineered to bloom.” The resulting object resembles a closed botanical jewel whose lacquered petals conceal a mechanical songbird. Aubergine, bronze and pale inlay make the product itself carry the luxury identity.

It generated four related images: the closed sculpture, the opened object, the musical movement in close-up, and an artisan at work. Those images became the narrative's anchors. A pinned opening makes the visitor's scrolling feel like winding and awakening the object. The implementation uses two overlapping images with scroll-driven opacity, a small scale change, drifting words, orbital outlines and a moving glint. **The shell is not individually articulated in this version.**

The next pinned scene moves closer to the musical cylinder and comb, revealing annotations in sequence. Quiet sections then build the invented ownership story: craft, a musical study, rarity and a private viewing. This is a relatively complete fictional product presentation, not just an animation demonstration.

During visual review, Sol reported an exposed rectangular background around the open image. The final code uses screen blending and a radial mask to soften that boundary into the dark scene. This solution serves a dark setting but does not create a clean, generally reusable product cutout. Desktop/mobile and audio checks were reported in the original delivery; the repository preserves the original code, including its limitations.

## How Astra developed Version II

Astra retained the maison, automaton and original images, but reframed the experience as **The Private Theatre**. It re-examined selected saved video frames rather than repeating the full viewing. The bicycle example around 2:14–2:36 was especially important: scenery, lettering, bicycle and foreground rocks occupy separate planes. Astra adapted that spatial relationship to a luxury object: lake and cliffs, enormous lettering, automaton and close silk curtains.

Three additional image outputs supplied the missing spatial ingredients: an atmospheric landscape, oxblood silk and an open-product cutout. The final cutout has real alpha transparency, including the openings around the bird. An interim traced-mask approach was superseded; the delivered site uses the image's alpha, not the interim silhouettes.

The opening becomes a sequence of distinct spatial events. Foreground curtains withdraw faster than the scenery moves. Large letters separate behind the object. Two CSS-clipped halves of the closed image rotate and move apart, revealing the open bird. They subsequently fade away. These are **illustrative 2D shell props with perspective transforms**, not a rigged 3D model or a mechanically faithful opening.

A circular aperture then changes the scale of attention from the whole object to its musical movement. A later gallery changes the direction of travel: vertical scrolling moves three full-screen material compositions horizontally. The finale returns to stillness and user-triggered sound. The additional sequences are a deliberate response to the second prompt; they go beyond the original template's restraint of one or two signature interactions.

The visual review corrected compositing, mobile text overlap and legibility. The reduced-motion option goes further than Version I by replacing the pinned choreography with an ordinary reading layout. See the preserved [design notes](automaton_scrollcraft_v2/DESIGN_NOTES.md), [asset prompts](automaton_scrollcraft_v2/ASSET_PROMPTS.md) and [pre-publication QA receipt](automaton_scrollcraft_v2/QA.md). The receipt's statement that nothing had been pushed describes the build-stage handoff, before this repository was created.

## What to look for: Scrollcraft versus layering

Here, **Scrollcraft** means coordinating narrative, art direction and scroll-dependent changes in composition. **Layering** means giving objects separate spatial roles, with intentional overlap and different motion. A high z-index alone is not sufficient: the visitor must perceive something as being in front of, behind, or revealed by something else.

At opening progress zero, compare how each product interrupts the typography. Near halfway, compare Sol's crossfade with Astra's separated shell props. Near the end, check whether the composition resolves into a clear object rather than remaining visually busy. Scroll backward: the scene should retrace the same state. Ordinary editorial entrance fades are not the same as those reversible, scroll-linked scenes.

In the mechanism chapter, compare moving closer to an already visible image with passing through an expanding circular opening. Both lead to detail, but the second makes the transition itself part of the spatial story. In the making/materials chapters, ask whether sideways motion improves your understanding or mainly adds spectacle. This is a judgment to make with the page in motion, not from a hero screenshot alone.

For a fairer future model test, give each model the same prompt, assets, reference evidence, starting code, tool access and effort budget; prohibit access to the other output; then compare blinded versions. These two designs are better understood as **concept creation followed by a directed spatial refinement**.

## Scope, preservation and limitations

Both sites use local HTML, CSS, JavaScript and PNG assets. There is no framework, package installation, backend, analytics or real checkout. Their music is synthesized in the browser and starts only on request. Neither is a faithful acoustic recording or a mechanical simulation. Nate's actual Scrollcraft skill was not installed or executed.

The brand, product, provenance and specifications are fictional. In particular, Version I's component counts, workshop location, edition size, dimensions, making times and performance duration are invented design copy, **not verified facts**. Its `.example` email link is a deliberate placeholder, not a working contact. Version II avoids most of these numerical claims.

Both original project directories are copied unchanged. The comparison desk is a separate wrapper. Raw transcripts, the reference video, browser profiles, local task records and unrelated workspace reports are excluded. No rights to third-party video material are asserted, and no video frames are embedded. No broad license is assigned without the owner's choice.

See [PUBLICATION.md](PUBLICATION.md) for the exported scope and verification record. GitHub stores the source; a private repository does not automatically provide a hosted website. No public deployment or GitHub Pages site is created by this upload.
