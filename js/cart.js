/**
 * CARRINHO DE COMPRAS E FAVORITOS (LOCALSTORAGE)
 */
const Cart = {
  items: JSON.parse(localStorage.getItem('thebest_cart')) || [],
  favorites: JSON.parse(localStorage.getItem('thebest_favs')) || [],

  save() {
    localStorage.setItem('thebest_cart', JSON.stringify(this.items));
    localStorage.setItem('thebest_favs', JSON.stringify(this.favorites));
    this.updateBadges();
  },
addItem(product, size, color, qty = 1) {

    const existingIndex = this.items.findIndex(item =>

        item.id === product.id &&
        item.size === size &&
        item.color === color

    );

    const productPrice = ProductsManager.getPrice(product);

    if (existingIndex > -1) {

        this.items[existingIndex].quantity += qty;

    } else {

        this.items.push({

            id: product.id,
            name: product.name,
            image: product.image,

            category: product.category,
            model: product.model,

            price: productPrice,

          size: size || product.sizes?.[0] || "",

            color: color || "Padrão",

            quantity: qty

        });

    }

    this.save();

    this.renderDrawer();

},
increase(index) {

    this.items[index].quantity++;

    this.save();

    this.renderDrawer();

},

decrease(index) {

    if (this.items[index].quantity > 1) {

        this.items[index].quantity--;

    } else {

        this.items.splice(index, 1);

    }

    this.save();

    this.renderDrawer();

},
  removeItem(index) {
    this.items.splice(index, 1);
    this.save();
    this.renderDrawer();
  },

  getTotal() {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  },

  updateBadges() {
    const cartBadges = document.querySelectorAll('.cart-badge');
    const favBadges = document.querySelectorAll('.fav-badge');
    const count = this.items.reduce((sum, item) => sum + item.quantity, 0);

    cartBadges.forEach(b => b.textContent = count);
    favBadges.forEach(b => b.textContent = this.favorites.length);
  },

  renderDrawer() {
    const container = document.getElementById('cart-items-container');
    const totalEl = document.getElementById('cart-total-price');

    if (!container) return;

    if (this.items.length === 0) {
      container.innerHTML = `<p style="text-align:center; color:#888; margin-top:2rem;">O seu carrinho está vazio.</p>`;
      if (totalEl) totalEl.textContent = '0.00 MT';
      return;
    }

    container.innerHTML = this.items.map((item, index) => `
      <div class="cart-item">
        <img src="${item.image}" class="cart-item-img" alt="${item.name}">
        <div class="cart-item-details">
          <h4>${item.name}</h4>
         <p>

Categoria:
<b>${item.category}</b>

</p>

<p>

Modelo:
<b>${item.model}</b>

</p>

<p>

Cor:
<b>${item.color}</b>

</p>

<p>

Tamanho:
<b>${item.size}</b>

</p>

<div
style="
display:flex;
align-items:center;
gap:10px;
margin-top:10px;
">

<button
class="qty-btn"
onclick="Cart.decrease(${index})">

−

</button>

<strong>

${item.quantity}

</strong>

<button
class="qty-btn"
onclick="Cart.increase(${index})">

+

</button>

</div>
<p style="color:var(--color-gold);">

Preço:
<b>

${ProductsManager.formatMoney(item.price)}

</b>

</p>

<p style="font-weight:bold;">

Subtotal:

${ProductsManager.formatMoney(item.price * item.quantity)}

</p>

</div>

<button
onclick="Cart.removeItem(${index})"
style="
background:none;
border:none;
color:#e74c3c;
cursor:pointer;
">

<i class="fas fa-trash"></i>

</button>

</div>
`).join('');

if (totalEl) {
    totalEl.textContent = ProductsManager.formatMoney(this.getTotal());
}

}

};