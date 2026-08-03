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

    const params = new URLSearchParams(window.location.search);

    const id = params.get("id");

    currentProduct = ProductsManager.getById(id);

    if (!currentProduct) {

        document.querySelector(".product-page").innerHTML =
            "<h2 style='text-align:center;margin:120px 0;'>Produto não encontrado.</h2>";

        return;

    }

    renderProduct();

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