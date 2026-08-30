/**
 * ---------------------------------------------------------------------------
 * REAL-TIME DATA STORE
 * ---------------------------------------------------------------------------
 * This is the single source of truth for every piece of dynamic content on
 * the site (services, team, clients, jobs, blog posts, inquiries, live chat).
 *
 * How "real-time" works right now (frontend-only):
 *   - Every read/write goes through this store.
 *   - Data is persisted to localStorage so it survives refreshes.
 *   - A BroadcastChannel pushes every change to every open tab instantly
 *     (e.g. edit a job in /admin in one tab -> Careers page updates live in
 *     another tab, with zero refresh).
 *
 * How your friend plugs in the real backend later:
 *   - Only this file needs to change. Every page/component calls the
 *     functions in `api.js`, never localStorage directly.
 *   - Replace the body of each function in api.js with a `fetch()`/WebSocket
 *     call to the real API. Keep the same function names + return shapes and
 *     nothing else in the app needs to change.
 *   - For true real-time from a real backend, swap `channel.postMessage` for
 *     a WebSocket/Socket.IO `emit`, and call `notify()` when a message
 *     arrives from the server instead of only on local writes.
 * ---------------------------------------------------------------------------
 */

const STORAGE_KEY = "smcqa_db_v2";
const channel =
  typeof window !== "undefined" && "BroadcastChannel" in window
    ? new BroadcastChannel("smcqa-sync")
    : null;

const listeners = new Map(); // collection name -> Set of callbacks

const seed = {
  services: [
    { id: "s1", number: "01", title: "Hospitality", description: "Reliable hospitality manpower for hotels, restaurants, catering companies and service organisations.", icon: "Building2", image: "hospitality-manager" },
    { id: "s2", number: "02", title: "Construction", description: "Skilled and dependable workforce solutions supporting construction and infrastructure projects.", icon: "BriefcaseBusiness", image: "construction-site" },
    { id: "s3", number: "03", title: "Health Care", description: "Professional staffing solutions connecting healthcare organisations with qualified personnel.", icon: "UserRound", image: "doctor-tablet" },
    { id: "s4", number: "04", title: "Office Management", description: "Efficient administrative and office support personnel for organisations across different industries.", icon: "Users", image: "office-meeting" },
    { id: "s5", number: "05", title: "Security & Guarding", description: "Trained workforce solutions designed around safety, reliability and professional service.", icon: "ShieldCheck", image: "security-guard-radio" },
    { id: "s6", number: "06", title: "Agricultural & Farming", description: "Manpower recruitment solutions for agricultural, farming and related operational requirements.", icon: "Globe2", image: "farmer-field" },
    { id: "s7", number: "07", title: "Sub Contracting Works", description: "End-to-end subcontracting manpower support, from skilled trades to full project crews.", icon: "Handshake", image: "handshake-hardhat" },
  ],
  team: [
    { id: "t1", name: "Ahmed Al-Sayed", role: "Managing Director", photo: "https://i.pravatar.cc/300?img=12" },
    { id: "t2", name: "Fatima Noor", role: "HR & Recruitment Head", photo: "https://i.pravatar.cc/300?img=47" },
    { id: "t3", name: "Rashid Khan", role: "Operations Manager", photo: "https://i.pravatar.cc/300?img=33" },
    { id: "t4", name: "Sara Ibrahim", role: "Client Relations Lead", photo: "https://i.pravatar.cc/300?img=45" },
  ],
  clients: [
    { id: "c1", name: "Doha Grand Hotel", industry: "Hospitality" },
    { id: "c2", name: "Gulf Construction Group", industry: "Construction" },
    { id: "c3", name: "Al Rayyan Healthcare", industry: "Healthcare" },
    { id: "c4", name: "Qatar Facilities Co.", industry: "Office Management" },
  ],
  jobs: [
    { id: "j1", title: "Hotel Front Desk Agent", location: "Doha, Qatar", type: "Full-time", department: "Hospitality", status: "Open", postedAt: Date.now() },
    { id: "j2", title: "Site Security Officer", location: "Doha, Qatar", type: "Full-time", department: "Security & Guarding", status: "Open", postedAt: Date.now() },
  ],
  applicants: [],
  blog: [
    { id: "b1", title: "How to Choose the Right Staffing Partner in Qatar", excerpt: "A quick guide for businesses evaluating manpower consultancies.", body: "", publishedAt: Date.now(), author: "SMC Team" },
  ],
  inquiries: [],
  chats: [],
  siteContent: {
    heroTitle: "Transform Your Business With Smart Management",
    heroSubtitle: "Star Management Consultancy connects organisations with reliable manpower across every industry.",
    aboutText: "Star Management Consultancy is a Qatar-based workforce solutions provider connecting organisations with skilled, reliable manpower across hospitality, construction, healthcare and more.",
  },
  stats: {
    onlineVisitors: 1,
    totalInquiries: 0,
  },
};

function loadDb() {
  if (typeof window === "undefined") return structuredClone(seed);
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
      return structuredClone(seed);
    }
    const parsed = JSON.parse(raw);
    // Backfill any new collections added after a user already has data saved
    return { ...structuredClone(seed), ...parsed };
  } catch {
    return structuredClone(seed);
  }
}

let db = loadDb();

function persist() {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  }
}

function notify(collection) {
  const set = listeners.get(collection);
  if (set) set.forEach((cb) => cb(db[collection]));
  channel?.postMessage({ collection });
}

if (channel) {
  channel.onmessage = (event) => {
    db = loadDb(); // another tab wrote to localStorage; re-read it
    const { collection } = event.data || {};
    if (collection) {
      const set = listeners.get(collection);
      if (set) set.forEach((cb) => cb(db[collection]));
    }
  };
}

export function getCollection(name) {
  return db[name];
}

export function setCollection(name, value) {
  db[name] = value;
  persist();
  notify(name);
}

export function subscribe(name, callback) {
  if (!listeners.has(name)) listeners.set(name, new Set());
  listeners.get(name).add(callback);
  return () => listeners.get(name)?.delete(callback);
}

export function addItem(collection, item) {
  const withId = { id: item.id || crypto.randomUUID(), ...item };
  setCollection(collection, [...db[collection], withId]);
  return withId;
}

export function updateItem(collection, id, patch) {
  setCollection(
    collection,
    db[collection].map((i) => (i.id === id ? { ...i, ...patch } : i))
  );
}

export function removeItem(collection, id) {
  setCollection(collection, db[collection].filter((i) => i.id !== id));
}

export function updateContent(patch) {
  db.siteContent = { ...db.siteContent, ...patch };
  persist();
  notify("siteContent");
}

// Simulated "online now" ticker so the admin dashboard feels alive even
// before a real backend/websocket is wired up. Safe to delete once your
// friend's backend sends real visitor counts.
if (typeof window !== "undefined") {
  setInterval(() => {
    const delta = Math.floor(Math.random() * 3) - 1;
    const next = Math.max(1, (db.stats.onlineVisitors || 1) + delta);
    db.stats = { ...db.stats, onlineVisitors: next };
    persist();
    notify("stats");
  }, 4000);
}