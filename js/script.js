// ==========================
// Greeting by Time of Day
// ==========================
const greeting = document.getElementById("greeting");
const now = new Date();
const hour = now.getHours();

if (hour < 12) {
  greeting.textContent = "Good Morning!";
} else if (hour < 18) {
  greeting.textContent = "Good Afternoon!";
} else {
  greeting.textContent = "Good Evening!";
}

// ==========================
// Dark/Light Theme Toggle
// ==========================
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-theme");
  themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-theme");

  if (body.classList.contains("dark-theme")) {
    themeToggle.textContent = "☀️";
    localStorage.setItem("theme", "dark");
  } else {
    themeToggle.textContent = "🌙";
    localStorage.setItem("theme", "light");
  }
});

// ==========================
// Project Filter Feature
// ==========================
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

let savedFilter = localStorage.getItem("selectedFilter") || "all";
applyFilter(savedFilter);

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.getAttribute("data-filter");
    applyFilter(category);
    localStorage.setItem("selectedFilter", category);
  });
});

function applyFilter(category) {
  projectCards.forEach((card) => {
    const cardCategory = card.getAttribute("data-category");
    card.style.display =
      category === "all" || category === cardCategory ? "block" : "none";
    card.classList.add("fade");
  });
}

// ==========================
// Project Sort (A–Z / Z–A)
// ==========================
const sortSelect = document.getElementById("sort-projects");
const projectsGrid = document.querySelector(".projects-grid");

if (sortSelect && projectsGrid) {
  const savedSort = localStorage.getItem("projectSort") || "az";
  sortSelect.value = savedSort;
  applySort(savedSort);

  sortSelect.addEventListener("change", () => {
    const mode = sortSelect.value;
    localStorage.setItem("projectSort", mode);
    applySort(mode);
  });
}

function applySort(mode) {
  const cards = Array.from(projectsGrid.querySelectorAll(".project-card"));

  cards.sort((a, b) => {
    const ta = a.querySelector("h3")?.textContent?.trim().toLowerCase() || "";
    const tb = b.querySelector("h3")?.textContent?.trim().toLowerCase() || "";
    return mode === "az" ? ta.localeCompare(tb) : tb.localeCompare(ta);
  });

  cards.forEach((card) => projectsGrid.appendChild(card));
}

// ==========================
// GitHub API – Auto Fetch
// ==========================
const GITHUB_USERNAME = "st4rk-71"; // ← YOUR username
const ghStatus = document.getElementById("github-status");
const ghList = document.getElementById("repo-list");
const ghRetry = document.getElementById("retry-fetch");

async function loadRepos() {
  ghStatus.textContent = "Loading repositories...";
  ghRetry.hidden = true;
  ghList.innerHTML = "";

  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`
    );

    if (!response.ok) {
      throw new Error("GitHub API error");
    }

    const repos = await response.json();

    if (repos.length === 0) {
      ghStatus.textContent = "No public repositories found.";
      return;
    }

    repos.forEach((repo) => {
      const li = document.createElement("li");
      li.className = "repo-item fade";
      li.innerHTML = `
        <a href="${repo.html_url}" target="_blank">${repo.name}</a>
        <div class="repo-meta">⭐ ${repo.stargazers_count}</div>
        <div class="repo-meta">Updated: ${new Date(
          repo.updated_at
        ).toLocaleDateString()}</div>
        <p>${repo.description || "No description"}</p>
      `;
      ghList.appendChild(li);
    });

    ghStatus.textContent = "";
  } catch (err) {
    ghStatus.textContent = "Failed to load repositories.";
    ghRetry.hidden = false;
  }
}

// Retry
ghRetry.addEventListener("click", loadRepos);

// Auto load on page open
loadRepos();
