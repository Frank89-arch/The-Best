/**
 * INICIALIZAÇÃO DA APLICAÇÃO
 */

document.addEventListener('DOMContentLoaded', async () => {

    // Carregar produtos
    await ProductsManager.init();

    // Actualizar contador do carrinho
    Cart.updateBadges();

    // ==========================
    // Carrinho
    // ==========================

    const cartBtn = document.getElementById("cart-btn");
    const cartDrawer = document.getElementById("cart-drawer");
    const closeCart = document.getElementById("close-cart");
    const overlay = document.getElementById("overlay");

    function toggleCart() {

        cartDrawer.classList.toggle("open");
        overlay.classList.toggle("active");

        Cart.renderDrawer();

    }

    if (cartBtn)
        cartBtn.addEventListener("click", toggleCart);

    if (closeCart)
        closeCart.addEventListener("click", toggleCart);

    if (overlay)
        overlay.addEventListener("click", toggleCart);

    // ==========================
    // Menu Mobile
    // ==========================

    const mobileToggle = document.getElementById("mobile-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (mobileToggle) {

        mobileToggle.addEventListener("click", () => {

            navMenu.classList.toggle("active");

        });

    }

});
// ===============================
// MODAL DO PRODUTO
// ===============================

let selectedProduct = null;
let selectedQuantity = 1;

function openProductModal(product) {

    selectedProduct = product;
    selectedQuantity = 1;

    document.getElementById("modal-image").src = product.image;
    document.getElementById("modal-name").textContent = product.name;
    document.getElementById("modal-price").textContent =
        ProductsManager.formatMoney(
            ProductsManager.getPrice(product)
        );

    const sizeSelect = document.getElementById("modal-size");

    sizeSelect.innerHTML = "";

    product.sizes.forEach(size => {

        sizeSelect.innerHTML += `<option value="${size}">${size}</option>`;

    });

    document.getElementById("qty-value").textContent = 1;

    document.getElementById("product-modal").classList.add("active");

}

const closeModalBtn = document.getElementById("close-product-modal");

if (closeModalBtn) {

    closeModalBtn.onclick = () => {

        document.getElementById("product-modal").classList.remove("active");

    };
}

const qtyPlus = document.getElementById("qty-plus");

if (qtyPlus) {

    qtyPlus.onclick = () => {

        selectedQuantity++;

        document.getElementById("qty-value").textContent = selectedQuantity;

    };

}

const qtyMinus = document.getElementById("qty-minus");

if (qtyMinus) {

    qtyMinus.onclick = () => {

        if (selectedQuantity > 1) {

            selectedQuantity--;

            document.getElementById("qty-value").textContent = selectedQuantity;

        }

    };

}
const addCartModal = document.getElementById("add-cart-modal");

if (addCartModal) {

    addCartModal.onclick = () => {

        const size = document.getElementById("modal-size").value;

        Cart.addItem(

            selectedProduct,

            size,

            selectedProduct.color || "Padrão",

            selectedQuantity

        );

        document
            .getElementById("product-modal")
            .classList
            .remove("active");

    };

}