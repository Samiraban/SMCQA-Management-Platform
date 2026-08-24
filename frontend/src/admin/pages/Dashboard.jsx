import { Users, Briefcase, Inbox, MessageCircle, Radio } from "lucide-react";
import { useCollection } from "../../lib/useRealtime.js";

function StatCard({ icon: Icon, label, value, accent }) {
  return (
    <div className="admin-stat-card">
      <div className={`admin-stat-icon ${accent || ""}`}>
        <Icon size={20} />
      </div>
      <div>
        <strong>{value}</strong>
        <span>{label}</span>
      </div>
    </div>
  );
}

function timeAgo(ts) {
  const diff = Math.max(0, Date.now() - ts);
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function Dashboard() {
  const jobs = useCollection("jobs");
  const applicants = useCollection("applicants");
  const inquiries = useCollection("inquiries");
  const chats = useCollection("chats");
  const stats = useCollection("stats");

  const feed = [
    ...applicants.map((a) => ({ ts: a.submittedAt, text: `${a.name || "Someone"} applied for ${a.jobTitle}`, type: "Applicant" })),
    ...inquiries.map((i) => ({ ts: i.submittedAt, text: `${i.name || "Someone"} sent a contact inquiry: "${i.subject || i.message?.slice(0, 40) || ""}"`, type: "Inquiry" })),
  ]
    .sort((a, b) => b.ts - a.ts)
    .slice(0, 8);

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Live overview of your site — updates automatically, no refresh needed.</p>
        </div>
        <div className="admin-live-pill">
          <Radio size={14} />
          {stats.onlineVisitors} online now
        </div>
      </div>

      <div className="admin-stats-grid">
        <StatCard icon={Briefcase} label="Open jobs" value={jobs.filter((j) => j.status === "Open").length} />
        <StatCard icon={Users} label="Applicants" value={applicants.length} accent="gold" />
        <StatCard icon={Inbox} label="Inquiries" value={inquiries.length} />
        <StatCard icon={MessageCircle} label="Chat messages" value={chats.length} accent="gold" />
      </div>

      <div className="admin-panel">
        <h2>Recent activity</h2>
        {feed.length === 0 ? (
          <div className="empty-state">Nothing yet — activity will show up here in real time.</div>
        ) : (
          <ul className="admin-feed">
            {feed.map((item, i) => (
              <li key={i}>
                <span className={`admin-feed-tag ${item.type.toLowerCase()}`}>{item.type}</span>
                <span className="admin-feed-text">{item.text}</span>
                <span className="admin-feed-time">{timeAgo(item.ts)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
