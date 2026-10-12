# GrandStay — Hotel Management System

A beginner-friendly hotel website project using HTML, CSS, JavaScript and Bootstrap.

## Features
- Responsive hotel homepage and room cards
- Room selection and date search
- Demo booking form with date validation
- Booking confirmation modal
- Dashboard with booking count, upcoming stays and estimated room revenue
- Demo bookings saved in browser localStorage

## Run locally
Open `index.html` in a web browser. Internet is required for Bootstrap, Google Fonts, and remote hotel photos.

## Publish using GitHub Pages
1. Sign in at https://github.com
2. Click **+** → **New repository**.
3. Repository name: `hotel-management-system`
4. Choose **Public**, then click **Create repository**.
5. Click **Add file** → **Upload files**.
6. Upload `index.html`, `style.css`, `script.js`, and `README.md` from this folder (or upload the ZIP contents, not the ZIP itself).
7. Click **Commit changes**.
8. Open **Settings** → **Pages**.
9. Under **Build and deployment**, select **Deploy from a branch**.
10. Choose branch **main**, folder **/(root)**, then click **Save**.
11. Wait a few minutes and refresh the Pages settings. Click the published site link. It will usually look like `https://YOUR-USERNAME.github.io/hotel-management-system/`.

## Important limitation
GitHub Pages hosts static HTML/CSS/JavaScript; it does not run PHP or provide a database. This is an academic demo: bookings are saved in localStorage on the visitor's browser and are not shared with a real hotel admin or other visitors. Do not use this demo for real guest details or payments. For a production system, add a secure backend and database hosted separately.
