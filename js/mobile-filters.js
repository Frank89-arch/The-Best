document.addEventListener("DOMContentLoaded", () => {

    const btn = document.getElementById("mobile-filter-btn");
    const filters = document.getElementById("mobile-filters");

    if (!btn || !filters) return;

    btn.addEventListener("click", () => {

        filters.classList.toggle("active");

    });

});