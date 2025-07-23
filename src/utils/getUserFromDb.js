// utils/getUserFromDb.ts
export const getUserFromDb = async (email, password) => {
  console.log("🚀 ~ getUserFromDb ~ password:", password);
  console.log("🚀 ~ getUserFromDb ~ email:", email);
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    // if (!res.ok) {
    //   const error = await res.json();
    //   console.error("Login failed:", error.message);
    //   return null;
    // }

    const data = await res.json();
    console.log("🚀 ~ getUserFromDb ~ data:", data);
    return data; // contains { accessToken, user }
  } catch (error) {
    console.error("Error during fetch:", error);
    return null;
  }
};
