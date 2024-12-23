// utils/backend.ts
export async function fetchSkills() {
  try {
    const res = await fetch(`https://codewithbeka.onrender.com/api/skills`, {
      credentials: "include", // Include cookies and authentication data
    });

    if (!res.ok) {
      const errorMessage = await res.text(); // Get the response body for more details
      throw new Error(`Failed to fetch categories: ${errorMessage}`);
    }

    const data = await res.json();
    return data || [];
  } catch (error) {
    console.error("Fetch error:", error);
    throw new Error("Network error occurred while fetching skills.");
  }
}

export async function fetchTestimonials() {
  const res = await fetch(
    `https://codewithbeka.onrender.com/api/testimonials`,
    {
      credentials: "include", // Include cookies and authentication data
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  const data = await res.json();

  return data || [];
}



export async function fetchProjects() {
  const res = await fetch(`https://codewithbeka.onrender.com/api/projects`, {
    credentials: "include", // Include cookies and authentication data
  });

  if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }
  const data = await res.json();
  return data.projects || [];
}