const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const header = document.querySelector("[data-header]");

navToggle?.addEventListener("click", () => {
  nav.classList.toggle("open");
});

document.querySelectorAll(".site-nav a").forEach((link) => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

window.addEventListener("scroll", () => {
  header.style.transform = window.scrollY > 12 ? "translateY(-4px)" : "translateY(0)";
});

const tabs = document.querySelector("[data-tabs]");
tabs?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-tab]");
  if (!button) return;

  const target = button.dataset.tab;
  tabs.querySelectorAll("[data-tab]").forEach((item) => {
    item.classList.toggle("active", item === button);
    item.setAttribute("aria-selected", item === button ? "true" : "false");
  });
  tabs.querySelectorAll("[data-panel]").forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.panel === target);
  });
});

let tripType = "Round trip";
const tripButtons = document.querySelectorAll("[data-trip]");
tripButtons.forEach((button) => {
  button.addEventListener("click", () => {
    tripType = button.dataset.trip;
    tripButtons.forEach((item) => item.classList.toggle("active", item === button));
  });
});

const form = document.querySelector("[data-booking-form]");
const today = new Date();
const nextWeek = new Date(today.setDate(today.getDate() + 7));
const dateInput = form?.querySelector('input[name="date"]');
if (dateInput) {
  dateInput.value = nextWeek.toISOString().slice(0, 10);
}

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const message = [
    "Hello ORPA Vision Travels, I need help with a trip request.",
    `Trip type: ${tripType}`,
    `From: ${data.get("from")}`,
    `To: ${data.get("to")}`,
    `Leaving: ${data.get("date")}`,
    `Passengers: ${data.get("passengers")}`,
    `Class: ${data.get("class")}`
  ].join("%0A");

  window.open(`https://wa.me/2347052771567?text=${message}`, "_blank", "noopener,noreferrer");
});

const checkboxes = document.querySelectorAll("[data-score]");
const scoreOutput = document.querySelector("[data-score-output]");
function updateScore() {
  const selected = [...checkboxes].filter((item) => item.checked).length;
  scoreOutput.textContent = `${selected} of ${checkboxes.length}`;
}
checkboxes.forEach((box) => box.addEventListener("change", updateScore));
updateScore();

const details = {
  1: "Tell ORPA Vision whether you need travel support, business support, or statutory compliance guidance.",
  2: "The team reviews your need and advises the right booking, documentation, filing, or certification path.",
  3: "You confirm passenger details, destination, company information, deadlines, or compliance documents.",
  4: "ORPA Vision completes the required support and keeps you updated until delivery."
};

const stepDetail = document.querySelector("[data-step-detail]");
document.querySelector("[data-steps]")?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-step]");
  if (!button) return;

  document.querySelectorAll("[data-step]").forEach((item) => item.classList.toggle("active", item === button));
  stepDetail.textContent = details[button.dataset.step];
});

const accordion = document.querySelector("[data-accordion]");
accordion?.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  const answer = button.nextElementSibling;
  const isOpen = answer.classList.contains("open");

  accordion.querySelectorAll("button").forEach((item) => item.classList.remove("active"));
  accordion.querySelectorAll("div").forEach((item) => item.classList.remove("open"));

  if (!isOpen) {
    button.classList.add("active");
    answer.classList.add("open");
  }
});

const revealItems = document.querySelectorAll(".section, .ticker, .contact");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach((item) => {
  item.style.opacity = "0";
  item.style.transform = "translateY(26px)";
  item.style.transition = "opacity 0.7s ease, transform 0.7s ease";
  observer.observe(item);
});

const style = document.createElement("style");
style.textContent = ".is-visible{opacity:1!important;transform:none!important}";
document.head.appendChild(style);
