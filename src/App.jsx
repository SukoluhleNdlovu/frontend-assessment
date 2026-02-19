import './App.css'
import { useEffect, useMemo, useRef, useState } from "react";
import { fetchIssuesText } from "./api/issuesApi";
import Loading from "./components/Loading";
import ErrorState from "./components/ErrorState";
import IssuesTable from "./components/IssuesTable";

export default function App() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const abortRef = useRef(null);
  const workerRef = useRef(null);

  const load = async () => {
    setLoading(true);
    setError("");

    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();

    if (workerRef.current) workerRef.current.terminate();
    workerRef.current = new Worker(new URL("./workers/parseIssues.worker.js", import.meta.url), {
      type: "module",
    });

    workerRef.current.onmessage = (e) => {
      const msg = e.data;
      if (!msg.ok) {
        setError(msg.error || "Failed to parse issues");
        setLoading(false);
        return;
      }
      setIssues(msg.data);
      setLoading(false);
    };

    try {
      const text = await fetchIssuesText(abortRef.current.signal);
      workerRef.current.postMessage(text); // parse + normalize off main thread
    } catch (err) {
      if (err?.name === "AbortError") return;
      setError(err?.message || "Failed to fetch issues");
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    return () => {
      if (abortRef.current) abortRef.current.abort();
      if (workerRef.current) workerRef.current.terminate();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return issues.filter((i) => {
      const matchesQuery =
        !q ||
        i.title.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q) ||
        i.assignee.toLowerCase().includes(q) ||
        String(i.id).includes(q);

      const matchesStatus = statusFilter === "all" ? true : i.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [issues, query, statusFilter]);

  return (
    <main style={{ maxWidth: 1100, margin: "0 auto", padding: 18 }}>
      <header style={{ marginBottom: 14 }}>
        <h1 style={{ margin: 0, fontSize: 24 }}>Issues Viewer</h1>
        <p style={{ margin: "6px 0 0", opacity: 0.75 }}>
          Fetches issues via HTTP and displays them in a responsive UI.
        </p>
      </header>

      <section
        style={{
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
          alignItems: "center",
          marginBottom: 14,
        }}
        aria-label="Filters"
      >
        <label style={{ display: "flex", flexDirection: "column", gap: 6, flex: "1 1 280px" }}>
          <span style={{ fontSize: 13, fontWeight: 700 }}>Search</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, description, assignee, id…"
            style={{
              padding: "10px 12px",
              borderRadius: 12,
              border: "1px solid #ddd",
            }}
          />
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 200 }}>
          <span style={{ fontSize: 13, fontWeight: 700 }}>Status</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: "10px 12px",
              borderRadius: 12,
              border: "1px solid #ddd",
            }}
          >
            <option value="all">All</option>
            <option value="open">Open</option>
            <option value="in-progress">In-progress</option>
            <option value="closed">Closed</option>
          </select>
        </label>

        <button
          onClick={load}
          style={{
            padding: "10px 12px",
            borderRadius: 12,
            border: "1px solid #ccc",
            cursor: "pointer",
            background: "white",
            height: 42,
            alignSelf: "end",
          }}
          aria-label="Reload issues"
        >
          Reload
        </button>
      </section>

      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorState message={error} onRetry={load} />
      ) : (
        <>
          <p style={{ margin: "0 0 10px", opacity: 0.75 }}>
            Showing <b>{filtered.length}</b> of <b>{issues.length}</b> issues
          </p>
          <IssuesTable issues={filtered} />
        </>
      )}
    </main>
  );
}
