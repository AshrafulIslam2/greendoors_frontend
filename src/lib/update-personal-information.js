"use server";
import { revalidateTag } from "next/cache";

export async function updateUserPersonalInfo(formData, accessToken) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/add-personal-info`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Revalidate the cache for the 'user' tag
    revalidateTag("user");

    return { success: true, data };
  } catch (error) {
    console.error("Update error:", error);
    return { success: false, error: "Failed to update user data." };
  }
}