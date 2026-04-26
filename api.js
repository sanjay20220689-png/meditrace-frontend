// api.js  — put this in your FRONTEND-HTML folder
const BASE_URL = "https://meditrace-backend-production.up.railway.app"; // change to your deployed backend URL later

async function getToken() {
  return localStorage.getItem("meditrace_token");
}

async function apiFetch(endpoint, options = {}) {
  const token = await getToken();
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  if (res.status === 401) {
    // Token expired — send back to login
    localStorage.clear();
    window.location.href = "login.html";
    return;
  }

  return res.json();
}