import { vi } from "vitest";
import "@testing-library/jest-dom";

// Mock Web Worker for Vitest/JSDOM
class MockWorker {
  constructor() {
    this.onmessage = null;
  }

  postMessage(data) {
    // Simulate what the real worker does: parse + return normalized array
    // In our tests we send JSON string, so we can just parse it here.
    try {
      const parsed = JSON.parse(data);
      const arr = Array.isArray(parsed) ? parsed : [];
      // Worker returns: { ok: true, data: normalizedIssues }
      // For tests, returning parsed is enough because UI checks title/status text.
      this.onmessage?.({ data: { ok: true, data: arr } });
    } catch (e) {
      this.onmessage?.({ data: { ok: false, error: e.message } });
    }
  }

  terminate() {}
}

vi.stubGlobal("Worker", MockWorker);
