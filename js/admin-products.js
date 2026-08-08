const AdminProducts = {

    currentProduct: null,

    render(products = ProductsManager.getAll()) {

        const table = document.getElementById("admin-table");

        table.innerHTML = products.map(p => `

        <tr>

            <td>

                <img src="${p.image}" style="width:70px;height:70px;object-fit:cover;border-radius:10px;">

            </td>

            <td>${p.name}</td>

            <td>${p.category}</td>

            <td>${ProductsManager.formatMoney(ProductsManager.getPrice(p))}</td>

            <td>${p.stock}</td>

            <td>

                <button class="btn-primary edit-btn" data-id="${p.id}">
                    <i class="fas fa-edit"></i>
                </button>

                <button class="btn-secondary delete-btn" data-id="${p.id}">
                    <i class="fas fa-trash"></i>
                </button>

            </td>

        </tr>

        `).join("");

        this.bindEvents();

    },

    bindEvents() {

        document.querySelectorAll(".edit-btn").forEach(btn => {

            btn.onclick = () => {

                const product = ProductsManager.getById(btn.dataset.id);

                this.open(product);

            };

        });

    },

    open(product = null) {

        this.currentProduct = product;

        document.getElementById("edit-modal").classList.add("show");

        if(product){

            document.getElementById("modal-title").textContent="Editar Produto";

            document.getElementById("edit-id").value=product.id;
            document.getElementById("edit-name").value=product.name;
            document.getElementById("edit-category").value=product.category;
            document.getElementById("edit-price").value=ProductsManager.getPrice(product);
            document.getElementById("edit-stock").value=product.stock;
            document.getElementById("edit-description").value=product.description;
            document.getElementById("edit-image").value=product.image;
            document.getElementById("edit-material").value=product.material ?? "";

        }else{

            document.getElementById("modal-title").textContent="Novo Produto";

            document.querySelectorAll("#edit-modal input,#edit-modal textarea").forEach(e=>{

                e.value="";

            });

        }

    },

    close(){

        document.getElementById("edit-modal").classList.remove("show");

    }

};

function renderAdminProducts(){

    AdminProducts.render();

}
document.addEventListener("DOMContentLoaded", () => {

    const saveButton = document.getElementById("save-product");

    if (!saveButton) {
        console.error("Botão Guardar Produto não encontrado.");
        return;
    }

    saveButton.addEventListener("click", () => {

        const id = document.getElementById("edit-id").value;

        const product = ProductsManager.getById(id);

        if (!product) {
            alert("Produto não encontrado.");
            return;
        }

        product.name =
            document.getElementById("edit-name").value.trim();

        product.category =
            document.getElementById("edit-category").value.trim();

        product.price =
            Number(document.getElementById("edit-price").value) || 0;

        product.stock =
            Number(document.getElementById("edit-stock").value) || 0;

        product.material =
            document.getElementById("edit-material").value.trim();

        product.description =
            document.getElementById("edit-description").value.trim();

        product.image =
            document.getElementById("edit-image").value.trim();

        localStorage.setItem(
            "thebest_custom_products",
            JSON.stringify(ProductsManager.getAll())
        );

        AdminProducts.close();

        AdminProducts.render();

        if (typeof AdminDashboard !== "undefined") {
            AdminDashboard.update();
        }

        alert("Produto actualizado com sucesso.");

    });

});