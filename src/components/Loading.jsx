export default function Loading() {
  return (
    <div style={{ padding: 16 }} aria-live="polite">
      <p style={{ margin: 0, fontWeight: 700 }}>Loading issues…</p>
      <p style={{ margin: "8px 0 0", opacity: 0.75 }}>Fetching and processing data.</p>
    </div>
  );
}
