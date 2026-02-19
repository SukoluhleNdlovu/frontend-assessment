function styleFor(status) {
  const base = {
    display: "inline-block",
    padding: "4px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 800,
    border: "1px solid #ddd",
    background: "#8da5de",
  };

  if (status === "in-progress") return { ...base, background: "#fff6e5", borderColor: "#ffe1a8" };
  if (status === "closed") return { ...base, background: "#eaffea", borderColor: "#b8f2b8" };
  return base;
}

export default function StatusPill({ status }) {
  return <span style={styleFor(status)}>{status}</span>;
}
