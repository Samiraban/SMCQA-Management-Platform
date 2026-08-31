import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Mail,
  Download,
} from "lucide-react";

import companyLogo from "../assets/smc-logo.png";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
} from "./SocialIcons.jsx";

import "../styles/Navbar.css";

const serviceLinks = [
  {
    label: "Hospitality",
    path: "/services/hospitality",
  },
  {
    label: "Construction",
    path: "/services/construction",
  },
  {
    label: "Health Care",
    path: "/services/health-care",
  },
  {
    label: "Office Management",
    path: "/services/office-management",
  },
  {
    label: "Security & Guarding",
    path: "/services/security-guarding",
  },
  {
    label: "Agricultural & Farming",
    path: "/services/agricultural-farming",
  },
  {
    label: "Sub Contracting Works",
    path: "/services/sub-contracting-works",
  },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  // Forces the PDF to actually download instead of opening in a new tab.
  const handleDownloadProfile = async () => {
    try {
      const response = await fetch("/documents/SMCQA-Company-Profile.pdf");
      if (!response.ok) throw new Error("File not found");

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "SMCQA-Company-Profile.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Download failed:", err);
      alert("Sorry, the company profile could not be downloaded. Please try again later.");
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setServicesOpen(false);
  };

  const navClass = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";

  return (
    <header className="site-header">

      {/* ================= TOP BAR ================= */}
      <div className="top-bar">
        <div className="container top-bar-inner">

          {/* CONTACT INFORMATION */}
          <div className="top-contact">

            <a href="tel:+97466310125">
              <Phone size={18} />
              <span>(+974) 6631 0125</span>
            </a>

            <a href="mailto:info@smcqa.com">
              <Mail size={18} />
              <span>info@smcqa.com</span>
            </a>

          </div>

          {/* TOP RIGHT ACTIONS */}
          <div className="top-actions">

            {/* SOCIAL ICONS */}
            <div
              className="top-socials"
              aria-label="Social media"
            >
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                <FacebookIcon size={15} />
              </a>

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <InstagramIcon size={15} />
              </a>

              <a
                href="https://qa.linkedin.com/company/smcqatar"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <LinkedinIcon size={15} />
              </a>
            </div>

           {/* DOWNLOAD PROFILE */}
<button
  type="button"
  onClick={handleDownloadProfile}
  className="download-profile"
>
  <Download size={13} />
  <span>Download Profile</span>
</button>

            {/* APPLY NOW */}
            <Link
              to="/careers"
              className="top-apply"
              onClick={closeMenu}
            >
              Apply Now
            </Link>

          </div>
        </div>
      </div>


      {/* ================= MAIN NAVBAR ================= */}
      <div className="navbar-wrapper">

        <div className="container navbar-inner">

          <nav className="navbar">

            {/* ================= LOGO ================= */}
            <Link
              to="/"
              className="navbar-logo"
              onClick={closeMenu}
              aria-label="Star Management Consultancy"
            >
              <img
                src={companyLogo}
                alt="Star Management Consultancy and Hospitality Services"
              />
            </Link>


            {/* ================= NAVIGATION ================= */}
            <div
              className={`navbar-links ${
                menuOpen ? "navbar-links-open" : ""
              }`}
            >

              {/* HOME */}
              <NavLink
                to="/"
                end
                className={navClass}
                onClick={closeMenu}
              >
                HOME
              </NavLink>


              {/* ABOUT US */}
              <NavLink
                to="/about"
                className={navClass}
                onClick={closeMenu}
              >
                ABOUT US
              </NavLink>


              {/* SERVICES */}
              <div
                className={`nav-dropdown ${
                  servicesOpen ? "dropdown-open" : ""
                }`}
              >

                <button
                  type="button"
                  className="services-button"
                  onClick={() =>
                    setServicesOpen((value) => !value)
                  }
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                >
                  <span>SERVICES</span>

                  <ChevronDown
                    size={14}
                    className="services-arrow"
                  />
                </button>


                {/* SERVICES DROPDOWN */}
                <div className="dropdown-menu">

                  {/* ALL SERVICES */}
                  <Link
                    to="/services"
                    onClick={closeMenu}
                    className="all-services-link"
                  >
                    ALL SERVICES
                  </Link>

                  {/* SERVICE ITEMS */}
                  {serviceLinks.map((service) => (
                    <Link
                      key={service.path}
                      to={service.path}
                      onClick={closeMenu}
                    >
                      {service.label}
                    </Link>
                  ))}

                </div>

              </div>


              {/* CLIENTS */}
              <NavLink
                to="/clients"
                className={navClass}
                onClick={closeMenu}
              >
                CLIENTS
              </NavLink>


              {/* OUR TEAM */}
              <NavLink
                to="/team"
                className={navClass}
                onClick={closeMenu}
              >
                OUR TEAM
              </NavLink>


              {/* CAREER */}
              <NavLink
                to="/careers"
                className={navClass}
                onClick={closeMenu}
              >
                CAREER
              </NavLink>


              {/* BLOG */}
              <NavLink
                to="/blog"
                className={navClass}
                onClick={closeMenu}
              >
                BLOG
              </NavLink>


              {/* REVIEWS */}
              <NavLink
                to="/reviews"
                className={navClass}
                onClick={closeMenu}
              >
                REVIEWS
              </NavLink>

              {/* CONTACT US */}
              <NavLink
                to="/contact"
                className={navClass}
                onClick={closeMenu}
              >
                CONTACT US
              </NavLink>

            </div>


            {/* ================= MOBILE MENU ================= */}
            <button
              type="button"
              className="mobile-menu-button"
              onClick={() =>
                setMenuOpen((value) => !value)
              }
              aria-label={
                menuOpen
                  ? "Close navigation"
                  : "Open navigation"
              }
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>

          </nav>

        </div>

      </div>

    </header>
  );
}

export default Navbar;