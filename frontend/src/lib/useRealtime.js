import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { getCollection } from "./api.js";

function getInitialValue(name) {
  if (
    name === "siteContent" ||
    name === "stats"
  ) {
    return {};
  }

  return [];
}

export function useCollection(
  name,
  intervalMs = 5000
) {
  const [data, setData] = useState(
    getInitialValue(name)
  );

  const load = useCallback(async () => {
    try {
      const result =
        await getCollection(name);

      setData(
        result ??
          getInitialValue(name)
      );
    } catch (error) {
      console.error(
        `Failed to load ${name}:`,
        error
      );
    }
  }, [name]);

  useEffect(() => {
    let mounted = true;

    async function initialLoad() {
      try {
        const result =
          await getCollection(name);

        if (mounted) {
          setData(
            result ??
              getInitialValue(name)
          );
        }
      } catch (error) {
        if (mounted) {
          console.error(
            `Failed to load ${name}:`,
            error
          );
        }
      }
    }

    initialLoad();

    const interval = setInterval(() => {
      if (
        document.visibilityState ===
        "visible"
      ) {
        load();
      }
    }, intervalMs);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [
    name,
    intervalMs,
    load,
  ]);

  return data;
}