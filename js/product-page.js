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

    Toast.show(

    currentProduct,

    selectedSize,

    quantity

);

};

}
const buyNowBtn = document.getElementById("buy-now-btn");

if (buyNowBtn) {

    buyNowBtn.onclick = () => {

        const price = ProductsManager.getPrice(currentProduct);

        const total = price * quantity;

        const message = `Olá!

Gostaria de comprar o seguinte produto:

Produto: ${currentProduct.name}

Tamanho: ${selectedSize}

Quantidade: ${quantity}

Preço Unitário: ${ProductsManager.formatMoney(price)}

Total: ${ProductsManager.formatMoney(total)}

Obrigado.`;

        const phone = WhatsAppModule.phoneNumber || "258XXXXXXXXX";

        window.open(

            `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,

            "_blank"

        );

    };

}

/*
=========================================
COMPRAR AGORA
=========================================
*/

const buyNowBtn = document.getElementById("buy-now-btn");

if (buyNowBtn) {

    buyNowBtn.onclick = () => {

        const preco = ProductsManager.getPrice(currentProduct);

        const total = preco * quantity;

        const mensagem = `Olá!

Gostaria de efectuar a seguinte encomenda.

━━━━━━━━━━━━━━

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

━━━━━━━━━━━━━━

Aguardo a confirmação.

Muito obrigado.`;

        WhatsAppModule.sendMessage(mensagem);

    };

}