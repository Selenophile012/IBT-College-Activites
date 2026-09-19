export async function placeOrder(form) {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const phone = form.phone.replace(/\s/g, "");

  if (phone === "0912345678") {
    const error = new Error("This TeleBirr number is not registered");

    error.status = 422;

    error.fieldErrors = {
      phone: "This TeleBirr number is not registered",
    };

    throw error;
  }

  return {
    id: Date.now(),
  };
}
