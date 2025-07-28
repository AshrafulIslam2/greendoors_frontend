import React from "react";
import Navbar from "./Navbar";
import { auth } from "@/auth";

const Navigation = async () => {
  const session = await auth();

  // Redirect to /login if no session or accessToken
  if (!session?.accessToken) {
    redirect("/login");
  }
  let personalInfo = null;
  let nominee = null;
  let member = null;
  let role = null;
  let error = null;
  let data = null;

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

    data = await response.json();
    ({ personalInfo, nominee, member, role } = data || {});
  } catch (err) {
    console.error("Fetch error:", err.message);
    error = "Failed to load user data. Please try again later.";
  }
  return (
    <>
      <Navbar data={data} />
    </>
  );
};

export default Navigation;
