export default function ErrorState({ message, onRetry }) {
  return (
    <div style={{ padding: 16 }} role="alert">
      <p style={{ margin: 0, fontWeight: 800 }}>Could not load issues</p>
      <p style={{ margin: "8px 0 0", opacity: 0.8 }}>{message}</p>
      <button
        onClick={onRetry}
        style={{
          marginTop: 12,
          padding: "10px 12px",
          borderRadius: 12,
          border: "1px solid #ccc",
          cursor: "pointer",
          background: "white",
        }}
        aria-label="Retry loading issues"
      >
        Retry
      </button>
    </div>
  );
}
