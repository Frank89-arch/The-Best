/**
 * INTEGRAÇÃO E FORMATADAR DE MENSAGENS PARA WHATSAPP
 */
const WhatsAppModule = {
  // Substitua pelo número real da marca (com código do país, ex: 258840000000)
  phoneNumber: "258845976760",

  /**
   * Compra directa de produto único
   */
  buySingleProduct(product, size, color, quantity = 1, clientName = "", clientLocation = "") {
    const message = `Olá.
Pretendo comprar este produto.

Produto: ${product.name}
Código: ${product.id}
Preço: ${ProductsManager.formatMoney(product.price)}
Cor: ${color || product.color}
Tamanho: ${size || product.sizes[0]}
Quantidade: ${quantity}
Nome do cliente: ${clientName}
Localização: ${clientLocation}

Aguardo confirmação.`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${this.phoneNumber}?text=${encodedMessage}`, '_blank');
  },

  /**
   * Finalização de todos os itens do carrinho
   */
  checkoutCart(clientName = "", clientLocation = "") {
    if (Cart.items.length === 0) {
      alert("O seu carrinho está vazio.");
      return;
    }

    let itemsFormatted = Cart.items.map((item, i) => 
      `${i + 1}. ${item.name} (Cód: ${item.id})\n   Qtd: ${item.quantity} | Tam: ${item.size} | Cor: ${item.color} | Preço: ${ProductsManager.formatMoney(item.price * item.quantity)}`
    ).join("\n\n");

    const message = `Olá.
Pretendo finalizar a compra dos seguintes produtos do meu carrinho:

${itemsFormatted}

TOTAL: ${ProductsManager.formatMoney(Cart.getTotal())}

Nome do cliente: ${clientName}
Localização: ${clientLocation}

Aguardo confirmação.`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${this.phoneNumber}?text=${encodedMessage}`, '_blank');
  }
};