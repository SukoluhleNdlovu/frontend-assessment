export const ISSUES_URL =
  "https://raw.githubusercontent.com/dubeboy/issues-json/refs/heads/main/issues.json";

export async function fetchIssuesText(signal) {
  const res = await fetch(ISSUES_URL, { signal });
  if (!res.ok) throw new Error(`Fetch failed with status ${res.status}`);
  return res.text(); // parse in worker
}
