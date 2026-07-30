/**
 * PESQUISA EM TEMPO REAL E FILTRAGEM
 */
const SearchModule = {
  filter(products, { category, maxPrice, color, size, searchQuery, sortBy }) {
    let result = [...products];

    if (category && category !== 'all') {
      result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    if (maxPrice) {
      result = result.filter(p => p.price <= maxPrice);
    }

    if (color) {
      result = result.filter(p => p.color.toLowerCase() === color.toLowerCase());
    }

    if (size) {
      result = result.filter(p => p.sizes.includes(size));
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q)
      );
    }

    if (sortBy) {
      if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
      if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
      if (sortBy === 'newest') result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return result;
  }
};