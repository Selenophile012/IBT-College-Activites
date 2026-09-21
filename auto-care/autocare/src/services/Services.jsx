import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import { useServices } from "../hooks/useServices";
import ServiceCard from "./ServiceCard";

function Services() {
  const { services, loading, error } = useServices();

  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "All";

  const categories = useMemo(() => {
    return ["All", ...new Set(services.map((service) => service.category))];
  }, [services]);

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesSearch =
        service.name.toLowerCase().includes(search.toLowerCase()) ||
        service.description.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || service.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [services, search, category]);

  function handleSearch(event) {
    const value = event.target.value;

    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    setSearchParams(params);
  }

  function handleCategory(categoryName) {
    const params = new URLSearchParams(searchParams);

    if (categoryName === "All") {
      params.delete("category");
    } else {
      params.set("category", categoryName);
    }

    setSearchParams(params);
  }

  return (
    <section className="page">
      <div className="container">
        <div className="page-heading">
          <p className="eyebrow">AUTOMOTIVE SERVICES</p>

          <h1>Find the right service for your vehicle</h1>

          <p>
            Browse maintenance, safety, diagnostic, and comfort services for
            your car.
          </p>
        </div>

        <div className="service-controls">
          <input
            type="search"
            placeholder="Search services..."
            value={search}
            onChange={handleSearch}
          />

          <div className="category-list">
            {categories.map((categoryName) => (
              <button
                key={categoryName}
                type="button"
                className={
                  category === categoryName
                    ? "category-button active"
                    : "category-button"
                }
                onClick={() => handleCategory(categoryName)}
              >
                {categoryName}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div className="state-message">
            <p>Loading services...</p>
          </div>
        )}

        {error && (
          <div className="state-message error">
            <h2>Something went wrong</h2>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && filteredServices.length === 0 && (
          <div className="state-message">
            <h2>No services found</h2>
            <p>Try another search term or choose a different category.</p>
          </div>
        )}

        {!loading && !error && filteredServices.length > 0 && (
          <div className="service-grid">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Services;
