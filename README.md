# mikedzikowski.com

Personal site for Mike Dzikowski — cloud security engineer.

The site presents a résumé in the shape of a GitHub repository: career history is a
commit log, skills are the language bar, sections are the file tree.

## Stack

Static HTML, CSS and ~80 lines of JavaScript. No framework, no build step, no
dependencies. The page is complete before JavaScript runs.

| File | Purpose |
| --- | --- |
| `index.html` | All content |
| `styles.css` | Design tokens, dark and light themes |
| `app.js` | Theme toggle, scroll-spy, live repo count |
| `CNAME` | Custom domain for GitHub Pages |

## Local preview

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Deployment

Pushing to `main` triggers `.github/workflows/pages.yml`, which publishes to GitHub Pages.

## Content policy

Every claim on this site is verifiable — from GitHub, LinkedIn, or public
certification records. No invented metrics.
