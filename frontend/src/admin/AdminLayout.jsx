import { useState } from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Building,
  UserSquare2,
  FileText,
  Inbox,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import Logo from "../components/Logo.jsx";
import "./admin.css";

const NAV = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/services", label: "Services", icon: Briefcase },
  { to: "/admin/team", label: "Team", icon: UserSquare2 },
  { to: "/admin/clients", label: "Clients", icon: Building },
  { to: "/admin/jobs", label: "Jobs", icon: Briefcase },
  { to: "/admin/applicants", label: "Applicants", icon: Users },
  { to: "/admin/blog", label: "Blog", icon: FileText },
  { to: "/admin/inquiries", label: "Inquiries", icon: Inbox },
  { to: "/admin/content", label: "Site Content", icon: Settings },
];

function AdminLayout() {
  const { logout } = useAuth();
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="admin-shell">
      <aside className={`admin-sidebar ${navOpen ? "open" : ""}`}>
        <div className="admin-sidebar-brand">
          <Logo size={58} />
          <div>
            <strong>SMC Admin</strong>
            <small>Star Management Consultancy</small>
          </div>
        </div>

        <nav className="admin-nav">
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => (isActive ? "active" : undefined)}
              onClick={() => setNavOpen(false)}
            >
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <Link to="/" target="_blank" rel="noreferrer">
            <ExternalLink size={16} /> View site
          </Link>
          <button onClick={logout}>
            <LogOut size={16} /> Log out
          </button>
        </div>
      </aside>

      <div className="admin-main">
        <div className="admin-topbar">
          <button
            className="admin-nav-toggle"
            onClick={() => setNavOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {navOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <span>Admin Panel</span>
        </div>

        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;