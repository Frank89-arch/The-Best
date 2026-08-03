/*
=========================================
THE BEST
PRODUCT PAGE
=========================================
*/

let currentProduct = null;
let selectedSize = null;
let quantity = 1;

document.addEventListener("DOMContentLoaded", async () => {

    await ProductsManager.init();

    initCart();

    loadProduct();

});

/*
=========================================
INICIALIZAR CARRINHO
=========================================
*/

function initCart() {

    Cart.updateBadges();

    const cartBtn = document.getElementById("cart-btn");
    const cartDrawer = document.getElementById("cart-drawer");
    const closeCart = document.getElementById("close-cart");
    const overlay = document.getElementById("overlay");

    function toggleCart() {

        if (!cartDrawer) return;

        cartDrawer.classList.toggle("open");

        if (overlay) {

            overlay.classList.toggle("active");

        }

        Cart.renderDrawer();

    }

    if (cartBtn)
        cartBtn.onclick = toggleCart;

    if (closeCart)
        closeCart.onclick = toggleCart;

    if (overlay)
        overlay.onclick = toggleCart;

}

/*
=========================================
CARREGAR PRODUTO
=========================================
*/

function loadProduct() {

    const params = new URLSearchParams(window.location.search);

    const id = params.get("id");

    currentProduct = ProductsManager.getById(id);

    if (!currentProduct) {

        document.querySelector(".product-page").innerHTML = `
            <div style="text-align:center;padding:120px;">
                <h2>Produto não encontrado.</h2>
            </div>
        `;

        return;

    }

    renderProduct();

    renderRelatedProducts();

    initButtons();

}
/*
=========================================
MOSTRAR PRODUTO
=========================================
*/

function renderProduct() {

    document.getElementById("product-image").src = currentProduct.image;
    document.getElementById("product-image").alt = currentProduct.name;

    document.getElementById("product-name").textContent =
        currentProduct.name;

    document.getElementById("product-category").textContent =
        currentProduct.category;

    document.getElementById("product-description").textContent =
        currentProduct.description;

    document.getElementById("product-material").textContent =
        currentProduct.material;

    document.getElementById("product-collection").textContent =
        currentProduct.collection;

    document.getElementById("product-stock").textContent =
        currentProduct.stock;

    document.getElementById("product-price").textContent =
        ProductsManager.formatMoney(
            ProductsManager.getPrice(currentProduct)
        );

    renderSizes();

    document.getElementById("qty-value").textContent = quantity;

}

/*
=========================================
TAMANHOS
=========================================
*/

function renderSizes() {

    const container = document.getElementById("sizes-container");

    container.innerHTML = "";

    currentProduct.sizes.forEach((size, index) => {

        const button = document.createElement("button");

        button.className = "size-btn";

        button.textContent = size;

        if (index === 0) {

            selectedSize = size;

            button.classList.add("active");

        }

        button.onclick = () => {

            document.querySelectorAll(".size-btn").forEach(btn => {

                btn.classList.remove("active");

            });

            button.classList.add("active");

            selectedSize = size;

        };

        container.appendChild(button);

    });

}

/*
=========================================
BOTÕES
=========================================
*/

function initButtons() {

    const plus = document.getElementById("qty-plus");
    const minus = document.getElementById("qty-minus");

    plus.onclick = () => {

        quantity++;

        document.getElementById("qty-value").textContent = quantity;

    };

    minus.onclick = () => {

        if (quantity > 1) {

            quantity--;

            document.getElementById("qty-value").textContent = quantity;

        }

    };

}
/*
=========================================
BOTÕES DE COMPRA
=========================================
*/

function initButtons() {

    const plus = document.getElementById("qty-plus");
    const minus = document.getElementById("qty-minus");
    const addCart = document.getElementById("add-cart-btn");
    const buyNow = document.getElementById("buy-now-btn");

    plus.onclick = () => {

        quantity++;

        document.getElementById("qty-value").textContent = quantity;

    };

    minus.onclick = () => {

        if (quantity > 1) {

            quantity--;

            document.getElementById("qty-value").textContent = quantity;

        }

    };

    addCart.onclick = () => {

        Cart.addItem(

            currentProduct,

            selectedSize,

            "Padrão",

            quantity

        );

        Cart.updateBadges();

        Cart.renderDrawer();

        Toast.show(

            currentProduct,

            selectedSize,

            quantity

        );

    };

    buyNow.onclick = () => {

        const preco = ProductsManager.getPrice(currentProduct);

        const total = preco * quantity;

        const telefone = WhatsAppModule.phoneNumber || "258XXXXXXXXX";

        const mensagem = `Olá!

Gostaria de efectuar a seguinte encomenda.

🛍 Produto:
${currentProduct.name}

📏 Tamanho:
${selectedSize}

🔢 Quantidade:
${quantity}

💰 Preço Unitário:
${ProductsManager.formatMoney(preco)}

💵 Total:
${ProductsManager.formatMoney(total)}

Obrigado.`;

        window.open(

            `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`,

            "_blank"

        );

    };

}

/*
=========================================
PRODUTOS RELACIONADOS
=========================================
*/

function renderRelatedProducts() {

    const container = document.getElementById("related-products");

    if (!container) return;

    const relacionados = ProductsManager
        .getAll()
        .filter(p => p.id !== currentProduct.id)
        .slice(0,4);

    container.innerHTML = relacionados.map(product => `

        <div class="product-card">

            <div class="product-image-container">

                <img
                    src="${product.image}"
                    class="product-image"
                    alt="${product.name}">

            </div>

            <div class="product-info">

                <span class="product-category">

                    ${product.category}

                </span>

                <h3 class="product-title">

                    ${product.name}

                </h3>

                <div class="product-price">

                    ${ProductsManager.formatMoney(
                        ProductsManager.getPrice(product)
                    )}

                </div>

                <div class="product-actions">

                    <a
                        href="produto.html?id=${product.id}"
                        class="btn-secondary">

                        Ver

                    </a>

                    <button
                        class="btn-primary"
                        onclick="openProductModal(ProductsManager.getById('${product.id}'))">

                        Comprar

                    </button>

                </div>

            </div>

        </div>

    `).join("");

}