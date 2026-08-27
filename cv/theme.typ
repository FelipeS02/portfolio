// Font pairing and colour scheme shared with the portfolio site.
//
// FONTS
//
// Archivo carries body copy, PP Neue Montreal carries the name, section
// headings, job/project titles and the italic meta lines.
//
// The split is not cosmetic. Archivo ships here as a variable font with a real
// 100-900 range but no italic face, so italics fall back to upright. PP Neue
// Montreal has true italics but no 300 or upright 600 face, so "light"
// collapses into Book and "semibold" into Bold. Each font is used where its
// gap does not show: body text needs the weight range, meta lines need the
// italics.
//
// COLOURS
//
// Sourced from lib/theme.ts's `initialPalette` — the site's neutral gray
// scale, not the runtime-randomized --palette-* hue. The CV is a static,
// printable document: it must render the same regardless of which random
// accent colour a visitor happens to be looking at, so it pins to that
// neutral baseline instead of the live CSS variable pipeline.
//
// The variant is selected at compile time with `--input theme=dark`; anything
// else (including no input at all) means light.
//
// HELPER OVERRIDES
//
// silver-dev-cv exposes a single `font-type`, which becomes the document
// default (Archivo), and bakes its four near-black colours into the closures
// it exports. Re-binding those colours here does NOT reach inside the
// package's own functions, so every helper the CVs actually call is
// re-declared below: byte-for-byte the upstream 1.0.2 definitions except for
// the added `font:` and `fill:` arguments.
//
// That includes cv() and display(), which render the name, address, contacts
// and footer. A document-wide `show text: set text(fill: ...)` would recolour
// those in one line, but it also consumes the text elements — which silently
// kills the `#show "Last updated:"` string rule cv-es.typ needs for its footer.
// Copying the two functions is the boring option, and the one that works.

#import "@preview/silver-dev-cv:1.0.2": *

#let body-font = "Archivo"
#let display-font = "PP Neue Montreal"

#let is-dark = sys.inputs.at("theme", default: "light") == "dark"

#let fg = if is-dark { rgb("#f5f5f5") } else { rgb("#171717") } // palette-100 / palette-900
#let bg = if is-dark { rgb("#222222") } else { rgb("#ffffff") } // --background dark 0 0% 7% / light 0 0% 100%
#let rule = if is-dark { rgb("#525252") } else { rgb("#d4d4d4") } // palette-600 / palette-300
#let gradient-accent = if is-dark { rgb("#111111") } else { rgb("#d4d4d4") } // palette-950 / palette-300

// Top-edge accent band, mirroring the site's
// `linear-gradient(to top, bg 0%, bg 95%, accent 100%)`. Typst measures 0% from
// the top at 90deg, so the CSS stops read in reverse here.
#let page-fill = gradient.linear(
  (gradient-accent, 0%),
  (bg, 5%),
  (bg, 100%),
  angle: 90deg,
)

#let section(title) = {
  text(12pt, font: display-font, fill: fg, weight: "bold")[
    #upper[#title]
    #v(-8pt)
    #line(length: 100%, stroke: 0.5pt + rule)
    #v(-5pt)
  ]
}

#let descript(content) = {
  text(11pt, font: body-font, fill: fg, weight: "regular")[#content ]
}

#let job(position: "", institution: "", location: "", date: "", description: "") = {
  text(11pt, font: display-font, fill: fg, weight: "semibold")[#position]
  h(1fr)
  text(11pt, font: display-font, style: "italic", fill: fg, weight: "regular")[#location \ ]
  text(11pt, font: display-font, style: "italic", fill: fg, weight: "medium")[#institution]
  h(1fr)
  text(11pt, font: display-font, style: "italic", fill: fg, weight: "regular")[#date]
  if description != [] or description != "" {
    text(11pt, font: body-font, fill: fg, weight: "regular")[#description]
  }
}

#let education(institution: "", major: "", date: "", location: "", description: "") = {
  text(11pt, font: display-font, fill: fg, weight: "bold")[#institution, #location]
  h(1fr)
  text(11pt, font: display-font, style: "italic", fill: fg, weight: "regular")[#date \ ]
  text(11pt, font: display-font, style: "italic", fill: fg, weight: "medium")[#major \ ]
  if description != [] or description != "" {
    text(11pt, font: body-font, fill: fg, weight: "regular")[#description]
  }
}

#let project(title: "", description: "", date: "") = {
  text(11pt, font: display-font, fill: fg, weight: "semibold")[#title ]
  if date != [] or date != "" {
    h(1fr)
    text(11pt, font: display-font, fill: fg, weight: "medium")[#date \ ]
  } else {
    [\ ]
  }
  if description != [] or description != "" {
    text(11pt, font: body-font, fill: fg, weight: "light")[#description ]
  }
}

#let oneline-title-item(title: "", content: "") = {
  text(11pt, font: display-font, fill: fg, weight: "bold")[#title: ]
  text(11pt, font: body-font, fill: fg, weight: "light")[#content \ ]
}

#let display(contacts) = {
  v(-5pt)
  set text(10pt, font: body-font, fill: fg, weight: "regular")
  contacts
    .map(contact => {
        if ("link" in contact) {
          link(contact.link)[#contact.text]
        } else {
          [#contact.text]
        }
      })
    .join(" | ")
}

#let cv(
  font-type: "Times New Roman",
  continue-header: "false",
  name: "",
  address: "",
  lastupdated: "true",
  pagecount: "true",
  date: none,
  contacts: (),
  mainbody,
) = {
  set text(font: font-type, weight: "regular")
  set cite(form: "full")
  set page(fill: page-fill)

  if date == none {
    let date = [#datetime.today().display()]
  }

  // last update
  let lastupdate(lastupdated, date) = {
    if lastupdated == "true" {
      set text(8pt, style: "italic", fill: fg, weight: "light")
      [Last updated: #date]
    }
  }

  set page(footer: [
    #lastupdate(lastupdated, date)
    #h(1fr)
    #text(9pt, font: display-font, style: "italic", fill: fg, weight: "light")[#name]
    #h(1fr)
  ])

  let header-block = {
    text(
      20pt,
      font: display-font,
      fill: fg,
      weight: "bold",
      top-edge: "baseline",
      bottom-edge: "baseline",
      baseline: 11pt,
    )[#align(center, [#name])]
    // address
    if address != none {
      v(2pt)
      text(
        11pt,
        fill: fg,
        weight: "regular",
        top-edge: "baseline",
        bottom-edge: "baseline",
        baseline: 2pt,
      )[#align(center, [#address])]
    }
    v(2pt)
    align(center)[#display(contacts)]
  }

  if continue-header == "true" {
    set page(
      margin: (left: 1.25cm, right: 1.25cm, top: 2.5cm, bottom: 1.5cm),
      header: header-block,
      header-ascent: 1em,
    )
    mainbody
  } else {
    set page(margin: (left: 1.25cm, right: 1.25cm, top: 1cm, bottom: 1cm))
    header-block
    mainbody
  }
}
