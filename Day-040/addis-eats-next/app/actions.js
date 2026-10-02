"use server";

export async function placeOrder(formData) {
  const name = formData.get("name");
  const phone = formData.get("phone");

  console.log({
    name,
    phone,
  });

  return {
    success: true,
  };
}