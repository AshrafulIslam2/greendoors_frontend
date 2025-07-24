import { auth } from "@/auth";
import Profile from "@/component/Profile/Profile";
import React from "react";

const page = async () => {
  const session = await auth();

  const data = await fetch(`http://localhost:3200/user/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.accessToken}`,
    },
  }).then((res) => res.json());

  const { personalInfo, nominee, member } = data || {};
  return (
    <>
      <Profile
        personalInfo={personalInfo}
        nominee={nominee}
        member={member}
        role={data.role}
      />
    </>
  );
};

export default page;
