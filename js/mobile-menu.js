document.addEventListener("DOMContentLoaded", () => {

    const btn = document.getElementById("mobile-menu-btn");
    const menu = document.getElementById("nav-menu");

    if (!btn || !menu) return;

    btn.addEventListener("click", () => {

        menu.classList.toggle("active");

        const icon = btn.querySelector("i");

        if (menu.classList.contains("active")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-times");

        } else {

            icon.classList.remove("fa-times");
            icon.classList.add("fa-bars");

        }

    });

    document.querySelectorAll(".nav-link").forEach(link => {

        link.addEventListener("click", () => {

            menu.classList.remove("active");

            const icon = btn.querySelector("i");

            icon.classList.remove("fa-times");
            icon.classList.add("fa-bars");

        });

    });

});