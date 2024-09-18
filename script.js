let cart = [];
let products = [];

document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    updateCart();
});

function loadProducts() {
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            products = data;
            const productContainer = document.getElementById('product-container');
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('product');
                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>$${product.price}</p>
                    <button onclick="addToCart(${product.id})">Add to Cart</button>
                `;
                productContainer.appendChild(productCard);
            });
        });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.textContent = `${item.name} - $${item.price}`;
        cartItems.appendChild(itemElement);
        total += item.price;
    });

    totalPriceElement.textContent = `Total: $${total.toFixed(2)}`;
}

document.getElementById('checkout-btn').addEventListener('click', function() {
    alert('This is a static demo, no payment processing implemented.');
});
