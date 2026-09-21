import services from "./services";

export function getServices() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(services);
    }, 500);
  });
}

export function getServiceById(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const service = services.find((item) => item.id === id);

      resolve(service || null);
    }, 300);
  });
}