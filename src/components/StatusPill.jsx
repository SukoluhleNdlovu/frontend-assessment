function styleFor(status) {
  const base = {
    display: "flex",
    padding: "12px 10px",
    height: 8,
    width: 100,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
    fontWeight: 800,
    border: "1px solid #7e83ac",
    background: "#2563eb",
  };

  if (status === "in-progress") return { ...base, background: "#f59e0b", borderColor: "#cbe61e" };
  if (status === "closed") return { ...base, background: "#16a34a", borderColor: "#5ac14a8b" };
  return base;
}

export default function StatusPill({ status }) {
  return <span style={styleFor(status)}>{status}</span>;
}
