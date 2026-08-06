const AdminProducts = {

    render(products = ProductsManager.getAll()) {
        console.log("AdminProducts.render()");

        const table = document.getElementById("admin-table");


        table.innerHTML = products.map(p => `

        <tr>

            <td>

                <img
                    src="${p.image}"
                    style="
                        width:60px;
                        height:60px;
                        object-fit:cover;
                        border-radius:8px;
                    ">

            </td>

            <td>${p.name}</td>

            <td>${p.category}</td>

            <td>${ProductsManager.formatMoney(ProductsManager.getPrice(p))}</td>

            <td>${p.stock}</td>

            <td>

                <button
                    onclick="AdminProducts.open(ProductsManager.getById('${p.id}'))"
                    class="btn-secondary">

                    <i class="fas fa-edit"></i>

                </button>

                <button
                    onclick="AdminProducts.remove('${p.id}')"
                    class="btn-danger">

                    <i class="fas fa-trash"></i>

                </button>

            </td>

        </tr>

        `).join("");

    },

    open(product){

        document.getElementById("edit-modal").style.display="flex";

        document.getElementById("edit-id").value=product.id;

        document.getElementById("edit-name").value=product.name;

        document.getElementById("edit-category").value=product.category;

        document.getElementById("edit-price").value=ProductsManager.getPrice(product);

        document.getElementById("edit-stock").value=product.stock;

        document.getElementById("edit-description").value=product.description;

    },

    close(){

        document.getElementById("edit-modal").style.display="none";

    },

    remove(id){

        alert("A eliminação será implementada no próximo passo.");

    }

};

function renderAdminProducts(){

    AdminProducts.render();

}

document.addEventListener("DOMContentLoaded",()=>{

    const close=document.getElementById("close-edit-modal");

    if(close){

        close.onclick=AdminProducts.close;

    }

});