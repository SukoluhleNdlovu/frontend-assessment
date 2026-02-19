import StatusPill from "./StatusPill";

function formatDate(value) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString();
}

export default function IssuesTable({ issues }) {
  return (
    <div style={{ overflowX: "auto", border: "1px solid #eee", borderRadius: 14 }}>
      <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 900 }}>
        <thead>
          <tr style={{ background: "#fafafa" }}>
            {["ID", "Title", "Status", "Priority", "Assignee", "Created", "Updated", "Closed"].map(
              (h) => (
                <th
                  key={h}
                  scope="col"
                  style={{ textAlign: "left", padding: 12, borderBottom: "1px solid #eee" }}
                >
                  {h}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {issues.map((i) => (
            <tr key={i.id}>
              <td style={{ padding: 12, borderBottom: "1px solid #f0f0f0" }}>{i.id}</td>
              <td style={{ padding: 12, borderBottom: "1px solid #f0f0f0" }}>
                <div style={{ fontWeight: 800 }}>{i.title}</div>
                <div style={{ opacity: 0.75, marginTop: 4, fontSize: 13 }}>{i.description}</div>
              </td>
              <td style={{ padding: 12, borderBottom: "1px solid #f0f0f0" }}>
                <StatusPill status={i.status} />
              </td>
              <td style={{ padding: 12, borderBottom: "1px solid #f0f0f0" }}>{i.priority}</td>
              <td style={{ padding: 12, borderBottom: "1px solid #f0f0f0" }}>{i.assignee}</td>
              <td style={{ padding: 12, borderBottom: "1px solid #f0f0f0" }}>{formatDate(i.createdAt)}</td>
              <td style={{ padding: 12, borderBottom: "1px solid #f0f0f0" }}>{formatDate(i.updatedAt)}</td>
              <td style={{ padding: 12, borderBottom: "1px solid #f0f0f0" }}>{formatDate(i.closedAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
