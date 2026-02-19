import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import App from "../App";

// Mock the API module
vi.mock("../api/issuesApi", () => ({
  fetchIssuesText: vi.fn(),
}));

import { fetchIssuesText } from "../api/issuesApi";

const sampleIssues = [
  {
    id: 1,
    title: "Login button not responding",
    description: "Tapping login does nothing",
    status: "open",
    priority: "high",
    assignee: "alex",
    createdAt: "2025-01-12T09:45:00Z",
    updatedAt: null,
    closedAt: null,
  },
];

beforeEach(() => {
  vi.clearAllMocks();
});

describe("Frontend Assessment App", () => {
  it("shows loading state initially", async () => {
    // Make fetch never resolve immediately so loading appears
    fetchIssuesText.mockReturnValue(new Promise(() => {}));

    render(<App />);
    expect(screen.getByText(/Loading issues/i)).toBeInTheDocument();
  });

  it("renders issues after successful fetch", async () => {
    fetchIssuesText.mockResolvedValue(JSON.stringify(sampleIssues));

    render(<App />);

    // Wait for table content to appear
    await waitFor(() => {
      expect(screen.getByText(/Login button not responding/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/open/i)).toBeInTheDocument();
  });

  it("shows error state if fetch fails", async () => {
    fetchIssuesText.mockRejectedValue(new Error("Network error"));

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/Could not load issues/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/Network error/i)).toBeInTheDocument();
  });
});
