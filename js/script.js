document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Añadido: Cerrar el menú al hacer clic fuera de él
    document.addEventListener('click', (e) => {
        // Comprobar si el menú está activo y si el clic no fue en el menú ni en el botón hamburguesa
        const isMenuOpen = navLinks.classList.contains('active');
        const isClickInsideNav = navLinks.contains(e.target);
        const isClickOnHamburger = hamburger.contains(e.target);

        if (isMenuOpen && !isClickInsideNav && !isClickOnHamburger) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Añadido: Lógica para el submenú en móvil
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    if (dropdownToggle && dropdownMenu) {
        dropdownToggle.addEventListener('click', (e) => {
            // Prevenir la navegación solo si la pantalla es de móvil
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdownMenu.classList.toggle('active');
                dropdownToggle.querySelector('.fa-caret-down').style.transform = dropdownMenu.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
            }
        });
    }

    // Lógica para el modal de la galería con slider
    const modal = document.getElementById('image-modal');
    if (modal) {
        const modalImage = document.getElementById('modal-image');
        const galleryItems = document.querySelectorAll('.gallery-item');
        const closeButton = document.querySelector('.close-button');
        const prevButton = document.querySelector('.prev-button');
        const nextButton = document.querySelector('.next-button');

        let currentImageIndex;
        const images = Array.from(galleryItems).map(item => item.querySelector('img').src);

        const openModal = (index) => {
            currentImageIndex = index;
            modalImage.src = images[currentImageIndex];
            modal.style.display = 'block'; /* Volvemos a 'block' */
            document.body.classList.add('modal-open');
        };

        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => openModal(index));
        });

        const closeModal = () => {
            modal.style.display = 'none';
            document.body.classList.remove('modal-open');
        };

        const showNextImage = () => {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            modalImage.src = images[currentImageIndex];
        };

        const showPrevImage = () => {
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            modalImage.src = images[currentImageIndex];
        };

        closeButton.addEventListener('click', closeModal);
        prevButton.addEventListener('click', showPrevImage);
        nextButton.addEventListener('click', showNextImage);
        modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

        // Navegación con teclado
        document.addEventListener('keydown', (e) => {
            if (modal.style.display === 'block' || modal.style.display === 'flex') { // Comprobamos ambos por si acaso
                if (e.key === 'ArrowRight') showNextImage();
                if (e.key === 'ArrowLeft') showPrevImage();
                if (e.key === 'Escape') closeModal();
            }
        });
    }

    // --- Lógica para expandir episodios en las páginas de temporada ---
    const episodeItems = document.querySelectorAll('.episode-item');

    if (episodeItems.length > 0) {
        episodeItems.forEach(item => {
            item.addEventListener('click', () => {
                // Si el item ya está expandido, lo colapsamos
                if (item.classList.contains('expanded')) {
                    item.classList.remove('expanded');
                } else {
                    // Primero, colapsamos cualquier otro item que esté expandido
                    episodeItems.forEach(otherItem => otherItem.classList.remove('expanded'));
                    // Luego, expandimos el item clickeado
                    item.classList.add('expanded');
                }
            });
        });
    }
});