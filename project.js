document.querySelectorAll('#menu .nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    
    const targetId = link.getAttribute('href').substring(1);
    document.getElementById(targetId).scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  });
});

 const products = [
            { id: 1, name: "WH-1000XM5", price: 399, img: "xm6.webp" },
            { id: 2, name: "PS5", price: 499, img: "https://via.placeholder.com/400x400?text=PS5" },
            { id: 3, name: "Alpha 7 IV", price: 2499, img: "https://via.placeholder.com/400x400?text=Alpha+7IV" },
            { id: 4, name: "Alpha 7 IV", price: 2499, img: "https://via.placeholder.com/400x400?text=Alpha+7IV" },
            { id: 5, name: "Alpha 7 IV", price: 2499, img: "https://via.placeholder.com/400x400?text=Alpha+7IV" }
        ];
        let cart = [];
        function renderProducts() {
            const container = document.getElementById('productContainer');
            container.innerHTML = products.map(product => `
                <div class="col-lg-4 col-md-6">
                    <div class="card product-card h-100 p-3 shadow-sm">
                        <img src="${product.img}" class="product-img card-img-top" alt="${product.name}">
                        <div class="card-body text-center">
                            <h3 class="card-title">${product.name}</h3>
                            <h4 class="text-danger fw-bold my-3">$${product.price}</h4>
                            <button onclick="addToCart(${product.id})" class="btn btn-dark btn-lg w-100 py-2">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }
        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            cart.push(product);
            updateCart();
            alert(`${product.name} added to cart!`);
        }
        function updateCart() {
            document.getElementById('cartCount').textContent = cart.length;
            const cartItems = document.getElementById('cartItems');
            if (cartItems) {
                cartItems.innerHTML = cart.map(item => `
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <div>
                            <h6>${item.name}</h6>
                            <small>$${item.price}</small>
                        </div>
                        <button class="btn btn-sm btn-outline-danger">Remove</button>
                    </div>
                `).join('');
            }
        }
        document.addEventListener('DOMContentLoaded', renderProducts);