/* ============================================================
   MOBILE NAV TOGGLE
   ============================================================ */
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", isOpen);
});

// Close the mobile menu after tapping a link
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

/* ============================================================
   ACTIVE SECTION HIGHLIGHT IN NAV
   ============================================================ */
const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-links a");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navItems.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);

sections.forEach((section) => observer.observe(section));

/* ============================================================
   PROJECTS
   ----------------------------------------------------------
   Add your projects here as you finish them. Each category is
   an array of project objects. Leave an array empty and that
   section will keep showing its "coming soon" message.

   Project object shape:
   {
     title: "Project name",
     description: "One or two sentences about what it does.",
     tags: ["HTML", "CSS", "JavaScript"],
     link: "https://github.com/you/project"   // or a live demo URL
   }
   ============================================================ */
const projects = {
  frontend: [
    // { title: "...", description: "...", tags: ["..."], link: "..." },
  ],
  backend: [],
  security: [],
  "ml-ai": [],
  school: [],
};

/* ============================================================
   RENDER PROJECTS
   For each category: if there are projects, build cards and
   hide the empty-state message. If empty, leave the message as-is.
   ============================================================ */
function renderProjects() {
  Object.entries(projects).forEach(([category, items]) => {
    const grid = document.querySelector(`.project-grid[data-category="${category}"]`);
    const emptyState = document.querySelector(`.empty-state[data-category="${category}"]`);

    if (!grid || !items.length) return;

    items.forEach((project) => {
      const card = document.createElement("article");
      card.className = "project-card";

      const tagsHTML = (project.tags || [])
        .map((tag) => `<span>${tag}</span>`)
        .join("");

      card.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        ${tagsHTML ? `<div class="project-tags">${tagsHTML}</div>` : ""}
        ${project.link ? `<a href="${project.link}" target="_blank" rel="noopener">View project →</a>` : ""}
      `;

      grid.appendChild(card);
    });

    if (emptyState) emptyState.style.display = "none";
  });
}

renderProjects();

/* ============================================================
   FOOTER YEAR
   ============================================================ */
document.getElementById("year").textContent = new Date().getFullYear();
