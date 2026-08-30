import {
  Users,
  Briefcase,
  Inbox,
  MessageCircle,
  Radio,
} from "lucide-react";

import {
  useCollection,
} from "../../lib/useRealtime.js";

function StatCard({
  icon: Icon,
  label,
  value,
  accent,
}) {
  return (
    <div className="admin-stat-card">
      <div
        className={`admin-stat-icon ${
          accent || ""
        }`}
      >
        <Icon size={20} />
      </div>

      <div>
        <strong>{value}</strong>
        <span>{label}</span>
      </div>
    </div>
  );
}

function timeAgo(timestamp) {
  const ts = Number(timestamp);

  if (!ts || Number.isNaN(ts)) {
    return "recently";
  }

  const diff = Math.max(
    0,
    Date.now() - ts
  );

  const mins = Math.floor(
    diff / 60000
  );

  if (mins < 1) {
    return "just now";
  }

  if (mins < 60) {
    return `${mins}m ago`;
  }

  const hours = Math.floor(
    mins / 60
  );

  if (hours < 24) {
    return `${hours}h ago`;
  }

  return `${Math.floor(
    hours / 24
  )}d ago`;
}

function Dashboard() {
  const jobs =
    useCollection("jobs");

  const applicants =
    useCollection("applicants");

  const inquiries =
    useCollection("inquiries");

  const chats =
    useCollection("chats");

  const stats =
    useCollection("stats");

  const openJobs =
    jobs.filter(
      (job) =>
        job.status === "Open"
    ).length;

  const feed = [
    ...applicants.map((item) => ({
      ts:
        Number(
          item.submittedAt
        ) || 0,
      text: `${
        item.name || "Someone"
      } applied for ${
        item.jobTitle ||
        "a position"
      }`,
      type: "Applicant",
    })),

    ...inquiries.map((item) => ({
      ts:
        Number(
          item.submittedAt
        ) || 0,
      text: `${
        item.name || "Someone"
      } sent a contact inquiry: "${
        item.subject ||
        item.message?.slice(
          0,
          40
        ) ||
        ""
      }"`,
      type: "Inquiry",
    })),
  ]
    .sort(
      (a, b) =>
        b.ts - a.ts
    )
    .slice(0, 8);

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>Dashboard</h1>

          <p>
            Live overview of your site.
            Data is loaded from MongoDB.
          </p>
        </div>

        <div className="admin-live-pill">
          <Radio size={14} />

          {stats.onlineVisitors ??
            1}{" "}
          online now
        </div>
      </div>

      <div className="admin-stats-grid">
        <StatCard
          icon={Briefcase}
          label="Open jobs"
          value={openJobs}
        />

        <StatCard
          icon={Users}
          label="Applicants"
          value={applicants.length}
          accent="gold"
        />

        <StatCard
          icon={Inbox}
          label="Inquiries"
          value={inquiries.length}
        />

        <StatCard
          icon={MessageCircle}
          label="Chat messages"
          value={chats.length}
          accent="gold"
        />
      </div>

      <div className="admin-panel">
        <h2>Recent activity</h2>

        {feed.length === 0 ? (
          <div className="empty-state">
            Nothing yet — activity will
            appear here when users submit
            applications or inquiries.
          </div>
        ) : (
          <ul className="admin-feed">
            {feed.map(
              (item, index) => (
                <li key={index}>
                  <span
                    className={`admin-feed-tag ${item.type.toLowerCase()}`}
                  >
                    {item.type}
                  </span>

                  <span className="admin-feed-text">
                    {item.text}
                  </span>

                  <span className="admin-feed-time">
                    {timeAgo(
                      item.ts
                    )}
                  </span>
                </li>
              )
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Dashboard;