const AdminProducts = {

    open(product){

        document.getElementById("edit-modal").style.display="flex";

        document.getElementById("edit-id").value=product.id;

        document.getElementById("edit-name").value=product.name;

        document.getElementById("edit-category").value=product.category;

        document.getElementById("edit-price").value=
            ProductsManager.getPrice(product);

        document.getElementById("edit-stock").value=product.stock;

        document.getElementById("edit-description").value=
            product.description;

    },

    close(){

        document.getElementById("edit-modal").style.display="none";

    }

};

document.addEventListener("DOMContentLoaded",()=>{

const close=document.getElementById("close-edit-modal");

if(close){

close.onclick=AdminProducts.close;

}

});