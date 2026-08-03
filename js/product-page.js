/*
=========================================
THE BEST
PÁGINA DO PRODUTO
=========================================
*/

let currentProduct = null;
let selectedSize = null;
let quantity = 1;

document.addEventListener("DOMContentLoaded", async () => {

    await ProductsManager.init();

    Cart.updateBadges();

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
        cartBtn.onclick = toggleCart;

    if (closeCart)
        closeCart.onclick = toggleCart;

    if (overlay)
        overlay.onclick = toggleCart;

    const params = new URLSearchParams(window.location.search);

const id = params.get("id");

currentProduct = ProductsManager.getById(id);

if (!currentProduct) {

    document.querySelector(".product-page").innerHTML =
        "<h2 style='text-align:center;margin:100px'>Produto não encontrado.</h2>";

    return;

}

renderProduct();
renderRelatedProducts();

});

function renderProduct() {

    document.getElementById("product-image").src = currentProduct.image;

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

            button.classList.add("active");

            selectedSize = size;

        }

        button.onclick = () => {

            document
                .querySelectorAll(".size-btn")
                .forEach(btn => btn.classList.remove("active"));

            button.classList.add("active");

            selectedSize = size;

        };

        container.appendChild(button);

    });

}

/*
=========================================
QUANTIDADE
=========================================
*/

const qtyPlus = document.getElementById("qty-plus");

const qtyMinus = document.getElementById("qty-minus");

const qtyValue = document.getElementById("qty-value");

if (qtyPlus) {

    qtyPlus.onclick = () => {

        quantity++;

        qtyValue.textContent = quantity;

    };

}

if (qtyMinus) {

    qtyMinus.onclick = () => {

        if (quantity > 1) {

            quantity--;

            qtyValue.textContent = quantity;

        }

    };

}

/*
=========================================
ADICIONAR AO CARRINHO
=========================================
*/

const addCartBtn = document.getElementById("add-cart-btn");

if (addCartBtn) {

    addCartBtn.onclick = () => {

        Cart.addItem(

            currentProduct,

            selectedSize,

            "Padrão",

            quantity

        );

        alert("Produto adicionado ao carrinho.");

    };

}

/*
=========================================
COMPRAR PELO WHATSAPP
=========================================
*/

const whatsappBtn = document.getElementById("buy-whatsapp-btn");

if (whatsappBtn) {

    whatsappBtn.onclick = () => {

        WhatsAppModule.buySingleProduct(

            currentProduct,

            selectedSize,

            quantity

        );

    };

}
function renderRelatedProducts() {

    const container = document.getElementById("related-products");

    if (!container) return;

    const products = ProductsManager
        .getAll()
        .filter(p => p.id !== currentProduct.id)
        .slice(0, 4);

    container.innerHTML = products.map(product => `

        <div class="product-card">

            <div class="product-image-container">

                <img src="${product.image}" class="product-image">

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

                <a href="produto.html?id=${product.id}"

                   class="btn-primary">

                    Ver Produto

                </a>

            </div>

        </div>

    `).join("");

}