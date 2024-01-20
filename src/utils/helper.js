export function formatDate(date) {
  const options = { day: "numeric", month: "short", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

export function isMobile() {
  return window.innerWidth < 768;
}