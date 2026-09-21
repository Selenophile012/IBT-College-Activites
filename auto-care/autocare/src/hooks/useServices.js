import { useEffect, useState } from "react";
import { getServices } from "../api/serviceApi";

export function useServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadServices() {
      try {
        setLoading(true);
        setError("");

        const data = await getServices();

        if (active) {
          setServices(data);
        }
      } catch (err) {
        if (active) {
          setError("Unable to load services.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadServices();

    return () => {
      active = false;
    };
  }, []);

  return {
    services,
    loading,
    error,
  };
}
