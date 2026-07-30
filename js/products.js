/**
 * GERENCIADOR DE PRODUTOS E DADOS GLOBAL
 */
const ProductsManager = {
  products: [],

  async init() {
    try {
      const response = await fetch('data/products.json');
      this.products = await response.json();
      
      // Carregar produtos salvos localmente (se alterados pelo admin)
      const localProducts = localStorage.getItem('thebest_custom_products');
      if (localProducts) {
        this.products = JSON.parse(localProducts);
      }
    } catch (error) {
      console.error("Erro ao carregar os produtos:", error);
    }
  },

  getAll() {
    return this.products;
  },

  getById(id) {
    return this.products.find(p => p.id === id);
  },

  formatMoney(amount) {
    return new Intl.NumberFormat('pt-MZ', {
      style: 'currency',
      currency: 'MZN'
    }).format(amount).replace('MZN', 'MT');
  },
  getPrice(product) {
  return getPrice(product.category, product.model);
},

getCategories() {
  return [...new Set(this.products.map(p => p.category))];
},

getProductsByCategory(category) {
  return this.products.filter(
    p => p.category.toLowerCase() === category.toLowerCase()
  );
},

search(term) {
  term = term.toLowerCase();

  return this.products.filter(product =>
      product.name.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term)
  );
}
};