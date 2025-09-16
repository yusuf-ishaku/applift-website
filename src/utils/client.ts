export function extractNameInitials(name: string) {
  return name
    .split(" ")
    .map((txt) => txt[0])
    .join("");
}

export function makeSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "") // drop quotes
    .replace(/[^a-z0-9]+/g, "-") // non-alphanumerics -> -
    .replace(/^-+|-+$/g, "");
}
