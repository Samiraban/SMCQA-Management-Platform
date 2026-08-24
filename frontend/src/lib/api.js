/**
 * ---------------------------------------------------------------------------
 * API LAYER — this is the ONE file your backend friend needs to rewrite.
 * ---------------------------------------------------------------------------
 * Every function below currently talks to the local mock store (store.js).
 * Swap the body of each function for a real fetch()/axios call to your
 * backend, keep the same function name + same return shape, and nothing
 * else in the app (pages, admin panel, chatbot) needs to change.
 *
 * Example of what a real version looks like, once the backend exists:
 *
 *   export async function getJobs() {
 *     const res = await fetch(`${API_BASE}/jobs`);
 *     return res.json();
 *   }
 *
 *   export async function createInquiry(data) {
 *     const res = await fetch(`${API_BASE}/inquiries`, {
 *       method: "POST",
 *       headers: { "Content-Type": "application/json" },
 *       body: JSON.stringify(data),
 *     });
 *     return res.json();
 *   }
 * ---------------------------------------------------------------------------
 */
import { addItem, removeItem, updateItem, updateContent, getCollection } from "./store.js";

export const API_BASE = import.meta.env.VITE_API_BASE || "/api"; // used once real backend exists

// Services
export const getServices = () => getCollection("services");
export const createService = (data) => addItem("services", data);
export const editService = (id, patch) => updateItem("services", id, patch);
export const deleteService = (id) => removeItem("services", id);

// Team
export const getTeam = () => getCollection("team");
export const createTeamMember = (data) => addItem("team", data);
export const editTeamMember = (id, patch) => updateItem("team", id, patch);
export const deleteTeamMember = (id) => removeItem("team", id);

// Clients
export const getClients = () => getCollection("clients");
export const createClient = (data) => addItem("clients", data);
export const editClient = (id, patch) => updateItem("clients", id, patch);
export const deleteClient = (id) => removeItem("clients", id);

// Jobs / Careers
export const getJobs = () => getCollection("jobs");
export const createJob = (data) => addItem("jobs", { status: "Open", postedAt: Date.now(), ...data });
export const editJob = (id, patch) => updateItem("jobs", id, patch);
export const deleteJob = (id) => removeItem("jobs", id);

// Applicants (job applications submitted from Careers page)
export const getApplicants = () => getCollection("applicants");
export const createApplicant = (data) => addItem("applicants", { submittedAt: Date.now(), status: "New", ...data });
export const editApplicant = (id, patch) => updateItem("applicants", id, patch);
export const deleteApplicant = (id) => removeItem("applicants", id);

// Blog
export const getBlogPosts = () => getCollection("blog");
export const createBlogPost = (data) => addItem("blog", { publishedAt: Date.now(), ...data });
export const editBlogPost = (id, patch) => updateItem("blog", id, patch);
export const deleteBlogPost = (id) => removeItem("blog", id);

// Contact form inquiries
export const getInquiries = () => getCollection("inquiries");
export const createInquiry = (data) => addItem("inquiries", { submittedAt: Date.now(), status: "New", ...data });
export const editInquiry = (id, patch) => updateItem("inquiries", id, patch);
export const deleteInquiry = (id) => removeItem("inquiries", id);

// Chatbot conversation log
export const getChats = () => getCollection("chats");
export const createChatMessage = (data) => addItem("chats", { sentAt: Date.now(), ...data });

// Editable site copy (hero text, about text, etc.)
export const getSiteContent = () => getCollection("siteContent");
export const saveSiteContent = (patch) => updateContent(patch);

// Live dashboard stats
export const getStats = () => getCollection("stats");
