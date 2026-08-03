/*
=========================================================
THE BEST
MODAL DO PRODUTO
=========================================================
*/

let selectedProduct = null;
let selectedQuantity = 1;

function openProductModal(product) {

    if (!product) return;

    selectedProduct = product;
    selectedQuantity = 1;

    const modal = document.getElementById("product-modal");
    const image = document.getElementById("modal-image");
    const name = document.getElementById("modal-name");
    const price = document.getElementById("modal-price");
    const sizeSelect = document.getElementById("modal-size");
    const qtyValue = document.getElementById("qty-value");

    if (!modal) return;

    image.src = product.image;
    name.textContent = product.name;
    price.textContent = ProductsManager.formatMoney(
        ProductsManager.getPrice(product)
    );

    qtyValue.textContent = "1";

    sizeSelect.innerHTML = "";

    product.sizes.forEach(size => {

        sizeSelect.innerHTML += `<option value="${size}">${size}</option>`;

    });

    modal.classList.add("active");

}

document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById("product-modal");

    if (!modal) return;

    document.getElementById("close-product-modal").onclick = () => {

        modal.classList.remove("active");

    };

    modal.onclick = (e) => {

        if (e.target === modal) {

            modal.classList.remove("active");

        }

    };

    document.getElementById("qty-plus").onclick = () => {

        selectedQuantity++;

        document.getElementById("qty-value").textContent = selectedQuantity;

    };

    document.getElementById("qty-minus").onclick = () => {

        if (selectedQuantity > 1) {

            selectedQuantity--;

            document.getElementById("qty-value").textContent = selectedQuantity;

        }

    };

    document.getElementById("add-cart-modal").onclick = () => {

        const size = document.getElementById("modal-size").value;

        Cart.addItem(

            selectedProduct,
            size,
            selectedProduct.color || "Padrão",
            selectedQuantity

        );

        modal.classList.remove("active");

        Cart.renderDrawer();
        Cart.updateBadges();

    };

    document.addEventListener("keydown", (e) => {

        if (e.key === "Escape") {

            modal.classList.remove("active");

        }

    });

});