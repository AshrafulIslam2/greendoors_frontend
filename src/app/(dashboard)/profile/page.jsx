import { auth } from "@/auth";
import Profile from "@/component/Profile/Profile";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
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

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken || ""}`,
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

  return (
    <>
      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <Profile
          personalInfo={personalInfo}
          nominee={nominee}
          member={member}
          role={role}
        />
      )}
    </>
  );
};

export default Page;
