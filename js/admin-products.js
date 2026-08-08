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

    const modal = document.getElementById("edit-modal");

    modal.classList.add("show");

    if (product) {

        document.getElementById("modal-title").textContent = "Editar Produto";

        document.getElementById("edit-id").value = product.id;
        document.getElementById("edit-name").value = product.name;
        document.getElementById("edit-category").value = product.category;
        document.getElementById("edit-price").value =
            ProductsManager.getPrice(product);
        document.getElementById("edit-stock").value = product.stock || 0;
        document.getElementById("edit-material").value =
            product.material || "";
        document.getElementById("edit-description").value =
            product.description || "";
        document.getElementById("edit-image").value =
            product.image || "";

        document.getElementById("edit-gallery").value =
            (product.gallery || []).join("\n");

        document.getElementById("edit-new").checked =
            product.isNew === true;

    } else {

        document.getElementById("modal-title").textContent = "Novo Produto";

        document.getElementById("edit-id").value = "";
        document.getElementById("edit-name").value = "";
        document.getElementById("edit-category").value = "";
        document.getElementById("edit-price").value = "";
        document.getElementById("edit-stock").value = "";
        document.getElementById("edit-material").value = "";
        document.getElementById("edit-description").value = "";
        document.getElementById("edit-image").value = "";
        document.getElementById("edit-gallery").value = "";
        document.getElementById("edit-new").checked = false;

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

    const id = document.getElementById("edit-id").value.trim();
    const name = document.getElementById("edit-name").value.trim();
    const category = document.getElementById("edit-category").value.trim();
    const price = Number(document.getElementById("edit-price").value) || 0;
    const stock = Number(document.getElementById("edit-stock").value) || 0;
    const material = document.getElementById("edit-material").value.trim();
    const description = document.getElementById("edit-description").value.trim();
    const image = document.getElementById("edit-image").value.trim();
    const galleryText = document.getElementById("edit-gallery").value.trim();
    const isNew = document.getElementById("edit-new").checked;

    if (!name) {

        alert("Digite o nome do produto.");

        return;

    }

    if (!category) {

        alert("Digite a categoria do produto.");

        return;

    }

    if (!id) {

        const newId = "TB-" + Date.now();

        const newProduct = {

            id: newId,

            name: name,

            category: category.toLowerCase(),

            model: "standard",

            price: price,

            sizes: [],

            material: material,

            collection: "The Best Collection",

            stock: stock,

            isNew: isNew,

            isSale: false,

            image: image,

            gallery: galleryText
                ? galleryText.split("\n").map(item => item.trim()).filter(Boolean)
                : image
                    ? [image]
                    : [],

            description: description

        };

        ProductsManager.products.push(newProduct);

    } else {

        const product = ProductsManager.getById(id);

        if (!product) {

            alert("Produto não encontrado.");

            return;

        }

        product.name = name;
        product.category = category.toLowerCase();
        product.price = price;
        product.stock = stock;
        product.material = material;
        product.description = description;
        product.image = image;
        product.isNew = isNew;

        product.gallery = galleryText
            ? galleryText.split("\n").map(item => item.trim()).filter(Boolean)
            : image
                ? [image]
                : [];

    }

    localStorage.setItem(
        "thebest_custom_products",
        JSON.stringify(ProductsManager.getAll())
    );

    AdminProducts.close();

    AdminProducts.render();

    if (typeof AdminDashboard !== "undefined") {

        AdminDashboard.update();

    }

    alert(
        id
            ? "Produto actualizado com sucesso."
            : "Produto adicionado com sucesso."
    );

});

        AdminProducts.close();

        AdminProducts.render();

        if (typeof AdminDashboard !== "undefined") {
            AdminDashboard.update();
        }

        alert("Produto actualizado com sucesso.");

    });

const addProductButton = document.getElementById("add-product-btn");

if (addProductButton) {

    addProductButton.addEventListener("click", () => {

        AdminProducts.open();

    });

}