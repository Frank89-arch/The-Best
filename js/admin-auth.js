const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "TheBest2026";

function isLogged() {

    return localStorage.getItem("admin_logged") === "true";

}

function login(username, password) {

    if (
        username === ADMIN_USERNAME &&
        password === ADMIN_PASSWORD
    ) {

        localStorage.setItem("admin_logged", "true");

        window.location.href = "admin.html";

        return true;

    }

    return false;

}

function logout() {

    localStorage.removeItem("admin_logged");

    window.location.href = "admin-login.html";

}

if (
    window.location.pathname.endsWith("admin.html") &&
    !isLogged()
) {

    window.location.href = "admin-login.html";

}