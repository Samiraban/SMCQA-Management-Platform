import { useEffect, useState } from "react";
import { getCollection, subscribe } from "./store.js";

/**
 * Subscribes a component to a live collection ("services", "team", "jobs",
 * "blog", "clients", "inquiries", "applicants", "chats", "stats",
 * "siteContent"). Updates automatically whenever the data changes anywhere
 * in the app (including the admin panel, and other open tabs).
 */
export function useCollection(name) {
  const [data, setData] = useState(() => getCollection(name));

  useEffect(() => {
    setData(getCollection(name)); // re-sync in case another tab wrote first
    return subscribe(name, setData);
  }, [name]);

  return data;
}
