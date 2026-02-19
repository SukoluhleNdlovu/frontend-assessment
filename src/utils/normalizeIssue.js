export function normalizeIssue(raw, index = 0) {
  const id = typeof raw?.id === "number" ? raw.id : index + 1;

  const title =
    typeof raw?.title === "string" && raw.title.trim()
      ? raw.title.trim()
      : "Untitled issue";

  const description =
    typeof raw?.description === "string" && raw.description.trim()
      ? raw.description.trim()
      : "No description";

  const status =
    raw?.status === "open" || raw?.status === "in-progress" || raw?.status === "closed"
      ? raw.status
      : "open";

  const priority =
    typeof raw?.priority === "string" && raw.priority.trim() ? raw.priority.trim() : "—";

  const assignee =
    typeof raw?.assignee === "string" && raw.assignee.trim() ? raw.assignee.trim() : "Unassigned";

  const createdAt = typeof raw?.createdAt === "string" ? raw.createdAt : null;
  const updatedAt = typeof raw?.updatedAt === "string" ? raw.updatedAt : null;
  const closedAt = typeof raw?.closedAt === "string" ? raw.closedAt : null;

  return { id, title, description, status, priority, assignee, createdAt, updatedAt, closedAt };
}
