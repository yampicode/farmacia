     // Variables globales
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const whatsappNumber = "584120348988";
        
        // Inicializar contador del carrito
        actualizarContadorCarrito();
        
        // Funcionalidad del menú móvil
        const menuToggle = document.querySelector('.menu-toggle');
        const closeMenu = document.querySelector('.close-menu');
        const nav = document.querySelector('nav');
        
        menuToggle.addEventListener('click', () => {
            nav.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        closeMenu.addEventListener('click', () => {
            nav.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        
        // Cerrar menú al hacer clic en enlaces
        const navLinks = document.querySelectorAll('.nav-list a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
        
        // Smooth scrolling para enlaces internos
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                // Solo aplicar smooth scrolling para enlaces internos, no para el carrito
                if (this.getAttribute('href').startsWith('#') && this.getAttribute('href') !== '#') {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
        
        // Funciones para el carrito de compras
        function addToCart(productName, productPrice, productIcon) {
            // Verificar si el producto ya está en el carrito
            const existingProductIndex = carrito.findIndex(item => item.name === productName);
            
            if (existingProductIndex !== -1) {
                // Si ya existe, incrementar la cantidad
                carrito[existingProductIndex].quantity += 1;
            } else {
                // Si no existe, agregar nuevo producto
                carrito.push({ 
                    name: productName, 
                    price: productPrice, 
                    icon: productIcon,
                    quantity: 1
                });
            }
            
            // Guardar en localStorage
            localStorage.setItem('carrito', JSON.stringify(carrito));
            
            actualizarContadorCarrito();
            
            // Mostrar notificación
            alert(`¡${productName} añadido al carrito!`);
        }
        
        function actualizarContadorCarrito() {
            const totalItems = carrito.reduce((total, item) => total + item.quantity, 0);
            document.getElementById('cartCount').textContent = totalItems;
            document.getElementById('header-cart-count').textContent = totalItems;
        }
        
        function redirectToCart() {
            window.location.href = 'carrito.html';
        }
        
        // Función para las preguntas frecuentes
        function toggleFaq(index) {
            const answers = document.querySelectorAll('.faq-answer');
            const icons = document.querySelectorAll('.faq-icon');
            
            if (answers[index].classList.contains('active')) {
                answers[index].classList.remove('active');
                icons[index].classList.remove('active');
            } else {
                answers[index].classList.add('active');
                icons[index].classList.add('active');
            }
        }
        
        // Función para enviar formulario de contacto por WhatsApp
        function enviarFormularioContacto() {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                alert('Por favor, completa todos los campos obligatorios.');
                return;
            }
            
            let mensaje = `¡Hola! Mi nombre es ${name}.%0A%0A`;
            mensaje += `Me gustaría contactarlos por lo siguiente:%0A%0A`;
            mensaje += `${message}%0A%0A`;
            mensaje += `Mis datos de contacto:%0A`;
            mensaje += `Email: ${email}%0A`;
            
            if (phone) {
                mensaje += `Teléfono: ${phone}%0A`;
            }
            
            window.open(`https://wa.me/${whatsappNumber}?text=${mensaje}`, '_blank');
            
            // Limpiar formulario
            document.getElementById('contactForm').reset();
        }
        
        // Función para suscribirse al newsletter
        function suscribirNewsletter() {
            const email = document.getElementById('newsletterEmail').value;
            
            if (!email) {
                alert('Por favor, ingresa tu dirección de email.');
                return;
            }
            
            let mensaje = "¡Hola! Me gustaría suscribirme al newsletter.%0A%0A";
            mensaje += `Mi email es: ${email}`;
            
            window.open(`https://wa.me/${whatsappNumber}?text=${mensaje}`, '_blank');
            
            // Limpiar formulario
            document.getElementById('newsletterEmail').value = '';
            
            alert('¡Gracias por suscribirte! Te contactaremos pronto.');
        }