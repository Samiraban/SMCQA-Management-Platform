const API_BASE = (
  import.meta.env.VITE_API_BASE ||
  "https://smcqa-management-platform.onrender.com/api"
).replace(/\/$/, "");

export { API_BASE };

function getToken() {
  return localStorage.getItem("smcqa_token");
}

async function request(path, options = {}) {
  const headers = new Headers(options.headers || {});

  if (
    options.body !== undefined &&
    !headers.has("Content-Type")
  ) {
    headers.set("Content-Type", "application/json");
  }

  const token = getToken();

  if (token) {
    headers.set(
      "Authorization",
      `Bearer ${token}`
    );
  }

  let response;

  try {
    response = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers,
    });
  } catch (error) {
    console.error("Network error:", error);

    throw new Error(
  `Cannot connect to the backend at ${API_BASE}`
);
  }

  const text = await response.text();

  let data = {};

  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = {
      message: text || "Invalid server response.",
    };
  }

  if (!response.ok || data.success === false) {
    if (response.status === 401) {
      localStorage.removeItem("smcqa_token");
      localStorage.removeItem("smcqa_user");
    }

    throw new Error(
      data.message ||
        `Request failed with status ${response.status}`
    );
  }

  return data;
}

/* =========================================================
   GENERIC COLLECTION HELPERS
========================================================= */

export async function getCollection(name) {
  const result = await request(
    `/content/${encodeURIComponent(name)}`
  );

  return (
    result.data ??
    (name === "siteContent" || name === "stats"
      ? {}
      : [])
  );
}

async function createItem(collection, data) {
  const result = await request(
    `/content/${encodeURIComponent(collection)}`,
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );

  return result.data;
}

async function updateItem(collection, id, data) {
  const result = await request(
    `/content/${encodeURIComponent(collection)}/${encodeURIComponent(id)}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
    }
  );

  return result.data;
}

async function deleteItem(collection, id) {
  await request(
    `/content/${encodeURIComponent(collection)}/${encodeURIComponent(id)}`,
    {
      method: "DELETE",
    }
  );

  return true;
}

/* =========================================================
   SERVICES
========================================================= */

export const getServices = () =>
  getCollection("services");

export const createService = (data) =>
  createItem("services", data);

export const editService = (id, data) =>
  updateItem("services", id, data);

export const deleteService = (id) =>
  deleteItem("services", id);

/* =========================================================
   TEAM
========================================================= */

export const getTeam = () =>
  getCollection("team");

export const createTeamMember = (data) =>
  createItem("team", data);

export const editTeamMember = (id, data) =>
  updateItem("team", id, data);

export const deleteTeamMember = (id) =>
  deleteItem("team", id);
/* =========================================================
   REVIEWS
========================================================= */

export const getReviews = () =>
  getCollection("reviews");

export const createReview = (data) =>
  createItem("reviews", data);

export const editReview = (id, data) =>
  updateItem("reviews", id, data);

export const deleteReview = (id) =>
  deleteItem("reviews", id);

/* =========================================================
   CLIENTS
========================================================= */

export const getClients = () =>
  getCollection("clients");

export const createClient = (data) =>
  createItem("clients", data);

export const editClient = (id, data) =>
  updateItem("clients", id, data);

export const deleteClient = (id) =>
  deleteItem("clients", id);

/* =========================================================
   JOBS
========================================================= */

export const getJobs = () =>
  getCollection("jobs");

export const createJob = (data) =>
  createItem("jobs", {
    status: "Open",
    postedAt: Date.now(),
    ...data,
  });

export const editJob = (id, data) =>
  updateItem("jobs", id, data);

export const deleteJob = (id) =>
  deleteItem("jobs", id);

/* =========================================================
   APPLICANTS
========================================================= */

export const getApplicants = () =>
  getCollection("applicants");

export const createApplicant = (data) =>
  createItem("applicants", {
    submittedAt: Date.now(),
    status: "New",
    ...data,
  });

export const editApplicant = (id, data) =>
  updateItem("applicants", id, data);

export const deleteApplicant = (id) =>
  deleteItem("applicants", id);

/* =========================================================
   BLOG
========================================================= */

export const getBlogPosts = () =>
  getCollection("blog");

export const createBlogPost = (data) =>
  createItem("blog", {
    publishedAt: Date.now(),
    ...data,
  });

export const editBlogPost = (id, data) =>
  updateItem("blog", id, data);

export const deleteBlogPost = (id) =>
  deleteItem("blog", id);

/* =========================================================
   INQUIRIES
========================================================= */

export const getInquiries = () =>
  getCollection("inquiries");

export const createInquiry = (data) =>
  createItem("inquiries", {
    submittedAt: Date.now(),
    status: "New",
    ...data,
  });

export const editInquiry = (id, data) =>
  updateItem("inquiries", id, data);

export const deleteInquiry = (id) =>
  deleteItem("inquiries", id);

/* =========================================================
   CHAT
========================================================= */

export const getChats = () =>
  getCollection("chats");

export const createChatMessage = (data) =>
  createItem("chats", {
    sentAt: Date.now(),
    ...data,
  });

/* =========================================================
   SITE CONTENT
========================================================= */

export const getSiteContent = () =>
  getCollection("siteContent");

export const saveSiteContent = (data) =>
  updateItem(
    "siteContent",
    "site-content",
    data
  );

/* =========================================================
   DASHBOARD
========================================================= */

export const getStats = () =>
  getCollection("stats");

/* =========================================================
   MAILER (admin "Reply" button on Inquiries/Applicants)
========================================================= */

export const sendReplyEmail = (data) =>
  request("/mailer/reply", {
    method: "POST",
    body: JSON.stringify(data),
  });