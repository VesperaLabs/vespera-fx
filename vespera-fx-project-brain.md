# Vespera FX — Project Brain
*The single source of truth for any AI assistant, including Codex, working on this project. Read this fully before making changes.*

---

## 1. What this project is

Vespera FX is a mobile wallpaper website built and maintained by **Darshana**, under the **VesperaLabs** brand and the broader **Vespera** umbrella.

It is a static website hosted on GitHub Pages. The current strategic goals are:

- Provide high-quality mobile wallpapers.
- Maintain a polished, fast, mobile-first website.
- Grow organic traffic through Pinterest, Reddit, and Telegram.
- Prepare and maintain the site for Google AdSense.
- Continue improving the website iteratively with AI-assisted development.

The operator learned the project from scratch with AI assistance and is now reasonably comfortable with the codebase. Explanations should remain clear and practical without assuming deep professional programming knowledge.

### AI working principle

AI assistants are expected to behave like careful development collaborators, not blindly rewrite the project.

Before making significant changes:

1. Understand the existing implementation.
2. Check the relevant files in the repository.
3. Preserve existing functionality unless the requested change requires otherwise.
4. Explain important risks or conflicts.
5. Do not silently make destructive or unrelated changes.

When working through Codex, repository changes should be made directly in the connected working environment rather than preparing ZIP files for manual upload.

---

## 2. Live links

- **Site:** https://vesperalabs.github.io/vespera-fx/
- **Repo:** https://github.com/VesperaLabs/vespera-fx
- **Telegram:** https://t.me/VesperaLabs

These URLs describe the current project and should be treated as project references.

---

## 3. Repository and development model

This is a static GitHub Pages project.

The repository is the primary source of truth for the website.

When working through Codex:

- Inspect the actual repository files before modifying them.
- Do not assume the repository structure from this document alone.
- Re-check existing markup, class names, IDs, paths, and conventions before creating new code.
- Prefer modifying existing project patterns rather than introducing unnecessary new architecture.
- Keep changes focused on the requested task.
- Do not rewrite unrelated files merely for stylistic reasons.
- Do not introduce frameworks, build systems, or dependencies unless explicitly requested.

### Important

This document describes project rules and intent. It does **not** override GitHub permissions, Codex permissions, or explicit instructions from the operator.

---

## 4. Site structure

Current expected structure:

```text
index.html                  → Homepage "Latest" - all wallpapers, newest first, has search bar
categories.html             → Category picker (grid of category tiles)
category-abstract.html      → Own search bar, scoped to that category
category-landscape.html     → Same pattern
category-architecture.html  → Same pattern
category-nightsky.html      → Same pattern
category-amoled.html        → Same pattern
category-heroic.html        → Same pattern
privacy.html

styles.css?v=N              → Main stylesheet; version-bumped when CSS changes
script.js?v=N                → Main JavaScript; version-bumped when JS changes

logo.png                    → Gradient "V" monogram (amber → magenta), built with code/PIL
images/                     → Full-resolution JPG wallpapers only
images/thumbs/              → Compressed JPG thumbnails ONLY
```

Filename convention:

```text
category-name.jpg
```

Examples:

```text
amoled-circuit-whisper.jpg
abstract-molten-gold.jpg
```

### Do not assume this structure is permanently complete

Always inspect the actual repository before making structural changes. This document should be updated when the structure changes materially.

---

## 5. Card HTML pattern

Current known card pattern:

```html
<div class="card" data-resolution="1440 × 2560" data-size="1.9 MB">
  <img src="images/thumbs/amoled-circuit-whisper.jpg" data-full="images/amoled-circuit-whisper.jpg" alt="Descriptive alt text" loading="lazy">
  <div class="label">Wallpaper Name</div>
</div>
```

### Card rules

- Always verify the current live/repository markup before creating new cards.
- Do not blindly rely on this example if the actual implementation has evolved.
- New cards normally go at the top of `index.html`'s wallpaper grid because the homepage is newest-first.
- Add the card to the appropriate category page as well.
- Preserve existing classes, attributes, paths, and JavaScript expectations.
- Ensure the thumbnail path points to `images/thumbs/`.
- Ensure `data-full` points to the corresponding full-resolution image.
- Use descriptive, meaningful `alt` text.
- Keep `data-resolution` and `data-size` accurate.

---

## 6. Categories and wallpaper standards

Current categories:

- Abstract
- Landscape
- Architecture
- Night Sky
- AMOLED
- Heroic

An **Illustrated** category is planned but not yet built.

### Resolution

Target standard:

**1440 × 2560 pixels**

This is the site's standard 2K portrait resolution.

Do not accept lower-resolution batches without clearly flagging the issue to the operator.

### Orientation

Required orientation:

**Portrait / approximately 9:16**

Sanity-check the aspect ratio before publishing.

A width/height ratio of approximately **0.6 or lower** is expected.

### Copyright/IP

Do not knowingly introduce copyrighted characters or recognizable copyrighted IP into generated wallpaper content.

Examples include:

- Marvel characters
- DC characters
- Disney characters
- Other recognizable copyrighted franchises

Original designs are preferred.

The Heroic category specifically uses original-character concepts for this reason.

---

# 7. HARD RULES

These rules must be treated as project constraints.

## 7.1 Full-resolution wallpapers must not be compressed

**Never compress, re-encode, or "optimize" full-size wallpaper JPGs.**

Full downloadable images must remain the exact original bytes after they have been correctly delivered as genuine JPG files.

Do not:

- Re-save them at another JPEG quality.
- Run JPEG optimization on them.
- Resize them.
- Re-encode them merely to reduce file size.
- Convert them into another format for convenience.

If unsure whether an image is a full download or thumbnail, treat it as a full-resolution original.

### Exception: correcting a mislabeled PNG

If a file has a `.jpg` extension but is actually PNG data, converting it into a genuine JPG is allowed because this is a format correction rather than an optimization.

When this happens:

1. Verify the actual file format using its file signature/content.
2. Clearly tell the operator that a conversion was necessary.
3. Use the highest reasonable JPEG quality.
4. Pay particular attention to banding and artifacts in dark gradients, especially AMOLED and Night Sky images.

---

## 7.2 File size is not a target

Never artificially shrink an image to make its file size resemble another wallpaper.

Wallpaper file sizes naturally vary according to:

- detail
- texture
- gradients
- color complexity
- image content

A smaller file is not automatically better.

Do not engineer file size at the expense of image quality.

---

## 7.3 Thumbnails are the only images that should be resized/compressed

Thumbnails belong in:

```text
images/thumbs/
```

They exist purely for website previews.

It is acceptable and expected for thumbnails to be:

- resized
- compressed
- optimized

The full-resolution downloadable image must remain untouched.

---

## 7.4 Validate image batches before publishing

Every new wallpaper batch must be checked for:

- Actual file format
- Actual resolution
- Aspect ratio
- Portrait orientation
- Visual quality
- Appropriate content
- Copyright/IP concerns
- Whether the image is excessively dark or visually unreadable

Expected standard:

```text
1440 × 2560
Portrait
Genuine JPG
```

Do not silently publish images that fail these checks.

Flag problems clearly to the operator.

---

## 7.5 Do not silently fix important problems

If an image or website change has a meaningful problem, explain it before proceeding when practical.

Examples:

- Wrong resolution
- Wrong orientation
- Mislabeled image format
- Nearly invisible wallpaper
- Broken image path
- Unexpected HTML structure
- Potentially destructive change
- Unexpected change to existing functionality

Small mechanical fixes required to complete an explicitly requested task may be performed normally, but important changes should remain transparent.

---

## 7.6 Do not delete or replace assets casually

Do not delete:

- Wallpapers
- HTML pages
- CSS
- JavaScript
- Images
- Existing functionality

unless:

1. The operator explicitly requests it, or
2. The deletion is clearly necessary for the requested task and the operator has been informed.

When uncertain, ask before deleting.

---

# 8. Wallpaper workflow

The preferred workflow when adding new wallpapers is:

### Step 1 — Generation

The operator generates images using Adobe Firefly or another approved image-generation tool.

Orientation and resolution must be explicitly verified in the generation tool.

Do not assume that a prompt saying "2K portrait" means the tool actually used those settings.

---

### Step 2 — Receive and inspect the images

Verify:

- Actual file type
- File signature
- Resolution
- Aspect ratio
- Visual quality
- Content suitability

---

### Step 3 — Preserve the original

The full-resolution image must remain untouched once confirmed as a genuine JPG.

Do not compress or re-encode it.

---

### Step 4 — Generate thumbnail

Create a smaller compressed JPG thumbnail for:

```text
images/thumbs/
```

The thumbnail is the only version that should be resized/compressed.

---

### Step 5 — Create/update card HTML

Inspect the current repository implementation first.

Use the actual current card markup rather than guessing class names, attributes, or JavaScript hooks.

Add:

- Thumbnail path
- Full-image path
- Wallpaper name
- Resolution
- File size
- Descriptive alt text

---

### Step 6 — Update relevant pages

Normally update:

- `index.html`
- Appropriate category page

If category totals are displayed on `categories.html`, update the relevant count.

---

### Step 7 — Validate the implementation

Check:

- Correct image paths
- Correct thumbnail paths
- Correct full-image paths
- Correct HTML nesting
- Correct category placement
- Correct resolution/file-size metadata
- Mobile behavior
- Existing JavaScript functionality

---

### Step 8 — Git/repository workflow

When using Codex, do **not** create a ZIP merely because the old workflow required one.

The repository is the working source of truth.

Codex may modify the appropriate files directly within the authorized working environment.

Before committing/publishing significant changes:

- Review what changed.
- Confirm no unrelated files were modified.
- Explain meaningful changes to the operator.
- Do not publish questionable or destructive changes silently.

A ZIP is only appropriate if the operator specifically requests one.

---

# 9. Version-bumping rules

The site uses cache-busting query parameters such as:

```text
styles.css?v=N
script.js?v=N
```

### CSS changes

If `styles.css` changes:

- Update the `?v=` reference in **all HTML files that reference it**.

### JavaScript changes

If `script.js` changes:

- Update the `?v=` reference in **all HTML files that reference it**.

### Important

Do not bump a version number unnecessarily when the underlying file did not change.

Do not assume every HTML file uses the same version unless verified.

---

# 10. Generation tool notes — Adobe Firefly

Current known constraints:

- Free/trial tier has had a limited daily generation quota.
- Orientation and resolution can be separate UI controls.
- A previous mistake occurred where portrait orientation was selected but resolution remained at 1K.
- This produced wallpapers at 720 × 1280 instead of the site's required 1440 × 2560.

### Required procedure

Before generating a full batch:

1. Explicitly verify portrait/9:16.
2. Explicitly verify 2K/1440 × 2560 or the appropriate equivalent.
3. Generate one test image when practical.
4. Confirm its actual dimensions.
5. Only then generate the remainder of the batch.

Do not rely solely on prompt wording.

### IP-adjacent themes

For superhero-style or similar concepts, use generic descriptions such as:

- hero
- guardian
- warrior
- emblem
- original character

Do not request copyrighted character names.

### Text inside generated images

AI-generated text and wordmarks can be unreliable.

For logos, brand marks, and important text elements:

**Prefer building them with code/design tools rather than relying on image-generation text rendering.**

---

# 11. Current known backlog

These items are not urgent unless the operator specifically asks for them.

### Night Sky regeneration

A previous five-image batch was generated at the wrong resolution:

```text
720 × 1280
```

instead of:

```text
1440 × 2560
```

The batch was discarded.

One image, **"Drifting Dust"**, was also nearly invisible because of its sparse/dark Milky Way composition.

Redo the batch using the verified two-setting Firefly procedure.

---

### Old unused PNG files

There are approximately **37 old unused `.png` files** in `images/`.

They were superseded by JPGs.

They are believed to be safe to delete, but deletion is not urgent.

Do not delete them without checking that they are genuinely unused.

---

### Illustrated category

There are two source images in hand for a potential Illustrated category.

They were deliberately excluded from Heroic because of aesthetic differences.

The category has not yet been built.

---

### Custom domain

Potential domain:

```text
vesperafx.com
```

Deferred until traffic is established.

---

### AdSense

Content depth is considered sufficient for an AdSense application.

Current strategic blocker:

**Traffic.**

---

### YouTube / Vespera video brand

Potential future sub-brand:

- Vespera Effects
- Vespera Videos

Not currently started.

---

## 11.1 Current handover snapshot — 2026-09-28

This snapshot records the workspace state for the next AI assistant. The repository files are authoritative; re-check them before continuing.

### Work currently in progress

The working tree contains uncommitted edits to:

- `README.md`
- `categories.html`
- `category-abstract.html`
- `category-amoled.html`
- `category-architecture.html`
- `category-heroic.html`
- `category-landscape.html`
- `category-nightsky.html`
- `index.html`
- `privacy.html`
- `styles.css`

The observed edits form a shared layout/accessibility cleanup:

- The brand logo is now a home link on all pages.
- Inline footer styles were moved into the shared `.site-footer` class.
- The privacy page's inline styles were moved into shared CSS classes, including a mobile padding rule.
- `styles.css` references were bumped from `?v=8` to `?v=9` in the HTML pages.
- `README.md` was expanded with project structure, local preview, wallpaper workflow, cache-busting, and publishing notes.

These edits were present in the workspace when this snapshot was written. Treat them as operator work: inspect and preserve them; do not discard or overwrite them. The Project Brain itself is currently untracked in Git, so include it deliberately if preparing a commit.

### First checks for the next assistant

1. Review `git status` and the full diffs before editing or committing. Do not assume the visible edits are complete or validated.
2. Inspect the actual site in a browser at mobile, tablet, and desktop widths if visual review is requested or needed to finish the layout work.
3. Check the cache-busting references: the changed pages currently use `styles.css?v=9`, while gallery pages still reference `script.js?v=7`. Only bump the JavaScript version if `script.js` itself changes.
4. Confirm the shared `.site-footer` and `.privacy-content` styles preserve spacing and readability across all pages, especially the privacy page on narrow screens.
5. Do not publish, commit, or push unless the operator asks. No validation or deployment result is recorded in this handover.

### Workspace notes

- Recent committed history ends with `f843a7e Polish responsive tablet and mobile layout`; earlier commits include lightbox accessibility/keyboard support and SEO/search-discovery files.
- Untracked items also include `desktop.ini` and `photo_2026-07-26_11-38-40.ico`. Their purpose is unknown; leave them untouched unless the operator clarifies.
- The repository is a static GitHub Pages site with no build step. See `README.md` for a quick orientation and this Project Brain for hard image-handling rules.

### Suggested opening prompt for the next agent

“Read `vespera-fx-project-brain.md` and `README.md`, inspect the current Git status and diffs, then continue the in-progress responsive/layout cleanup. Preserve all existing workspace edits, report any issues you find, and do not commit or publish without my instruction.”

---

### Meta-description audit

Not yet completed.

Check whether appropriate:

```html
<meta name="description">
```

tags exist on all relevant pages.

---

# 12. Current strategic focus — traffic growth

The current strategic priority is organic traffic.

## 12.1 Pinterest

Highest priority.

Current plan:

- Business account
- Post wallpapers individually
- Link pins to the appropriate category page
- Use keyword-rich descriptions
- Target approximately 2–3 pins/day

---

## 12.2 Reddit

Target communities include:

- r/Amoledbackgrounds
- r/Wallpapers
- r/MinimalWallpaper

Avoid spam-like behavior.

Space posts appropriately.

Where community rules require it, use links through profile/comments rather than putting promotional links directly into posts.

Always follow the current rules of each subreddit.

---

## 12.3 Telegram

Telegram:

https://t.me/VesperaLabs

Use it for cross-promotion from Pinterest and Reddit.

Target approximately 2–3 posts/week as a baseline.

---

## 12.4 On-site SEO

Immediate quick win:

**Complete the meta-description audit.**

Other SEO improvements should be evaluated without damaging the site's existing visual design or performance.

---

# 13. Lessons learned — do not repeat these mistakes

### GitHub uploads

When working manually with GitHub:

- Create the target subfolder once.
- Navigate into it for future uploads.

When working through Codex, prefer the repository workflow instead of manual web uploads.

---

### HTML viewport

Every HTML page must contain the appropriate viewport meta tag.

Example:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

Verify the existing implementation before changing it.

---

### Mobile CSS

Mobile-specific CSS/media queries should remain organized at the end of `styles.css` unless the existing architecture provides a better established pattern.

Do not arbitrarily move CSS around without reason.

---

### Cache busting

Whenever `styles.css` or `script.js` changes, update the relevant `?v=` references across all HTML pages that use the changed file.

---

### AI-generated text

Do not depend on image generators for important logos or wordmarks.

Build important text elements with code/design tools.

---

### JPG vs PNG

The website's full downloadable wallpaper standard is genuine JPG.

Do not assume a `.jpg` filename means the file is actually JPEG data.

Verify the actual file format when needed.

---

### HTML nesting

When adding tiles, cards, sections, or other elements, verify that they are inside the correct parent `<section>` or container.

---

### Full-image compression

Never compress a full-resolution wallpaper merely because its file size looks large.

File size is not a quality target.

---

### Card markup

Always inspect the current repository implementation before creating new cards.

Never blindly guess:

- class names
- attributes
- paths
- JavaScript hooks
- DOM structure

---

### Image visibility

If an image is so dark/minimal that its subject is barely visible, flag it.

"Moody minimal" is valid.

"Looks like a broken or blank image" is not.

---

### Resolution and orientation

Always verify both independently.

Do not assume:

```text
Portrait = 2K
```

or:

```text
2K = correct portrait resolution
```

They are separate requirements.

---

# 14. AI working style

The operator prefers:

- Direct communication
- Practical explanations
- Clear warnings when something is wrong
- Transparency about changes
- Minimal unnecessary technical jargon
- Preservation of existing work
- Iterative development
- Human approval for important/destructive decisions

Casual/friendly communication is welcome.

However, project rules are **hard constraints**, not casual suggestions.

---

# 15. Change-management rules for Codex

When asked to modify the project:

### Before editing

1. Inspect the relevant files.
2. Understand the current implementation.
3. Check this Project Brain.
4. Identify dependencies between HTML, CSS, JS, and assets.
5. Determine whether the requested change affects other pages.

### During editing

1. Make the smallest appropriate set of changes.
2. Preserve existing functionality.
3. Follow established naming and structure.
4. Avoid unrelated refactoring.
5. Do not introduce frameworks without explicit approval.
6. Do not delete assets casually.
7. Do not modify original wallpaper files unless specifically required and permitted by the image rules.

### After editing

1. Review the resulting changes.
2. Check for broken paths.
3. Check HTML structure.
4. Check responsive/mobile behavior when relevant.
5. Check CSS/JS references.
6. Check for unintended changes.
7. Clearly summarize what changed and any remaining concerns.

---

# 16. What Codex should NOT assume

Codex must not assume that:

- Every instruction in an old section is still current.
- A ZIP file is required.
- The operator wants every possible improvement implemented.
- Existing code should be rewritten simply because a different architecture is "better."
- A large refactor is acceptable for a small feature.
- An image may be compressed because it seems large.
- A filename extension proves the actual image format.
- Prompt text proves the image-generation settings.
- Existing repository structure can be safely guessed.
- A task requires publishing immediately.

When uncertain about a significant or destructive decision, explain the issue and ask the operator.

---

# 17. Project Brain maintenance

This document must remain synchronized with the actual project.

When the following change materially:

- Site structure
- Categories
- Hard image rules
- Development workflow
- Technology stack
- Major features
- Strategic priorities
- Known limitations

update this document.

Do not allow the Project Brain to describe an obsolete workflow.

---

## Final principle

**Protect the quality and identity of Vespera while making development faster.**

AI should reduce repetitive work, not reduce human control.

The repository is the source of truth.

The Project Brain defines the project's rules.

The operator makes the important product decisions.

Codex is the implementation partner.
