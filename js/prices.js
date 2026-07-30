const PRICE_TABLE = {
    tshirt: {
        slim: 800,
        oversized: 1400,
        cropped: 550
    },

    polo: {
        standard: 1100
    },

    formalshirt: {
        standard: 1200
    },

    ecobag: {
        standard: 550
    },

    bone: {
        standard: 450
    },

    hoodie: {
        standard: 1700
    },

    calcao: {
        standard: 1200
    },

    calca: {
        wideleg: 1950
    },

    blusao: {
        standard: 1550
    }
};

function getPrice(category, model) {
    category = category.toLowerCase();
    model = model.toLowerCase();

    if (!PRICE_TABLE[category]) return 0;

    return PRICE_TABLE[category][model] || PRICE_TABLE[category].standard || 0;
}