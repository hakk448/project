const products = [
        { id: 1, name: "WH-1000XM5", price: 399, img: "xm6.webp" },
        { id: 2, name: "PS5", price: 499, img: "Sony-PlayStation-Pro-5.webp" },
        { id: 3, name: "Alpha 7 IV", price: 2499, img: "PDX223_New_Products_M.webp" },
        { id: 4, name: "Sony SRS-XB43", price: 299, img: "91mcfDnLhqL._UF350,350_QL80_.jpg" },
        { id: 5, name: "Sony Bravia X90J", price: 1299, img: "XR55X90J_01.webp" },
        { id: 6, name: "Sony-RX100-VII", price: 1499, img: "Sony-RX100-VII-beauty02.jpeg" },
        { id: 7, name: "Sony-RX100-VII", price: 2499, img: "Sony_alpha_7IV_beauty.jpeg" },
        { id: 8, name: "Alpha 7 IIV", price: 499, img: "sony-xperia-1-VII-FI.jpg" },
        { id: 9, name: "Sony WF-1000XM4", price: 299, img: "XR55X90J_01.webp" },
    ];
    let cart = [];
    function renderProducts() {
        const container = document.getElementById('productContainer');
        container.innerHTML = products.map(product => `
            <div class="col">
                <div class="card h-100">
                    <img src="${product.img}" class="product-img card-img-top" alt="${product.name}">
                    <div class="card-body text-center">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="text-primary fw-bold">$${product.price}</p>
                        <button onclick="addToCart(${product.id})" class="btn btn-primary">Add to Cart</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        const existingItem = cart.find(item => item.id === productId);  
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({...product, quantity: 1});
        }        
        updateCart();
        alert(`${product.name} added to cart!`);
    }
    function updateCart() {
        document.getElementById('cartCount').textContent = cart.reduce((sum, item) => sum + item.quantity, 0);       
        const emptyCart = document.getElementById('emptyCart');
        const cartTable = document.getElementById('cartTable');
        const cartItems = document.getElementById('cartItems');
        if (cart.length === 0) {
            emptyCart.style.display = 'block';
            cartTable.style.display = 'none';
        } else {
            emptyCart.style.display = 'none';
            cartTable.style.display = 'block';       
            cartItems.innerHTML = cart.map(item => `
                <tr>
                    <td>${item.id}</td>
                    <td><img src="${item.img}" class="cart-img"></td>
                    <td>${item.name}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-secondary quantity-control" onclick="changeQuantity(${item.id}, -1)">-</button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="btn btn-sm btn-outline-secondary quantity-control" onclick="changeQuantity(${item.id}, 1)">+</button>
                    </td>
                    <td>$${item.price}</td>
                    <td>$${item.price * item.quantity}</td>
                    <td><button class="btn btn-sm btn-danger" onclick="removeFromCart(${item.id})"><i class="fas fa-trash"></i></button></td>
                </tr>
            `).join('');
        }        
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        document.getElementById('cartTotal').textContent = `$${total}`;
    }
    function changeQuantity(productId, delta) {
        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity += delta;
            if (item.quantity <= 0) {
                cart = cart.filter(i => i.id !== productId);
            }
            updateCart();
        }
    }

    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        updateCart();
    }
    document.addEventListener('DOMContentLoaded', () => {
        renderProducts();
        updateCart();        
        document.getElementById('checkoutBtn').addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }         
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            alert(`Thank you for your purchase! Total: $${total}`);
            cart = [];
            updateCart();
            bootstrap.Modal.getInstance(document.getElementById('cartModal')).hide();
        });
    });