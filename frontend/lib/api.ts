// Función para leer la cookie csrftoken
function getCookie(name: string) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + "=")) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

export const loginUser = async ({
  email,
  password,
}: { email: string; password: string }) => {
  const csrfToken = getCookie("csrftoken");

  const res = await fetch("http://127.0.0.1:8000/api/authentication/login/", {
    method: "POST",
    credentials: "include", // necesario para que Django acepte cookies
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken || "",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Credenciales inválidas");
  return res.json();
};
