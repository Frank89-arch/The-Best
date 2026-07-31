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