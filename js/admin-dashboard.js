const AdminDashboard = {

    update() {

        const products = ProductsManager.getAll();

        document.getElementById("total-products").textContent =
            products.length;

        const categories =
            [...new Set(products.map(p => p.category))];

        document.getElementById("total-categories").textContent =
            categories.length;

        const stock =
            products.reduce((sum,p)=>sum+p.stock,0);

        document.getElementById("total-stock").textContent =
            stock;

        const news =
            products.filter(p=>p.isNew).length;

        document.getElementById("new-products").textContent =
            news;

    }

};