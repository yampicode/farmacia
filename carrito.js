
        // Cargar carrito desde localStorage
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const cartContent = document.getElementById('cart-content');
        
        // Renderizar carrito
        renderCart();
        
        function renderCart() {
            if (carrito.length === 0) {
                cartContent.innerHTML = `
                    <div class="cart-empty">
                        <i class="fas fa-shopping-cart"></i>
                        <h2>Tu carrito está vacío</h2>
                        <p>Agrega algunos productos para comenzar</p>
                        <a href="index.html" class="btn">Ver productos</a>
                    </div>
                `;
                return;
            }
            
            // Calcular totales
            const subtotal = carrito.reduce((total, item) => total + (item.price * item.quantity), 0);
            const iva = subtotal * 0.16; // 16% de IVA
            const total = subtotal + iva;
            
            cartContent.innerHTML = `
                <div class="cart-content">
                    <div class="cart-items">
                        ${carrito.map((item, index) => `
                            <div class="cart-item">
                                <div class="cart-item-icon">
                                    <i class="${item.icon}"></i>
                                </div>
                                <div class="cart-item-details">
                                    <div class="cart-item-name">${item.name}</div>
                                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                                    <div class="cart-item-quantity">
                                        <button class="quantity-btn" onclick="updateQuantity(${index}, ${item.quantity - 1})">-</button>
                                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, parseInt(this.value))">
                                        <button class="quantity-btn" onclick="updateQuantity(${index}, ${item.quantity + 1})">+</button>
                                    </div>
                                </div>
                                <button class="cart-item-remove" onclick="removeFromCart(${index})">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="cart-summary">
                        <h3>Resumen de compra</h3>
                        <div class="summary-row">
                            <span>Subtotal:</span>
                            <span>$${subtotal.toFixed(2)}</span>
                        </div>
                        <div class="summary-row">
                            <span>IVA (16%):</span>
                            <span>$${iva.toFixed(2)}</span>
                        </div>
                        <div class="summary-row summary-total">
                            <span>Total:</span>
                            <span>$${total.toFixed(2)}</span>
                        </div>
                        
                        <div class="cart-actions">
                            <button class="btn" onclick="clearCart()">Vaciar carrito</button>
                            <button class="btn btn-secondary" onclick="checkout()">Finalizar compra</button>
                        </div>
                    </div>
                </div>
            `;
        }
        
        function updateQuantity(index, newQuantity) {
            if (newQuantity < 1) newQuantity = 1;
            
            carrito[index].quantity = newQuantity;
            localStorage.setItem('carrito', JSON.stringify(carrito));
            renderCart();
        }
        
        function removeFromCart(index) {
            carrito.splice(index, 1);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            renderCart();
        }
        
        function clearCart() {
            if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
                carrito = [];
                localStorage.setItem('carrito', JSON.stringify(carrito));
                renderCart();
            }
        }
        
        function checkout() {
            if (carrito.length === 0) {
                alert('Tu carrito está vacío. Agrega productos antes de finalizar la compra.');
                return;
            }
            
            let mensaje = "¡Hola! Me gustaría hacer el siguiente pedido:%0A%0A";
            let subtotal = 0;
            
            carrito.forEach(item => {
                const itemTotal = item.price * item.quantity;
                subtotal += itemTotal;
                mensaje += `- ${item.quantity}x ${item.name}: $${itemTotal.toFixed(2)}%0A`;
            });
            
            const iva = subtotal * 0.16;
            const total = subtotal + iva;
            
            mensaje += `%0ASubtotal: $${subtotal.toFixed(2)}%0A`;
            mensaje += `IVA (16%): $${iva.toFixed(2)}%0A`;
            mensaje += `Total: $${total.toFixed(2)}%0A%0A`;
            mensaje += "Por favor, contactarme para confirmar disponibilidad y forma de pago.";
            
            window.open(`https://wa.me/584120348988?text=${mensaje}`, '_blank');
        }