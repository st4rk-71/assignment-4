# Technical Documentation – Assignment 3

## Overview
This project is a personal portfolio website built with **HTML, CSS, and JavaScript**.  
In Assignment 3, I added advanced functionality such as API integration, sorting, improved state handling, and better user interaction.

---

## Main Files

### `index.html`
- Contains the layout of the portfolio (About, Projects, Contact).
- Added a new **GitHub API Section** to display live repositories.
- Added a **Sort dropdown** for sorting projects.
- Existing filter buttons continue from Assignment 2.

### `css/styles.css`
- Styles for all sections.
- Responsive layout using Flexbox & Grid.
- Animation (fade-in) for project cards.
- Added new styles for:
  - Sort dropdown
  - GitHub repo cards
  - Status messages (loading, errors)
  - Dark theme support

### `js/script.js`
Includes all interactive features:
- Dynamic greeting (based on time of day)
- Dark/light theme toggle with `localStorage`
- Project filter + saved state
- **Project sorting (new)**
- **GitHub API fetch (new)**
  - Fetches latest repos
  - Displays name, stars, language, date, etc.
  - Handles errors (invalid username, network issue)
  - Includes loading & retry message
- Stores:
  - Selected theme
  - Filter selection
  - Sort selection
  - GitHub username

---

## Data Handling
- Uses **localStorage** to save:
  - Theme mode
  - Selected filter
  - Selected sort option
  - GitHub username
- Fetches live data using the GitHub REST API.

---

## Error Handling
- Shows “Loading…” while fetching GitHub repositories.
- Displays friendly messages for:
  - Invalid username
  - API failure
  - No repositories found
- Retry button re-runs the API request.

---

## Performance
- Images compressed.
- DOM optimized: elements appended using fragments.
- Minimal animations for smooth performance.

---

## Conclusion
Assignment 3 adds:
- API integration
- Sorting feature
- Better state saving
- Error + loading messages
- Improved interactivity

These upgrades make the portfolio more dynamic and functional while keeping the code simple and understandable.
