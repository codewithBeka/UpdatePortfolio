 export async  function fetchSkills() {
    const res = await fetch(`https://codewithbeka.onrender.com/api/skills`, {
      cache: "force-cache", // Static fetch
      credentials: "include", // Include cookies and authentication data
    });
  
    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }
    const data = await res.json();
  
    return data || [];
  }

export async function fetchTestimonials() {
  const res = await fetch(
    `https://codewithbeka.onrender.com/api/testimonials`,
    {
      cache: "force-cache", // Static fetch
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
    cache: "force-cache", // Static fetch
    credentials: "include", // Include cookies and authentication data
  });

  if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }
  const data = await res.json();
  return data.projects || [];
}