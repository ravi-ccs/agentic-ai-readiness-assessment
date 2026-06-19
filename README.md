# Agentic Business Readiness Assessment Landing Page

Static landing page for Ravi Shankar / Champlain Consulting Services.

## Files

- `index.html` — landing page markup
- `styles.css` — responsive visual design
- `landing-page-strategy.md` — strategy, offer, CTA, proof, and section plan

## Local preview

Open `index.html` directly in a browser, or run a simple local server:

```bash
python3 -m http.server 8080
```

Then visit:

```text
http://localhost:8080
```

## CTA placeholder

Current CTA uses:

```text
mailto:ravi.bsa@gmail.com?subject=AI%20Opportunity%20Discovery%20Call
```

Replace it with a Calendly, Microsoft Bookings, HubSpot, or other scheduling link when available.

## Manual GitHub deployment

```bash
git init
git add .
git commit -m "Add agentic AI readiness assessment landing page"
git branch -M main
git remote add origin <repo-url>
git push -u origin main
```

## Manual Vercel deployment

1. Go to https://vercel.com/new
2. Import the GitHub repository.
3. Framework preset: Other.
4. Build command: leave blank.
5. Output directory: leave blank / root.
6. Deploy.

## Version 2 improvements

- Replace email CTA with a booking link.
- Add a real headshot or brand image.
- Add 1-3 short case studies from existing proof points.
- Add a downloadable Agentic Business Readiness Scorecard PDF.
- Add analytics and conversion tracking.
