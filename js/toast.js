/*
=========================================
THE BEST
MINI CART TOAST
=========================================
*/

const Toast = {

    show(product, size, quantity) {

        let toast = document.getElementById("toast");

        if (!toast) {

            toast = document.createElement("div");

            toast.id = "toast";

            document.body.appendChild(toast);

        }

        toast.innerHTML = `

            <div class="toast-header">

                ✔ Produto adicionado

            </div>

            <div class="toast-body">

                <img src="${product.image}" class="toast-image">

                <div>

                    <strong>${product.name}</strong>

                    <p>Tamanho: ${size}</p>

                    <p>Quantidade: ${quantity}</p>

                </div>

            </div>

            <div class="toast-buttons">

                <button id="continue-shopping">

                    Continuar

                </button>

                <button id="view-cart">

                    Ver Carrinho

                </button>

            </div>

        `;

        toast.classList.add("show");

        document
            .getElementById("continue-shopping")
            .onclick = () => {

                toast.classList.remove("show");

            };

        document
            .getElementById("view-cart")
            .onclick = () => {

                toast.classList.remove("show");

                const cartDrawer = document.getElementById("cart-drawer");

                const overlay = document.getElementById("overlay");

                if (cartDrawer) {

                    cartDrawer.classList.add("open");

                }

                if (overlay) {

                    overlay.classList.add("active");

                }

                Cart.renderDrawer();

            };

        setTimeout(() => {

            toast.classList.remove("show");

        }, 5000);

    }

};