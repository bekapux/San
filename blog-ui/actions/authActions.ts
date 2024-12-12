import Cookies from "js-cookie";

export async function SignIn(email: string, password: string) {
  const response = await fetch("http://localhost:5053/api/auth/signin/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json();

  if (data.token) {
    Cookies.set("token", data.token);
    Cookies.set("email", data.email);
    Cookies.set("firstname", data.firstname);
    Cookies.set("lastname", data.lastname);
  }

  return data;
}

export async function Register(email, username, firstName, lastName, password) {
  const response = await fetch("http://localhost:5053/api/auth/register/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      username: username,
      firstname: firstName,
      lastname: lastName,
      password: password,
    }),
  });

  if (!response.ok) {
    const data = await response.json();

    return { success: false, data: data };
  }

  const signin = await SignIn(email, password);

  if (signin) {
    window.location.reload();
  }

  return { success: true, data: data };
}

export async function getBlogs(page: number) {
  try {
    const response = await fetch(`http://localhost:5053/api/posts/${page}/5`);

    if (!response.ok) {
      throw new Error(`Failed to fetch blogs. Status: ${response.status}`);
    }
    const data = response.json();
    return data;
  } catch (error) {
    // console.error("Error fetching blogs:", error.message || error);
    return null;
  }
}

export async function getBlogsById(id) {
  try {
    const response = await fetch(`http://localhost:5053/api/posts/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch a blog. Status: ${response.status}`);
    }
    const data = response.json();
    return data;
  } catch (error) {
    // console.error("Error fetching blogs:", error.message || error);
    return null;
  }
}

export async function postBlog(title, shortDescription, fullDescription) {
  try {
    const token = Cookies.get("token");
    const response = await fetch("http://localhost:5053/api/posts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, shortDescription, fullDescription }),
    });

    if (!response.ok) {
      return response.status;
    }

    return true;
  } catch (error) {
    console.error("Error Creating A Blog: ", error);
    return null;
  }
}
