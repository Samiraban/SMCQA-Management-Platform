import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Chatbot from "./components/chatbot/Chatbot.jsx";
import WhatsAppButton from "./components/WhatsAppButton.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import { initScrollReveal } from "./lib/scrollReveal.js";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Services from "./pages/Services.jsx";
import Clients from "./pages/Clients.jsx";
import Team from "./pages/Team.jsx";
import Careers from "./pages/Careers.jsx";
import Contact from "./pages/Contact.jsx";
import Blog from "./pages/Blog.jsx";
import Reviews from "./pages/Reviews.jsx";
import NotFound from "./pages/NotFound.jsx";
import AdminLayout from "./admin/AdminLayout.jsx";
import AdminLogin from "./admin/AdminLogin.jsx";
import RequireAuth from "./admin/RequireAuth.jsx";
import Dashboard from "./admin/pages/Dashboard.jsx";
import ManageServices from "./admin/pages/ManageServices.jsx";
import ManageTeam from "./admin/pages/ManageTeam.jsx";
import ManageClients from "./admin/pages/ManageClients.jsx";
import ManageJobs from "./admin/pages/ManageJobs.jsx";
import ManageApplicants from "./admin/pages/ManageApplicants.jsx";
import ManageBlog from "./admin/pages/ManageBlog.jsx";
import ManageReviews from "./admin/pages/ManageReviews.jsx";
import ManageInquiries from "./admin/pages/ManageInquiries.jsx";
import ManageContent from "./admin/pages/ManageContent.jsx";

function SiteLayout({ children }) {
  return <><Navbar /><main>{children}</main><Footer /><Chatbot /><WhatsAppButton /></>;
}

function App() {
  const location = useLocation();
  useEffect(() => {
    const timer = setTimeout(initScrollReveal, 50);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<SiteLayout><Home /></SiteLayout>} />
        <Route path="/about" element={<SiteLayout><About /></SiteLayout>} />
        <Route path="/services" element={<SiteLayout><Services /></SiteLayout>} />
        <Route path="/services/*" element={<SiteLayout><Services /></SiteLayout>} />
        <Route path="/clients" element={<SiteLayout><Clients /></SiteLayout>} />
        <Route path="/team" element={<SiteLayout><Team /></SiteLayout>} />
        <Route path="/careers" element={<SiteLayout><Careers /></SiteLayout>} />
        <Route path="/contact" element={<SiteLayout><Contact /></SiteLayout>} />
        <Route path="/blog" element={<SiteLayout><Blog /></SiteLayout>} />
        <Route path="/reviews" element={<SiteLayout><Reviews /></SiteLayout>} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<RequireAuth><AdminLayout /></RequireAuth>}>
          <Route index element={<Dashboard />} />
          <Route path="services" element={<ManageServices />} />
          <Route path="team" element={<ManageTeam />} />
          <Route path="clients" element={<ManageClients />} />
          <Route path="jobs" element={<ManageJobs />} />
          <Route path="applicants" element={<ManageApplicants />} />
                    <Route path="blog" element={<ManageBlog />} />
          <Route path="reviews" element={<ManageReviews />} />
          <Route path="inquiries" element={<ManageInquiries />} />
          <Route path="content" element={<ManageContent />} />
        </Route>
        <Route path="*" element={<SiteLayout><NotFound /></SiteLayout>} />
      </Routes>
    </>
  );
}
export default App;