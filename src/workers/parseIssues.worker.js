/* eslint-disable no-restricted-globals */
import { normalizeIssue } from "../utils/normalizeIssue";

self.onmessage = (e) => {
  try {
    const text = e.data;
    const parsed = JSON.parse(text);
    const arr = Array.isArray(parsed) ? parsed : [];
    const normalized = arr.map((item, idx) => normalizeIssue(item, idx));
    self.postMessage({ ok: true, data: normalized });
  } catch (err) {
    self.postMessage({ ok: false, error: err?.message ?? "Failed to parse JSON" });
  }
};
