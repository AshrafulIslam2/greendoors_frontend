export async function getProfileInformation(accessToken) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken || ""}`,
      },
      next: {
        tags: ["user"], // Tag the fetch for revalidation
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    ({ personalInfo, nominee, member, role } = data || {});
  } catch (err) {
    console.error("Fetch error:", err.message);
    error = "Failed to load user data. Please try again later.";
  }
}
