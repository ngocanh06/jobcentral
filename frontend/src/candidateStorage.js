const STORAGE_KEY = "jobcentral.managedCandidates";

export function getManagedCandidates() {
  if (typeof window === "undefined") return [];

  try {
    const candidates = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(candidates) ? candidates : [];
  } catch {
    return [];
  }
}

export function addManagedCandidate(candidate) {
  if (typeof window === "undefined") return false;

  const candidates = getManagedCandidates();
  if (candidates.some((item) => item.id === candidate.id)) return false;

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...candidates, candidate]));
  return true;
}