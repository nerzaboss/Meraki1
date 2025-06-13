

// Sample Products Data
        const products = [
            {
                id: 1,
                name: "Collar Artesanal Dorado",
                category: "accesorios",
                price: 2500,
                description: "Collar stray kids.",
                image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop",
                stock: 8
            },
            {
                id: 2,
                name: "Bordado de jojo",
                category: "bordados",
                price: 1800,
                description: "prueba de texto2.",
                image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop",
                stock: 5
            },
            {
                id: 3,
                name: "no se que poner",
                category: "accesorios",
                price: 1200,
                description: "prueba de texto23.",
                image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop",
                stock: 12
            },
            {
                id: 4,
                name: "no se que poner",
                category: "bordados",
                price: 800,
                description: "prueba de texto2",
                image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop",
                stock: 3
            },
            {
                id: 5,
                name: "no se que poner",
                category: "accesorios",
                price: 3200,
                description: "ñiñiñili",
                image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop",
                stock: 6
            },
            {
                id: 6,
                name: "no se que poner",
                category: "bordados",
                price: 4500,
                description: "hola",
                image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
                stock: 2
            }
        ];

        // Cart Management
        let cart = [];
        let filteredProducts = [...products];

        // Load products on page load
        document.addEventListener('DOMContentLoaded', function() {
            loadProducts(products);
            setupFilters();
            updateCartDisplay();
        });

        // Load products into grid
        function loadProducts(productsToShow) {
            const productsGrid = document.getElementById('productsGrid');
            productsGrid.innerHTML = '';

            productsToShow.forEach(product => {
                const productCard = createProductCard(product);
                productsGrid.appendChild(productCard);
            });

            // Add animation to new products
            const cards = productsGrid.querySelectorAll('.product-card');
            cards.forEach((card, index) => {
                card.style.animationDelay = `${index * 0.1}s`;
                card.classList.add('animate__animated', 'animate__fadeInUp');
            });
        }

        // Create product card HTML
        function createProductCard(product) {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                </div>
                <div class="product-info">
                    <div class="product-category">${product.category}</div>
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price">$${product.price.toLocaleString()}</div>
                    <div class="product-actions">
                        <button class="btn-primary" onclick="addToCart(${product.id})">
                            <i class="fas fa-cart-plus"></i> Agregar
                        </button>
                        <button class="btn-secondary" onclick="buyNow(${product.id})">
                            Comprar Ya
                        </button>
                    </div>
                </div>
            `;
            return card;
        }

        // Setup filter functionality
        function setupFilters() {
            const filterBtns = document.querySelectorAll('.filter-btn');
            
            filterBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    // Remove active class from all buttons
                    filterBtns.forEach(b => b.classList.remove('active'));
                    // Add active class to clicked button
                    this.classList.add('active');
                    
                    const filter = this.dataset.filter;
                    filterProducts(filter);
                });
            });
        }

        // Filter products
        function filterProducts(filter) {
            let filtered = [...products];

            switch(filter) {
                case 'accesorios':
                    filtered = products.filter(p => p.category === 'accesorios');
                    break;
                case 'bordados':
                    filtered = products.filter(p => p.category === 'bordados');
                    break;
                case 'price-low':
                    filtered = products.sort((a, b) => a.price - b.price);
                    break;
                case 'price-high':
                    filtered = products.sort((a, b) => b.price - a.price);
                    break;
                default:
                    filtered = products;
            }

            filteredProducts = filtered;
            loadProducts(filtered);
        }

        // Add to cart
        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            const existingItem = cart.find(item => item.id === productId);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({...product, quantity: 1});
            }

            updateCartDisplay();
            showNotification(`${product.name} agregado al carrito`);
        }

        // Update cart display
        function updateCartDisplay() {
            const cartCount = document.getElementById('cartCount');
            const cartItems = document.getElementById('cartItems');
            const cartTotal = document.getElementById('cartTotal');

            // Update cart count
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;

            // Update cart items
            cartItems.innerHTML = '';
            let total = 0;

            cart.forEach(item => {
                total += item.price * item.quantity;
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 5px;">
                    </div>
                    <div class="cart-item-info">
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-price">$${item.price.toLocaleString()}</div>
                        <div class="quantity-controls">
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                            <button class="quantity-btn" onclick="removeFromCart(${item.id})" style="margin-left: 1rem; background: #E84545; color: white;">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `;
                cartItems.appendChild(cartItem);
            });

            // Update total
            cartTotal.textContent = total.toLocaleString();
        }

        // Update quantity
        function updateQuantity(productId, change) {
            const item = cart.find(item => item.id === productId);
            if (item) {
                item.quantity += change;
                if (item.quantity <= 0) {
                    removeFromCart(productId);
                } else {
                    updateCartDisplay();
                }
            }
        }

        // Remove from cart
        function removeFromCart(productId) {
            cart = cart.filter(item => item.id !== productId);
            updateCartDisplay();
        }

        // Toggle cart sidebar
        function toggleCart() {
            const cartSidebar = document.getElementById('cartSidebar');
            cartSidebar.classList.toggle('open');
        }

        // Buy now (single product checkout)
        function buyNow(productId) {
            const product = products.find(p => p.id === productId);
            // Simulate Mercado Pago integration
            initiatePayment([{...product, quantity: 1}]);
        }

        // Checkout (full cart)
        function checkout() {
            if (cart.length === 0) {
                showNotification('El carrito está vacío', 'error');
                return;
            }
            initiatePayment(cart);
        }

        // Simulate Mercado Pago payment integration
        function initiatePayment(items) {
            const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            // In a real implementation, this would integrate with Mercado Pago SDK
            const paymentData = {
                items: items.map(item => ({
                    title: item.name,
                    quantity: item.quantity,
                    unit_price: item.price,
                    currency_id: 'ARS'
                })),
                total: total,
                external_reference: 'KAIZEN-' + Date.now()
            };

            // Simulate payment process
            showNotification('Redirigiendo a Mercado Pago...', 'info');
            
            setTimeout(() => {
                // Simulate successful payment
                const success = Math.random() > 0.2; // 80% success rate for demo
                
                if (success) {
                    showNotification('¡Pago procesado exitosamente!', 'success');
                    cart = []; // Clear cart
                    updateCartDisplay();
                    toggleCart();
                } else {
                    showNotification('Error en el pago. Intenta nuevamente.', 'error');
                }
            }, 2000);

            // In production, integrate with Mercado Pago:
            /*
            mp.checkout({
                preference: {
                    items: paymentData.items,
                    external_reference: paymentData.external_reference,
                    back_urls: {
                        success: window.location.origin + '/success',
                        failure: window.location.origin + '/failure',
                        pending: window.location.origin + '/pending'
                    }
                }
            });
            */
        }

        // Show notification
        function showNotification(message, type = 'success') {
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#E84545' : '#2196F3'};
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 5px;
                z-index: 3000;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                transform: translateX(400px);
                transition: transform 0.3s ease;
            `;
            notification.textContent = message;
            
            document.body.appendChild(notification);
            
            // Animate in
            setTimeout(() => {
                notification.style.transform = 'translateX(0)';
            }, 100);
            
            // Remove after 4 seconds
            setTimeout(() => {
                notification.style.transform = 'translateX(400px)';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 4000);
        }

        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Close cart when clicking outside
        document.addEventListener('click', function(e) {
            const cartSidebar = document.getElementById('cartSidebar');
            const cartIcon = document.querySelector('.cart-icon');
            
            if (cartSidebar.classList.contains('open') && 
                !cartSidebar.contains(e.target) && 
                !cartIcon.contains(e.target)) {
                toggleCart();
            }
        });

        // Mobile menu functionality
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');

        mobileMenuBtn.addEventListener('click', function() {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.background = 'var(--cream)';
            navLinks.style.flexDirection = 'column';
            navLinks.style.padding = '1rem';
            navLinks.style.boxShadow = '0 2px 10px var(--shadow)';
        });

        // Admin Panel Access (Basic)
        function accessAdminPanel() {
            const password = prompt('Ingresa la contraseña de administrador:');
            if (password === 'kaizen2025') { // In production, use proper authentication
                window.location.href = '#admin';
                showAdminPanel();
            } else {
                showNotification('Contraseña incorrecta', 'error');
            }
        }

        // Show admin panel (basic implementation)
        function showAdminPanel() {
            const adminPanel = document.createElement('div');
            adminPanel.id = 'adminPanel';
            adminPanel.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.9);
                z-index: 4000;
                display: flex;
                align-items: center;
                justify-content: center;
            `;
            
            adminPanel.innerHTML = `
                <div style="background: white; padding: 2rem; border-radius: 10px; max-width: 500px; width: 90%;">
                    <h2 style="color: var(--brown-textile); margin-bottom: 1rem;">Panel de Administración</h2>
                    <form id="productForm">
                        <div style="margin-bottom: 1rem;">
                            <label>Nombre del Producto:</label>
                            <input type="text" id="productName" style="width: 100%; padding: 0.5rem; margin-top: 0.5rem;">
                        </div>
                        <div style="margin-bottom: 1rem;">
                            <label>Categoría:</label>
                            <select id="productCategory" style="width: 100%; padding: 0.5rem; margin-top: 0.5rem;">
                                <option value="accesorios">Accesorios</option>
                                <option value="bordados">Bordados</option>
                            </select>
                        </div>
                        <div style="margin-bottom: 1rem;">
                            <label>Precio:</label>
                            <input type="number" id="productPrice" style="width: 100%; padding: 0.5rem; margin-top: 0.5rem;">
                        </div>
                        <div style="margin-bottom: 1rem;">
                            <label>Descripción:</label>
                            <textarea id="productDescription" style="width: 100%; padding: 0.5rem; margin-top: 0.5rem; height: 80px;"></textarea>
                        </div>
                        <div style="margin-bottom: 1rem;">
                            <label>URL de Imagen:</label>
                            <input type="url" id="productImage" style="width: 100%; padding: 0.5rem; margin-top: 0.5rem;">
                        </div>
                        <div style="margin-bottom: 1rem;">
                            <label>Stock:</label>
                            <input type="number" id="productStock" style="width: 100%; padding: 0.5rem; margin-top: 0.5rem;">
                        </div>
                        <div style="display: flex; gap: 1rem;">
                            <button type="submit" style="flex: 1; background: var(--accent-red); color: white; border: none; padding: 0.8rem; border-radius: 5px; cursor: pointer;">
                                Agregar Producto
                            </button>
                            <button type="button" onclick="closeAdminPanel()" style="flex: 1; background: var(--brown-textile); color: white; border: none; padding: 0.8rem; border-radius: 5px; cursor: pointer;">
                                Cerrar
                            </button>
                        </div>
                    </form>
                </div>
            `;
            
            document.body.appendChild(adminPanel);
            
            // Handle form submission
            document.getElementById('productForm').addEventListener('submit', function(e) {
                e.preventDefault();
                addNewProduct();
            });
        }

        // Add new product (admin function)
        function addNewProduct() {
            const newProduct = {
                id: Date.now(),
                name: document.getElementById('productName').value,
                category: document.getElementById('productCategory').value,
                price: parseInt(document.getElementById('productPrice').value),
                description: document.getElementById('productDescription').value,
                image: document.getElementById('productImage').value,
                stock: parseInt(document.getElementById('productStock').value)
            };
            
            products.push(newProduct);
            loadProducts(products);
            closeAdminPanel();
            showNotification('Producto agregado exitosamente', 'success');
        }

        // Close admin panel
        function closeAdminPanel() {
            const adminPanel = document.getElementById('adminPanel');
            if (adminPanel) {
                document.body.removeChild(adminPanel);
            }
        }

        // Add admin access to footer link
        document.querySelector('a[href="#admin"]').addEventListener('click', function(e) {
            e.preventDefault();
            accessAdminPanel();
        });

        // Lazy loading for images
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '50px'
        };

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('fade-in');
                    imageObserver.unobserve(img);
                }
            });
        }, observerOptions);

        // Search functionality (bonus feature)
        function addSearchFeature() {
            const searchContainer = document.createElement('div');
            searchContainer.innerHTML = `
                <div style="max-width: 1200px; margin: 2rem auto; padding: 0 1rem;">
                    <div style="position: relative; max-width: 400px; margin: 0 auto;">
                        <input type="text" id="searchInput" placeholder="Buscar productos..." 
                               style="width: 100%; padding: 0.8rem 1rem 0.8rem 3rem; border: 2px solid var(--brown-textile); border-radius: 25px; font-size: 1rem;">
                        <i class="fas fa-search" style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--brown-textile);"></i>
                    </div>
                </div>
            `;
            
            const filtersSection = document.querySelector('.filters');
            filtersSection.parentNode.insertBefore(searchContainer, filtersSection.nextSibling);
            
            // Search functionality
            const searchInput = document.getElementById('searchInput');
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                const filtered = products.filter(product => 
                    product.name.toLowerCase().includes(searchTerm) ||
                    product.description.toLowerCase().includes(searchTerm) ||
                    product.category.toLowerCase().includes(searchTerm)
                );
                loadProducts(filtered);
            });
        }

        // Initialize search feature
        addSearchFeature();

        // Stock alerts (admin feature)
        function checkLowStock() {
            const lowStockProducts = products.filter(product => product.stock <= 5);
            if (lowStockProducts.length > 0) {
                console.log('Productos con stock bajo:', lowStockProducts);
                // In production, send notification to admin
            }
        }

        // Check stock on page load
        checkLowStock();

        // Performance optimization: Debounce function
        function debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }

        // Optimize search with debounce
        const debouncedSearch = debounce(function(searchTerm) {
            const filtered = products.filter(product => 
                product.name.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm) ||
                product.category.toLowerCase().includes(searchTerm)
            );
            loadProducts(filtered);
        }, 300);

        // Update search input to use debounced function
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(() => {
                const searchInput = document.getElementById('searchInput');
                if (searchInput) {
                    searchInput.addEventListener('input', function() {
                        debouncedSearch(this.value.toLowerCase());
                    });
                }
            }, 100);
        });

