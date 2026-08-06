/*
=========================================
THE BEST ADMIN 2.0
=========================================
*/

document.addEventListener("DOMContentLoaded", async () => {

    await ProductsManager.init();

    initDashboard();

    initMenu();

    initSearch();

    initCategoryFilter();

    renderProducts();

    if (typeof logout === "function") {

        document
            .getElementById("logout-btn")
            .addEventListener("click", logout);

    }

});

/*
=========================================
MENU
=========================================
*/

function initMenu() {

    const buttons = document.querySelectorAll(".menu-item");

    const pages = document.querySelectorAll(".page");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            buttons.forEach(b => b.classList.remove("active"));

            button.classList.add("active");

            pages.forEach(page => {

                page.classList.remove("active-page");

            });

            const id = button.dataset.page;

            const page = document.getElementById(id + "-page");

            if (page) {

                page.classList.add("active-page");

            }

            document.getElementById("page-title").textContent =
                button.textContent.trim();

        });

    });

}

/*
=========================================
DASHBOARD
=========================================
*/

function initDashboard() {

    const products = ProductsManager.getAll();

    document.getElementById("total-products").textContent =
        products.length;

    const categories = [
        ...new Set(products.map(p => p.category))
    ];

    document.getElementById("total-categories").textContent =
        categories.length;

    const stock = products.reduce((sum, p) => {

        return sum + (p.stock || 0);

    }, 0);

    document.getElementById("total-stock").textContent =
        stock;

    const news = products.filter(p => p.isNew).length;

    document.getElementById("new-products").textContent =
        news;

}

/*
=========================================
PREENCHER CATEGORIAS
=========================================
*/

function initCategoryFilter() {

    const select =
        document.getElementById("admin-category");

    const categories = [
        ...new Set(
            ProductsManager
            .getAll()
            .map(p => p.category)
        )
    ];

    categories.sort();

    categories.forEach(category => {

        select.innerHTML +=
            `<option value="${category}">
                ${category}
            </option>`;

    });

}

/*
=========================================
PESQUISA
=========================================
*/

function initSearch() {

    document
        .getElementById("admin-search")
        .addEventListener("input", renderProducts);

    document
        .getElementById("admin-category")
        .addEventListener("change", renderProducts);

}

/*
=========================================
RENDER
=========================================
*/

function renderProducts() {

    const search =
        document
        .getElementById("admin-search")
        .value
        .toLowerCase();

    const category =
        document
        .getElementById("admin-category")
        .value;

    let products =
        ProductsManager.getAll();

    if (category !== "all") {

        products =
            products.filter(p =>
                p.category === category
            );

    }

    if (search) {

        products =
            products.filter(p =>

                p.name
                .toLowerCase()
                .includes(search)

                ||

                p.id
                .toLowerCase()
                .includes(search)

            );

    }

    AdminProducts.render(products);

}